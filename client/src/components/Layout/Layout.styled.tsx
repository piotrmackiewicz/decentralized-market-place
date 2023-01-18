import { Button, Layout } from 'antd';
import styled from 'styled-components';

export const ContentWrapper = styled(Layout.Content)`
  padding: 50px 10%;
  /* 64px = header height */
  min-height: calc(100vh - 64px) !important;
`;

export const HeaderContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const BrandWrapper = styled.div`
  color: #f5f5f5;
  font-size: 1.5rem;
  font-weight: 800;
`;

export const ProfileButton = styled(Button)`
  color: #f5f5f5;
  display: flex;
  align-items: center;
  gap: 8px;
`;
