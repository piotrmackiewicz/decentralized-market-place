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

interface Props {
  children: React.ReactNode;
}

export const Layout = observer(({ children }: Props) => {
  const { account } = web3Store;
  const accountForDisplay = `${account.slice(0, 5)}...${account.slice(-4)}`;

  return (
    <AntLayout>
      <AntLayout.Header>
        <HeaderContentWrapper>
          <Link to='/'>
            <BrandWrapper>DMarkETH</BrandWrapper>
          </Link>
          <Dropdown
            menu={{
              items: [
                {
                  label: <span>Become a Seller!</span>,
                  key: 'become-a-seller',
                },
              ],
            }}
            trigger={['click']}
          >
            <ProfileButton type='ghost' icon={<CaretDownFilled />}>
              {accountForDisplay}
              <Blockies seed={account} size={9} scale={2.5} />
            </ProfileButton>
          </Dropdown>
        </HeaderContentWrapper>
      </AntLayout.Header>
      <ContentWrapper>{children}</ContentWrapper>
    </AntLayout>
  );
});
