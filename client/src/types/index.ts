export type Category = {
  id: string;
  name: string;
};

export type Offer = {
  title: string;
  category: number;
  quantity: number;
  archived: boolean;
  id: number;
  shop_id: number;
  description: string;
  price: string;
  images: string[];
};

export type Shop = {
  id: string;
  name: string;
  owner: string;
  paymentAddress: string;
  offersCount: number;
  salesCount: number;
  offersSuspended: boolean;
};

export type Sale = {
  buyer: string;
  price: string;
  quantity: number;
  offer: Offer;
};
