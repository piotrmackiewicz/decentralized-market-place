import { List } from 'antd';
import { Sale } from '../../types';
import { ListItem, Wrapper } from './SalesList.styled';
import { SalesListElement } from './SalesListElement';

interface Props {
  sales: Sale[];
}

export const SalesList = ({ sales }: Props) => {
  return (
    <Wrapper>
      <List
        itemLayout='horizontal'
        dataSource={sales}
        renderItem={(sale) => (
          <ListItem>
            <SalesListElement sale={sale} />
          </ListItem>
        )}
      />
    </Wrapper>
  );
};
