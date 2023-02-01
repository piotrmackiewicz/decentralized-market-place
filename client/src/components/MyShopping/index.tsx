import { Alert, Card, Spin } from 'antd';
import { AxiosError } from 'axios';
import { observer } from 'mobx-react';
import { useQuery } from 'react-query';
import { fetchSales } from '../../api/sales';
import web3Store from '../../store/Web3Store';
import { Sale } from '../../types';
import { SalesList } from '../SalesList';

export const MyShopping = observer(() => {
  const { account } = web3Store;
  const {
    isLoading: isLoadingSales,
    error: errorSales,
    data: sales,
  } = useQuery<{ data: Sale[] }, AxiosError>(
    ['user-sales', account],
    () => fetchSales({ buyer: account.address }),
    {
      enabled: !!account,
    }
  );

  if (isLoadingSales) {
    return <Spin />;
  }

  if (errorSales) {
    return <Alert type='error' message={errorSales.message} />;
  }

  if (sales?.data) {
    return (
      <Card>
        <SalesList sales={sales.data} />
      </Card>
    );
  }

  return null;
});
