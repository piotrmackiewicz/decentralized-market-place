import { Alert, Spin, Tag } from 'antd';
import Table, { ColumnsType } from 'antd/es/table';
import { fetchShops } from 'api/shops';
import { AxiosError } from 'axios';
import { Layout } from 'components/Layout';
import { Routes } from 'components/Router/routes';
import { observer } from 'mobx-react';
import { useQuery } from 'react-query';
import { Link, Navigate } from 'react-router-dom';
import web3Store from 'store/Web3Store';
import { Shop } from 'types';

interface DataType {
  key: React.Key;
  name: string;
  offersCount: number;
  salesCount: number;
  paymentAddress: string;
  suspended: boolean;
}

export const MyShopsPage = observer(() => {
  const { account } = web3Store;
  const { isLoading, error, data } = useQuery<{ data: Shop[] }, AxiosError>(
    ['shops', account.address],
    () => fetchShops({ owner: account.address }),
    {
      enabled: account.isSeller,
    }
  );

  // TODO: this should be memoized somehow
  const columns: ColumnsType<DataType> = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Offers Count',
      dataIndex: 'offersCount',
    },
    {
      title: 'Sales Count',
      dataIndex: 'salesCount',
    },
    {
      title: 'Payment Address',
      dataIndex: 'paymentAddress',
    },
    {
      title: 'Suspended',
      dataIndex: 'suspended',
      render: (_, shop) => (
        <Tag color={shop.suspended ? 'red' : 'green'}>
          {shop.suspended ? 'Yes' : 'No'}
        </Tag>
      ),
    },
    {
      key: 'action',
      render: (_, { key }) => (
        <Link to={Routes.MyShopOffers.replace(':shopId', key.toString())}>
          Go to offers
        </Link>
      ),
    },
  ];

  if (!account.isSeller) {
    return <Navigate to={Routes.Home} replace />;
  }

  if (isLoading) {
    return <Spin />;
  }

  if (error) {
    return <Alert type='error' message={error.message} />;
  }

  if (!data) {
    return null;
  }

  const tableData = data.data.map((shop) => ({
    key: shop.id,
    name: shop.name,
    offersCount: shop.offersCount,
    salesCount: shop.salesCount,
    paymentAddress: shop.paymentAddress,
    suspended: shop.offersSuspended,
  }));

  return (
    <Layout>
      <Table columns={columns} dataSource={tableData} pagination={false} />
    </Layout>
  );
});
