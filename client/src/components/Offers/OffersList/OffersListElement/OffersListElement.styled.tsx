import { Avatar as AntdAvatar } from 'antd';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Wrapper = styled(Link)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 12px 0;
`;

export const Avatar = styled(AntdAvatar)`
  margin-right: 12px;
`;

export const LeftSideWrapper = styled.div`
  display: flex;
`;

export const RightSideWrapper = styled.div``;
