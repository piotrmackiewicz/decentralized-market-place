import { Dropdown, Layout as AntLayout } from 'antd';
import {
  BrandWrapper,
  ContentWrapper,
  HeaderContentWrapper,
  ProfileButton,
} from './Layout.styled';
import { CaretDownFilled } from '@ant-design/icons';
import web3Store from '../../store/Web3Store';
import { observer } from 'mobx-react';
import Blockies from 'react-blockies';
import { Link } from 'react-router-dom';
import { useCallback } from 'react';
import { ItemType } from 'antd/es/menu/hooks/useItems';
import { Routes } from 'components/Router/routes';

interface Props {
  children: React.ReactNode;
}

export const Layout = observer(({ children }: Props) => {
  const { account } = web3Store;
  const accountForDisplay = `${account.address.slice(
    0,
    5
  )}...${account.address.slice(-4)}`;

  const buildMenuItems = useCallback(() => {
    const menuItems: ItemType[] = [
      {
        label: <Link to={Routes.MyShopping}>My shopping</Link>,
        key: 'my-shopping',
      },
      {
        type: 'divider',
      },
    ];
    if (account.isSeller) {
      menuItems.push({
        label: <Link to={Routes.MyShops}>My Shops</Link>,
        key: 'my-shops',
      });
    } else {
      menuItems.push({
        label: <span>Become a Seller!</span>,
        key: 'become-a-seller',
      });
    }

    return menuItems;
  }, [account.isSeller]);

  return (
    <AntLayout>
      <AntLayout.Header>
        <HeaderContentWrapper>
          <Link to={Routes.Home}>
            <BrandWrapper>DMarkETH</BrandWrapper>
          </Link>
          <Dropdown
            menu={{
              items: buildMenuItems(),
            }}
            trigger={['click']}
          >
            <ProfileButton type='ghost' icon={<CaretDownFilled />}>
              {accountForDisplay}
              <Blockies seed={account.address} size={9} scale={2.5} />
            </ProfileButton>
          </Dropdown>
        </HeaderContentWrapper>
      </AntLayout.Header>
      <ContentWrapper>{children}</ContentWrapper>
    </AntLayout>
  );
});
