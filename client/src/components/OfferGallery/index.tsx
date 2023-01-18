import { useState } from 'react';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Arrow, Dummy, ImageWrapper, Wrapper } from './OfferGallery.styled';

interface Props {
  images: string[];
}

export const OfferGallery = ({ images }: Props) => {
  const [activeImage, setActiveImage] = useState(0);

  const handleArrowClick = (direction: 'left' | 'right') => {
    if (direction === 'left') {
      setActiveImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    } else {
      setActiveImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }
  };

  // TODO: create some fancy carousel gallery instead of this crap
  return (
    <Wrapper>
      <Dummy />
      <ImageWrapper image={images[activeImage]} />
      <Arrow
        type='ghost'
        icon={<LeftOutlined />}
        direction='left'
        onClick={() => handleArrowClick('left')}
      />
      <Arrow
        type='ghost'
        icon={<RightOutlined />}
        direction='right'
        onClick={() => handleArrowClick('right')}
      />
    </Wrapper>
  );
};
