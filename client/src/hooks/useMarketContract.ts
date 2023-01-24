import { MARKET_CONTRACT_ADDRESS } from '../consts';
import web3Store from '../store/Web3Store';
import { Market__factory } from '../typechain-types';

export const useMarketContract = () => {
  const getShopAddress = async (shopId: number) => {
    const provider = web3Store.provider;
    if (!provider) return;
    const marketContract = Market__factory.connect(
      MARKET_CONTRACT_ADDRESS,
      provider
    );
    const shopAddress = await marketContract.getShopAddress(shopId);
    return shopAddress;
  };

  return { getShopAddress };
};
