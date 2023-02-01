const { parseBigNumberToNumeric } = require('./utils');

const { Pool } = require('pg');

class DatabaseConnection {
  #pool;

  constructor() {
    this.pool = this.#connectToDatabase();
  }

  #connectToDatabase() {
    const credentials = {
      user: 'postgres',
      host: 'localhost',
      database: 'marketplace',
      port: 5432,
    };
    this.#pool = new Pool(credentials);
  }

  insertShop(id, address, owner, suspended) {
    const query = `
            INSERT INTO shops (id, address, owner, suspended)
            VALUES ($1, $2, $3, $4)
            ON CONFLICT (id) DO UPDATE
            SET suspended = $4
        `;
    const values = [parseBigNumberToNumeric(id), address, owner, suspended];
    this.#pool.query(query, values);
  }

  suspendOffers(shopAddress) {
    const query = `
        UPDATE shops
        SET suspended = true
        WHERE address = $1
    `;
    const values = [shopAddress];
    this.#pool.query(query, values);
  }

  unsuspendOffers(shopAddress) {
    const query = `
        UPDATE shops
        SET suspended = false
        WHERE address = $1
    `;
    const values = [shopAddress];
    this.#pool.query(query, values);
  }

  insertOffer(
    id,
    shopId,
    title,
    description,
    images,
    category,
    quantity,
    price,
    archived
  ) {
    const query = `
        INSERT INTO offers (id, shop_id, title, description, images, category, quantity, price, archived)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        ON CONFLICT (id, shop_id) DO UPDATE
        SET title = $3, description = $4, images = $5, category = $6, quantity = $7, price = $8, archived = $9
    `;
    const values = [
      parseBigNumberToNumeric(id),
      parseBigNumberToNumeric(shopId),
      title,
      description,
      images,
      parseBigNumberToNumeric(category),
      parseBigNumberToNumeric(quantity),
      price.toString(),
      archived,
    ];
    this.#pool.query(query, values);
  }

  archiveOffer(id, shopId) {
    const query = `
        UPDATE offers
        SET archived = true
        WHERE id = $1 AND shop_id = $2
    `;
    const values = [
      parseBigNumberToNumeric(id),
      parseBigNumberToNumeric(shopId),
    ];
    this.#pool.query(query, values);
  }

  updateOfferContent(id, shopId, title, description) {
    const query = `
        UPDATE offers
        SET title = $1, description = $2
        WHERE id = $3 AND shop_id = $4
    `;
    const values = [
      title,
      description,
      parseBigNumberToNumeric(id),
      parseBigNumberToNumeric(shopId),
    ];
    this.#pool.query(query, values);
  }

  updateOfferPrice(id, shopId, price) {
    const query = `
        UPDATE offers
        SET price = $1
        WHERE id = $2 AND shop_id = $3
    `;
    const values = [
      price.toString(),
      parseBigNumberToNumeric(id),
      parseBigNumberToNumeric(shopId),
    ];
    this.#pool.query(query, values);
  }

  updateOfferQuantity(id, shopId, quantity) {
    const query = `
        UPDATE offers
        SET quantity = $1
        WHERE id = $2 AND shop_id = $3
    `;
    const values = [
      parseBigNumberToNumeric(quantity),
      parseBigNumberToNumeric(id),
      parseBigNumberToNumeric(shopId),
    ];
    this.#pool.query(query, values);
  }

  insertSale(id, shopId, offerId, buyer, price, quantity) {
    const query = `
        INSERT INTO sales (id, shop_id, offer_id, buyer, price, quantity)
        VALUES ($1, $2, $3, $4, $5, $6)
        ON CONFLICT (id, shop_id) DO UPDATE
        SET id = $1, shop_id = $2, offer_id = $3, buyer = $4, price = $5, quantity = $6
    `;
    const values = [
      parseBigNumberToNumeric(id),
      parseBigNumberToNumeric(shopId),
      parseBigNumberToNumeric(offerId),
      buyer,
      price.toString(),
      parseBigNumberToNumeric(quantity),
    ];
    this.#pool.query(query, values);
  }

  insertCategory(id, name) {
    const query = `
        INSERT INTO categories (id, name)
        VALUES ($1, $2)
        ON CONFLICT (id) DO UPDATE
        SET id = $1, name = $2
    `;

    const values = [parseBigNumberToNumeric(id), name];
    this.#pool.query(query, values);
  }

  async getCategories() {
    const query = `
      SELECT id, name FROM categories ORDER BY id
    `;
    const result = await this.#pool.query(query);
    return result.rows;
  }

  async getOffersListingByCategory(categoryId) {
    const query = `
      SELECT o.title, o.category, o.quantity, o.archived, o.id, o.shop_id, o.description, o.price, o.images
      FROM offers o
      JOIN shops s
      ON o.shop_id = s.id
      WHERE o.category = $1 AND o.archived = false AND s.suspended = false
      ORDER BY o.id, o.shop_id
    `;
    const values = [categoryId];
    const result = await this.#pool.query(query, values);
    return result.rows;
  }

  async getOffersListingByShopId(shopId) {
    const query = `
      SELECT title, category, quantity, archived, id, shop_id, description, price, images
      FROM offers
      WHERE shop_id = $1 AND archived = false
      ORDER BY id
    `;
    const values = [shopId];
    const result = await this.#pool.query(query, values);
    return result.rows;
  }

  async getOfferByShopIdAndOfferId(shopId, offerId) {
    const query = `
      SELECT title, category, quantity, archived, id, shop_id, description, price, images
      FROM offers
      WHERE shop_id = $1 AND id = $2
    `;
    const values = [shopId, offerId];
    const result = await this.#pool.query(query, values);
    return result.rows[0];
  }

  async getSalesByBuyer(buyer) {
    const query = `
      SELECT DISTINCT s.buyer as sale_buyer, s.price as sale_price, s.quantity as sale_quantity, o.title, o.category, o.quantity, o.archived, o.id, o.shop_id, o.description, o.price, o.images
      FROM offers o
      JOIN sales s
      ON s.buyer = $1
      AND (o.shop_id = s.shop_id AND o.id = s.offer_id)
    `;
    const values = [buyer];
    const result = await this.#pool.query(query, values);
    return result.rows.map((row) => ({
      price: row.sale_price,
      quantity: row.sale_quantity,
      buyer: row.sale_buyer,
      offer: {
        title: row.title,
        category: row.category,
        quantity: row.quantity,
        archived: row.archived,
        id: row.id,
        shop_id: row.shop_id,
        description: row.description,
        price: row.price,
        images: row.images,
      },
    }));
  }

  async getOwnerShops(ownerAddress) {
    const query = `
      SELECT address, id, suspended, owner
      FROM shops
      WHERE owner = $1
    `;
    const values = [ownerAddress];
    const result = await this.#pool.query(query, values);
    return result.rows;
  }
}

module.exports = DatabaseConnection;
