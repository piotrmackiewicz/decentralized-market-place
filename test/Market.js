const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('Market', () => {
  let transaction;
  let result;

  let market;
  let accounts;
  let deployer;
  let shopOwner;
  let paymentAddress;

  beforeEach(async () => {
    const Market = await ethers.getContractFactory('Market');
    market = await Market.deploy();

    accounts = await ethers.getSigners();
    deployer = accounts[0];
    shopOwner = accounts[1];
    paymentAddress = accounts[9];

    transaction = market
      .connect(shopOwner)
      .createStore('Test Shop', paymentAddress.getAddress());
  });

  it('has correct starting values', async () => {
    expect(await market.getOwner()).to.equal(await deployer.getAddress());
    expect((await market.getCategories()).length).to.equal(0);
  });

  it('reverts creating category', async () => {
    await expect(
      market.connect(shopOwner).createCategory('Test Category')
    ).to.be.revertedWith('Not deployer');
  });

  it('creates category', async () => {
    await market.createCategory('Test Category');
    const categories = await market.getCategories();
    expect(categories.length).to.equal(1);
    expect(categories[0]).to.equal('Test Category');
  });

  it('emits event when creating shop', async () => {
    const newShopAddress = await market.getShopAddress(0);
    const shop = await ethers.getContractAt('Shop', newShopAddress);
    await expect(transaction)
      .to.emit(market, 'ShopCreated')
      .withArgs(
        await shop.getId(),
        newShopAddress,
        await shop.getOwner(),
        await shop.getName(),
        await shop.getPaymentAddress()
      );
  });

  it('has one shop created', async () => {
    const shopsCount = await market.getShopsCount();
    expect(shopsCount).to.equal(1);
  });
});
