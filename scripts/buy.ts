import { ethers } from 'hardhat';

async function buy() {
  let marketAddress = '0x11383e4EeED877633C38B619f7440062f2a3f0fD';

  let transaction;
  const accounts = await ethers.getSigners();
  const shopOwner = accounts[1];
  const buyer = accounts[2];

  const market = await ethers.getContractAt('Market', marketAddress);

  let shop1Address = await market.getShopAddress(0);
  let shop1 = await ethers.getContractAt('Shop', shop1Address);
  let shop2Address = await market.getShopAddress(1);
  let shop2 = await ethers.getContractAt('Shop', shop2Address);

  await shop1
    .connect(buyer)
    .buyProduct(0, 1, { value: ethers.utils.parseUnits('0.97') });

  await shop1
    .connect(buyer)
    .buyProduct(0, 4, { value: ethers.utils.parseUnits('3.88') });

  await shop1
    .connect(buyer)
    .buyProduct(1, 2, { value: ethers.utils.parseUnits('0.046') });

  await shop2
    .connect(buyer)
    .buyProduct(1, 5, { value: ethers.utils.parseUnits('0.065') });

  transaction = await shop2.connect(shopOwner).suspend();
  await transaction.wait();
}

buy();
