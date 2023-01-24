import { useEffect, useState } from 'react';
import web3Store from '../store/Web3Store';
import { Shop__factory } from '../typechain-types';
import { Offer } from '../types';

interface Props {
  offer: Offer;
  shopContractAddress: string;
}

export const useOfferUpdate = ({ shopContractAddress, offer }: Props) => {
  const [updatedOffer, setUpdatedOffer] = useState(offer);
  const { provider } = web3Store;
  const shopContract = provider
    ? Shop__factory.connect(shopContractAddress, provider)
    : null;

  useEffect(() => {
    shopContract?.on(
      'SaleCreated',
      (
        _id,
        _shopId,
        offerId,
        _buyer,
        _price,
        _quantity,
        newQuantity,
        event
      ) => {
        if (
          event.address === shopContractAddress &&
          offerId.toString() === updatedOffer.id.toString()
        ) {
          setUpdatedOffer((prev) => ({
            ...prev,
            quantity: Number(newQuantity),
          }));
        }
      }
    );

    shopContract?.on('OffersSuspended', () => {
      // TODO: suspended shop offers should disappear from the list
      // TODO: if offer details are visible modal with warning and redirect should appear
      console.log('offers suspended');
    });

    shopContract?.on('OffersUnsuspended', () => {
      // TODO: ???
      console.log('offers suspended');
    });

    shopContract?.on('OfferArchived', (id) => {
      // TODO: archived offer should disappear from the list
      // TODO: if offer details are visible modal with warning and redirect should appear
      console.log('offer archived');
    });

    shopContract?.on('OfferPriceChanged', (id, price, event) => {
      if (
        event.address === shopContractAddress &&
        id.toString() === updatedOffer.id.toString()
      ) {
        setUpdatedOffer((prev) => ({ ...prev, price: price.toString() }));
      }
    });

    shopContract?.on(
      'OfferContentChanged',
      (id, title, description, _contentId, event) => {
        if (
          event.address === shopContractAddress &&
          id.toString() === updatedOffer.id.toString()
        ) {
          setUpdatedOffer((prev) => ({ ...prev, title, description }));
        }
      }
    );

    return () => {
      shopContract?.removeAllListeners();
    };
  }, [
    shopContract,
    shopContractAddress,
    updatedOffer.id,
    updatedOffer.shop_id,
  ]);

  return { updatedOffer };
};
