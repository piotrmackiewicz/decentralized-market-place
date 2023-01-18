import { Button } from 'antd';
import styled from 'styled-components';

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-auto-rows: 1fr;
  grid-gap: 15px;

  &::before {
    content: '';
    width: 0;
    padding-bottom: 100%;
    grid-row: 1 / 1;
    grid-column: 1 / 1;
  }

  & > *:first-child {
    grid-row: 1 / 1;
    grid-column: 1 / 1;
  }

  & > * {
    min-width: 0;
    min-height: 0;
  }
`;

export const CategoryButton = styled(Button)`
  height: 100%;
  width: 100%;
  font-size: 2rem;
  font-weight: 700;
`;
