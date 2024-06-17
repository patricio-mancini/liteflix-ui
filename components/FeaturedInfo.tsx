'use client'

import { useMemo } from 'react';
import styled from "@emotion/styled";
import { isMobile } from 'react-device-detect';
import { FontSize, Platform } from '@/lib/theme';
import Text from "./Text";
import Button from "./Button";
import Icon from "./Icon";

const DesktopInfoContainer = styled.div`
  position: relative;
  height: calc(100vh - 72px);
  width: 100%;
`;

const DesktopInfoCard = styled.div`
  position: absolute;
  bottom: 130px;
`;

const MobileContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: center;
  gap: 16px;
`;

const H2 = styled.h2<{ isMobile: boolean }>`
  margin: ${isMobile ? '0' : '24px 0'};
  ${isMobile && 'text-align: center;'}
`;

const StyledControls = styled.div<{ isMobile: boolean }>`
  display: flex;
  flex-flow: row nowrap;
  gap: 24px;
  ${isMobile && `
    flex-flow: column nowrap;
    gap: 16px;
    align-items: center;
  `}
`;

export function Container({ children }: Readonly<{ children: React.ReactNode }>) {
  if (isMobile) {
    return (
      <MobileContainer>
        {children}
      </MobileContainer>
    );
  }
  return (
    <DesktopInfoContainer>
      <DesktopInfoCard>
        {children}
      </DesktopInfoCard>
    </DesktopInfoContainer>
  );
}

export function LiteflixLabel() {
  const { platform, fontSize } = useMemo<{ platform: Platform, fontSize: FontSize }>(()=> {
    return {
      platform: isMobile ? 'mobile' : 'web',
      fontSize: 'xLarge'
    };
  }, []);

  return (
    <div>
      <Text platform={platform} fontSize={fontSize} color='secondary' fontWeight={300} letterSpacing='4px'>Original</Text>
      <Text platform={platform} fontSize={fontSize} color='secondary' fontWeight={300} letterSpacing='4px' lineHeight="24px"> </Text>
      <Text platform={platform} fontSize={fontSize} color='secondary' fontWeight={300} letterSpacing='4px'>de</Text>
      <Text platform={platform} fontSize={fontSize} color='secondary' fontWeight={300} letterSpacing='4px' lineHeight="24px"> </Text>
      <Text platform={platform} fontSize={fontSize} color='secondary' fontWeight={700} letterSpacing='4px'>Liteflix</Text>
    </div>
  );
}

export function Title({ title }: Readonly<{ title: string }>) {
  const { platform, fontSize, lineHeight, letterSpacing } = useMemo<{
    platform: Platform,
    fontSize: FontSize,
    lineHeight: string,
    letterSpacing: string
  }>(()=> {
    return {
      platform: isMobile ? 'mobile' : 'web',
      fontSize: 'title',
      lineHeight: isMobile ? '77.5px' : '100px',
      letterSpacing: isMobile ? '12px' : '16px'
    };
  }, []);

  return (
    <H2 isMobile={isMobile}>
      <Text
        platform={platform}
        fontSize={fontSize}
        color='accent'
        fontWeight={700}
        letterSpacing={letterSpacing}
        lineHeight={lineHeight}
      >{title}</Text>
    </H2>
  );
}

export function Controls() {
  const { platform, fontSize } = useMemo<{ platform: Platform, fontSize: FontSize }>(()=> {
    return {
      platform: isMobile ? 'mobile' : 'web',
      fontSize: 'large'
    };
  }, []);

  return (
    <StyledControls isMobile={isMobile}>
      <Button variant='primary'>
        <span>
          <Icon icon='play' height={14} width={14} alt='Reproducir' />
        </span>
        <Text
          platform={platform}
          fontSize={fontSize}
          color='secondary'
          fontWeight={300}
          letterSpacing='4px'
          lineHeight="21.6px"
        >Reproducir</Text>
      </Button>
      <Button variant='secondary'>
        <span>
          <Icon icon='plus' height={14} width={14} alt='Agregar' />
        </span>
        <Text
          platform={platform}
          fontSize={fontSize}
          color='secondary'
          fontWeight={300}
          letterSpacing='4px'
          lineHeight="21.6px"
        >Mi Lista</Text>
      </Button>
    </StyledControls>
  );
}

export default function FeaturedInfo({ title }: Readonly<{ title: string }>) {
  return (
    <Container>
      <LiteflixLabel />
      <Title title={title} />
      <Controls />
    </Container>
  );
}
