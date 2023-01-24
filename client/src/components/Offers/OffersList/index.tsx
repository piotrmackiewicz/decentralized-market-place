import { List } from 'antd';
import { Offer } from '../../../types';
import { ListItem, Wrapper } from './OffersList.styled';
import { OffersListElement } from './OffersListElement';

interface Props {
  offers: Offer[];
}

export const OffersList = ({ offers }: Props) => {
  return (
    <Wrapper>
      <List
        itemLayout='horizontal'
        dataSource={offers}
        renderItem={(offer) => (
          <ListItem>
            <OffersListElement offer={offer} />
          </ListItem>
        )}
      />
    </Wrapper>
  );
};
