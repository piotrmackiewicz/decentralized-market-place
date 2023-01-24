const { expect } = require('chai');
const { ethers } = require('hardhat');
const { v4: uuid } = require('uuid');

describe('Shop', () => {
  let shop;
  let accounts;
  let deployer;
  let shopOwner;
  let buyer;
  let paymentAddress;

  beforeEach(async () => {
    const Market = await ethers.getContractFactory('Market');
    const market = await Market.deploy();

    accounts = await ethers.getSigners();
    deployer = accounts[0];
    shopOwner = accounts[1];
    buyer = accounts[2];
    paymentAddress = accounts[9];

    transaction = await market
      .connect(shopOwner)
      .createStore('Test Shop', paymentAddress.getAddress());
    await transaction.wait();

    const shopAddress = await market.getShopAddress(0);
    shop = await ethers.getContractAt('Shop', shopAddress);
  });

  describe('Creating Shop', async () => {
    it('has correct starting values', async () => {
      expect(await shop.getOwner()).to.equal(await shopOwner.getAddress());
      expect(await shop.getName()).to.equal('Test Shop');
      expect(await shop.getPaymentAddress()).to.equal(
        await paymentAddress.getAddress()
      );
      expect(await shop.getOffersCount()).to.equal(0);
      expect(await shop.getSalesCount()).to.equal(0);
      expect(await shop.getIsOffersSuspended()).to.equal(false);
    });
  });

  describe('Suspension', () => {
    it('reverts suspend and unsuspend because of Not owner', async () => {
      await expect(shop.connect(buyer).suspend()).to.be.revertedWith(
        'Not owner'
      );
      await shop.connect(shopOwner).suspend();
      await expect(shop.connect(buyer).unsuspend()).to.be.revertedWith(
        'Not owner'
      );
    });

    it('toggle offers suspension and emit events', async () => {
      expect(await shop.getIsOffersSuspended()).to.equal(false);
      await expect(shop.connect(shopOwner).suspend()).to.emit(
        shop,
        'OffersSuspended'
      );
      expect(await shop.getIsOffersSuspended()).to.equal(true);
      await expect(shop.connect(shopOwner).unsuspend()).to.emit(
        shop,
        'OffersUnsuspended'
      );
      expect(await shop.getIsOffersSuspended()).to.equal(false);
    });
  });

  describe('Offers', () => {
    let transaction;
    const contentId = uuid();
    const quantity = 5;
    const price = ethers.utils.parseUnits('0.1');

    beforeEach(async () => {
      transaction = shop
        .connect(shopOwner)
        .createOffer('Title', 'Description', [], contentId, 5, price, 0);
    });

    describe('Create', () => {
      it('reverts create offer because of Not owner', async () => {
        transaction = shop
          .connect(buyer)
          .createOffer('Title', 'Description', [], uuid(), quantity, price, 0);
        await expect(transaction).to.be.revertedWith('Not owner');
      });

      it('creates offer and emits event', async () => {
        await expect(transaction)
          .to.emit(shop, 'OfferCreated')
          .withArgs(
            0,
            await shop.getId(),
            'Title',
            'Description',
            [],
            contentId,
            quantity,
            price,
            0
          );
        expect(await shop.getOffersCount()).to.equal(1);
      });
    });

    describe('Modify', () => {
      it('reverts archive offer because of Not owner', async () => {
        await expect(shop.connect(buyer).archiveOffer(0)).to.be.revertedWith(
          'Not owner'
        );
      });

      it('archives offer and emits event', async () => {
        await expect(shop.connect(shopOwner).archiveOffer(0))
          .to.emit(shop, 'OfferArchived')
          .withArgs(0);
      });

      it('reverts change offer price because of Not owner', async () => {
        await expect(
          shop.connect(buyer).changeOfferPrice(0, price.add(1))
        ).to.be.revertedWith('Not owner');
      });

      it('changes offer price and emits event', async () => {
        const newPrice = price.add(1);
        await expect(shop.connect(shopOwner).changeOfferPrice(0, newPrice))
          .to.emit(shop, 'OfferPriceChanged')
          .withArgs(0, newPrice);
        const offer = await shop.getOffer(0);
        expect(await offer.price).to.equal(newPrice);
      });

      it('reverts change offer content id because of Not owner', async () => {
        await expect(
          shop
            .connect(buyer)
            .changeOfferContent(0, 'Title 2', 'Description 2', uuid())
        ).to.be.revertedWith('Not owner');
      });

      it('changes offer content id and emits event', async () => {
        const newContentId = uuid();
        await expect(
          shop
            .connect(shopOwner)
            .changeOfferContent(0, 'Title 3', 'Description 3', newContentId)
        )
          .to.emit(shop, 'OfferContentChanged')
          .withArgs(0, 'Title 3', 'Description 3', newContentId);
        const offer = await shop.getOffer(0);
        expect(await offer.contentId).to.equal(newContentId);
      });
    });

    describe('Buy', () => {
      it('reverts buy suspended offer', async () => {
        await shop.connect(shopOwner).suspend();
        await expect(
          shop.connect(buyer).buyProduct(0, 1, { value: price })
        ).to.be.revertedWith('Offers are suspended');
      });

      it('reverts buy archived offer', async () => {
        await shop.connect(shopOwner).archiveOffer(0);
        await expect(
          shop.connect(buyer).buyProduct(0, 1, { value: price })
        ).to.be.revertedWith('Offer is archived');
      });

      it('reverts buy because of invalid ether amount', async () => {
        await expect(
          shop.connect(buyer).buyProduct(0, 1, { value: price.sub(1) })
        ).to.be.revertedWith('Invalid Ether amount');
      });

      it('reverts buy because of invalid quantity', async () => {
        await expect(
          shop.connect(buyer).buyProduct(0, 6, { value: price })
        ).to.be.revertedWith('Not enough quantity');
      });

      it('buys product and emits event', async () => {
        await expect(
          shop
            .connect(buyer)
            .buyProduct(0, 3, { value: ethers.utils.parseUnits('0.3') })
        )
          .to.emit(shop, 'SaleCreated')
          .withArgs(
            0,
            await shop.getId(),
            0,
            await buyer.getAddress(),
            price,
            3,
            quantity - 3
          );
        expect(await shop.getSalesCount()).to.equal(1);
        const sale = await shop.getSale(0);
        const offer = await shop.getOffer(0);
        expect(sale.id).to.equal(0);
        expect(sale.offerId).to.equal(0);
        expect(sale.buyer).to.equal(await buyer.getAddress());
        expect(sale.price).to.equal(price);
        expect(sale.quantity).to.equal(3);
        expect(offer.quantity).to.equal(quantity - 3);
      });
    });
  });
});
