import { ethers } from 'ethers';
import { Logger } from 'ethers/lib/utils';
import { useEffect, useState } from 'react';
import web3Store from '../store/Web3Store';
import { Shop__factory } from '../typechain-types';
import { Shop } from '../types';

interface Props {
  shopContractAddress: string;
}

export const useShopContract = ({ shopContractAddress }: Props) => {
  const { provider, signer } = web3Store;
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [shopInfo, setShopInfo] = useState<Shop>({
    id: '',
    name: '',
    owner: '',
    paymentAddress: '',
    offersCount: 0,
    salesCount: 0,
    offersSuspended: false,
  });

  useEffect(() => {
    const loadShopInfo = async () => {
      if (!provider || !shopContractAddress) return;
      setLoading(true);
      try {
        const shopContract = Shop__factory.connect(
          shopContractAddress,
          provider
        );
        const result = await Promise.all([
          shopContract.getId(),
          shopContract.getName(),
          shopContract.getOwner(),
          shopContract.getPaymentAddress(),
          shopContract.getOffersCount(),
          shopContract.getSalesCount(),
          shopContract.getIsOffersSuspended(),
        ]);
        const [
          id,
          name,
          owner,
          paymentAddress,
          offersCount,
          salesCount,
          offersSuspended,
        ] = result;
        setShopInfo((prev) => ({
          ...prev,
          id: id.toString(),
          name,
          owner,
          paymentAddress,
          offersCount: Number(offersCount),
          salesCount: Number(salesCount),
          offersSuspended,
        }));
        setSuccess(true);
      } catch (error: any) {
        setSuccess(false);
        if (error.code === Logger.errors.CALL_EXCEPTION) {
          console.log('ERROR: ' + error.receipt);
        } else {
          console.error('Unknown error');
        }
      } finally {
        setLoading(false);
      }
    };

    loadShopInfo();
  }, [provider, shopContractAddress]);

  const buyProduct = async (
    offerId: number,
    quantity: number,
    value: string
  ) => {
    if (!provider || !signer) return;
    setLoading(true);
    try {
      const shopContract = Shop__factory.connect(shopContractAddress, signer);
      await shopContract.buyProduct(offerId, quantity, {
        value: ethers.utils.parseUnits(value, 'ether'),
      });
      setSuccess(true);
    } catch (error: any) {
      setSuccess(false);
      if (error.code === Logger.errors.CALL_EXCEPTION) {
        console.log('ERROR: ' + error.receipt);
      } else {
        console.error('Unknown error');
      }
    } finally {
      setLoading(false);
    }
  };

  return { loading, success, shopInfo, buyProduct };
};
