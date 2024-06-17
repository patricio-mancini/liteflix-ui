'use client'

import styled from '@emotion/styled';
import { Theme } from '@/lib/theme';
import { useState, useEffect } from 'react';

const OverlayWrapper = styled.div<{ theme?: Theme, isVisible: boolean, isRendering: boolean, zIndex: number }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  visibility: ${({ isRendering }) => (isRendering ? 'visible' : 'hidden')};
  background-color: ${({ theme }) => theme.colors.primaryTransparent(0.8)};
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transition: opacity 0.4s;
  z-index: ${({ zIndex }) => zIndex};
`;

interface OverlayProps {
  isVisible: boolean;
  zIndex?: number;
}

export function Overlay({ isVisible, zIndex = 4 }: OverlayProps) {
  const [isRendering, setIsRendering] = useState(isVisible);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (isVisible) {
      setIsRendering(true);
    } else {
      timeoutId = setTimeout(() => setIsRendering(false), 400);
    }
    return () => clearTimeout(timeoutId);
  }, [isVisible]);

  return <OverlayWrapper isVisible={isVisible} isRendering={isRendering} zIndex={zIndex} />;
}
