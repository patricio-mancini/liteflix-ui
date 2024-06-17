'use client';

import Image from 'next/image';
import styled from '@emotion/styled';
import { isMobile } from 'react-device-detect';
import LinearGradient from './LinearGradient';
import { useScrollPosition } from '../lib/hooks/useScrollPosition';

const ImageContainer = styled.div`
  width: 100%;
  max-height: 934px;
`;

const StyledImage = styled(Image)`
  z-index: -1;
  object-fit: cover;
  width: auto;
  height: auto;
`;

interface BackdropImageProps {
  src: string;
  title: string;
}

export default function BackdropImage({ src, title }: Readonly<BackdropImageProps>) {
  const { isScrolled } = useScrollPosition();

  return (
    <ImageContainer>
      <StyledImage 
        priority
        src={src}
        alt={title}
        fill
        sizes="(max-width: 768px) 80vw, (max-width: 1200px) 90vw, 100vw"
      />
      {(isScrolled || isMobile) && <LinearGradient />}
    </ImageContainer>
  );
}
