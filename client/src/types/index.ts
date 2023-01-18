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
