import { Alert, Card, List, Spin } from 'antd';
import { AxiosError } from 'axios';
import { useQuery } from 'react-query';
import { fetchOffersByCategoryId } from '../../api/offers';
import { Offer } from '../../types';
import { ListItem, Wrapper } from './CategoryOffers.styled';
import { CategoryOffersElement } from './CategoryOffersElement';

interface Props {
  categoryId: string;
}

export const CategoryOffers = ({ categoryId }: Props) => {
  const { isLoading, error, data } = useQuery<{ data: Offer[] }, AxiosError>(
    ['category-offers', categoryId],
    () => fetchOffersByCategoryId(Number(categoryId))
  );

  if (isLoading) {
    return <Spin />;
  }

  if (error) {
    return <Alert type='error' message={error.message} />;
  }

  return (
    <Card>
      <Wrapper>
        {/* {data?.offers.map((offer) => (
          <CategoryOffersElement offer={offer} />
        ))} */}
        <List
          itemLayout='horizontal'
          dataSource={data?.data}
          renderItem={(offer) => (
            <ListItem>
              <CategoryOffersElement offer={offer} />
            </ListItem>
          )}
        />
      </Wrapper>
    </Card>
  );
};
