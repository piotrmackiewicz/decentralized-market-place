import { Button } from 'antd';
import styled from 'styled-components';

export const Wrapper = styled.div`
  display: inline-block;
  position: relative;
  width: 100%;
`;

export const Dummy = styled.div`
  margin-top: 75%;
`;

export const ImageWrapper = styled.div<{ image: string }>`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-image: ${({ image }) => `url("${image}")`};
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
`;

export const Arrow = styled(Button)<{ direction: 'left' | 'right' }>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: ${({ direction }) => (direction === 'left' ? 0 : 'auto')};
  right: ${({ direction }) => (direction === 'right' ? 0 : 'auto')};
  background-color: rgb(0, 0, 0, 0.5);
  color: white;
`;
