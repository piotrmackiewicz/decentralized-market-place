import { Alert, Spin } from 'antd';
import { AxiosError } from 'axios';
import { observer } from 'mobx-react';
import { useQuery } from 'react-query';
import { fetchSales } from '../../api/sales';
import web3Store from '../../store/Web3Store';
import { Sale } from '../../types';

export const MyShopping = observer(() => {
  const { account } = web3Store;
  const { isLoading, error, data } = useQuery<{ data: Sale[] }, AxiosError>(
    ['user-sales', account],
    () => fetchSales({ buyer: account }),
    {
      enabled: !!account,
    }
  );

  if (isLoading) {
    return <Spin />;
  }

  if (error) {
    return <Alert type='error' message={error.message} />;
  }

  if (data?.data) {
    return <p>{JSON.stringify(data.data)}</p>;
  }

  return null;
});
