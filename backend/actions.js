const ethers = require('ethers');
const { SHOP_ABI } = require('./config');

async function setShopEventListeners(db, shop) {
  const shopId = await shop.getId();

  shop.on(
    'OfferCreated',
    (id, shopId, title, description, images, quantity, price, category) => {
      db.insertOffer(
        id,
        shopId,
        title,
        description,
        images,
        category,
        quantity,
        price,
        false
      );
    }
  );

  shop.on('OffersSuspended', (event) => {
    const { address } = event;
    db.suspendOffers(address);
  });

  shop.on('OffersUnsuspended', (event) => {
    const { address } = event;
    db.unsuspendOffers(address);
  });

  shop.on('OfferArchived', (id) => {
    db.archiveOffer(id, shopId);
  });

  shop.on('OfferPriceChanged', (id, price) => {
    db.updateOfferPrice(id, shopId, price);
  });

  shop.on('OfferContentChanged', (id, title, description) => {
    db.updateOfferContent(id, shopId, title, description);
  });

  shop.on(
    'SaleCreated',
    (id, shopId, offerId, buyer, price, quantity, newQuantity) => {
      db.insertSale(id, shopId, offerId, buyer.toLowerCase(), price, quantity);
      db.updateOfferQuantity(offerId, shopId, newQuantity);
    }
  );
}

async function syncDatabaseWithBlockchain(provider, db, market) {
  const block = await provider.getBlockNumber();

  const categoryCreatedStream = await market.queryFilter(
    'CategoryCreated',
    0,
    block
  );
  await Promise.all(
    categoryCreatedStream.map(async (event) => {
      const { args } = event;
      const { id, name } = args;

      return db.insertCategory(id, name);
    })
  );

  const shopCreatedStream = await market.queryFilter('ShopCreated', 0, block);
  shopCreatedStream.map(async (event) => {
    const { args } = event;
    const { id: shopId, shopAddress, owner } = args;

    const shop = new ethers.Contract(shopAddress, SHOP_ABI, provider);
    const isSuspended = await shop.getIsOffersSuspended();

    await db.insertShop(shopId, shopAddress, owner.toLowerCase(), isSuspended);

    const offerCreatedStream = await shop.queryFilter('OfferCreated', 0, block);

    await Promise.all(
      offerCreatedStream.map(async (event) => {
        const { args } = event;
        const {
          id,
          shopId,
          category,
          quantity,
          title,
          description,
          images,
          price,
        } = args;
        // TODO: get content from IPFS by contentId and read title and description from it
        // title =
        // description =
        return db.insertOffer(
          id,
          shopId,
          title,
          description,
          images,
          category,
          quantity,
          price,
          false
        );
      })
    );

    const saleCreatedStream = await shop.queryFilter('SaleCreated', 0, block);

    await Promise.all(
      saleCreatedStream.map(async (event) => {
        const { args } = event;
        const { id, offerId, buyer, price, quantity, newQuantity } = args;

        // TODO: if two transactions of same offer take place one after another,
        // offer.quantity is being calculated uncorrectly:
        // 1. first run node backend/index.js ignores first transaction
        // 2. second run node backend/index.js gives correct result
        return Promise.all([
          db.insertSale(
            id,
            shopId,
            offerId,
            buyer.toLowerCase(),
            price,
            quantity
          ),
          db.updateOfferQuantity(offerId, shopId, newQuantity),
        ]);
      })
    );

    setShopEventListeners(db, shop);
  });
}

function setEventListeners(provider, db, market) {
  market.on('ShopCreated', (id, shopAddress, owner, _name, _paymentAddress) => {
    db.insertShop(id, shopAddress, owner.toLowerCase(), false);

    let shop = new ethers.Contract(shopAddress, SHOP_ABI, provider);

    setShopEventListeners(db, shop);
  });

  market.on('CategoryCreated', (id, name) => {
    db.insertCategory(id, name);
  });
}

module.exports = {
  setEventListeners,
  syncDatabaseWithBlockchain,
};
