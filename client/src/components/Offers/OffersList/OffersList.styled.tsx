import { List } from 'antd';
import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 12px;
`;

export const ListItem = styled(List.Item)`
  padding: 0 !important;
`;
