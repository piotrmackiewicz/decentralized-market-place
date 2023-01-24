const ethers = require('ethers');
const express = require('express');
const cors = require('cors');
const { setEventListeners, syncDatabaseWithBlockchain } = require('./actions');
const { MARKET_ADDRESS, MARKET_ABI, SHOP_ABI } = require('./config');
const DatabaseConnection = require('./database');

async function main() {
  const wsProvider = new ethers.providers.WebSocketProvider(
    'http://127.0.0.1:7545/'
  );

  const market = new ethers.Contract(MARKET_ADDRESS, MARKET_ABI, wsProvider);

  const db = new DatabaseConnection();

  syncDatabaseWithBlockchain(wsProvider, db, market);
  setEventListeners(wsProvider, db, market);

  const app = express();
  app.use(cors());
  app.use(express.json());

  app.get('/categories', async (_req, res) => {
    const categories = await db.getCategories();
    res.json({ data: categories });
  });

  app.get('/offers', async (req, res) => {
    const { categoryId, shopId, buyer } = req.query;

    if (categoryId) {
      const offers = await db.getOffersListingByCategory(categoryId);
      return res.json({ data: offers });
    }

    if (shopId) {
      const offers = await db.getOffersListingByShopId(shopId);
      return res.json({ data: offers });
    }

    res.status(422);
  });

  app.get('/sales', async (req, res) => {
    const { buyer } = req.query;

    if (buyer) {
      const sales = await db.getSalesByBuyer(buyer);
      return res.json({ data: sales });
    }

    res.status(422);
  });

  app.get('/offer', async (req, res) => {
    const { shopId, offerId } = req.query;
    if (!shopId || !offerId) {
      res.status(422);
    }
    const offer = await db.getOfferByShopIdAndOfferId(shopId, offerId);
    res.json(offer);
  });

  app.listen('3001', () => {
    console.log('Backend is running on port 3001...');
  });
}

main();
