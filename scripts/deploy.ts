import { ethers } from 'hardhat';

async function main() {
  console.log(`Preparing deployment...\n`);

  const marketFactory = await ethers.getContractFactory('Market');

  const market = await marketFactory.deploy();
  console.log(`Market deployed to ${market.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
