import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from 'pages/HomePage';
import { CategoryPage } from 'pages/CategoryPage';
import { OfferPage } from 'pages/OfferPage';
import { ShopPage } from 'pages/ShopPage';
import { MyShoppingPage } from 'pages/MyShoppingPage';
import { MyShopsPage } from 'pages/MyShopsPage';
import { Routes } from './routes';
import { MyShopOffers } from 'pages/MyShopOffersPage';
import { EditOfferPage } from 'pages/EditOfferPage';

const router = createBrowserRouter([
  {
    path: Routes.Home,
    element: <HomePage />,
  },
  {
    path: Routes.MyShopping,
    element: <MyShoppingPage />,
  },
  {
    path: Routes.Category,
    element: <CategoryPage />,
  },
  {
    path: Routes.Offer,
    element: <OfferPage />,
  },
  {
    path: Routes.Shop,
    element: <ShopPage />,
  },
  {
    path: Routes.MyShops,
    element: <MyShopsPage />,
  },
  {
    path: Routes.MyShopOffers,
    element: <MyShopOffers />,
  },
  {
    path: Routes.EditOffer,
    element: <EditOfferPage />,
  },
]);

export const Router = () => <RouterProvider router={router} />;
