'use client';

import styled from 'styled-components';
import { isMobile } from 'react-device-detect';
import Logo from '../Logo';
import Text from '../Text';
import Button from '../Button';

const LogoContainer = styled.div`
padding-top: 16px;
`;

const MainContent = styled.div`
display: flex;
flex-flow: column nowrap;
align-items: center;
gap: ${isMobile ? '32px' : '24px'}; 
padding-top: ${isMobile ? '96px' : '24px'}; 
padding-bottom: ${isMobile ? '37px' : '44px'}; 
`;

export default function Congratulations({ title, onClose }: Readonly<{ title: string, onClose: () => void }>) {
  const platform = isMobile ? 'mobile' : 'web';
  const confirmationLineHeight = isMobile ? '32px' : '24px';
  return (
    <>
      {!isMobile && (
        <LogoContainer>
          <Logo platform='web' fontSize='xxxxLarge' />
        </LogoContainer>
      )}
      <MainContent>
        <Text
          platform={platform}
          fontSize='xxxLarge'
          color='secondary'
          fontWeight={700}
          letterSpacing='4px'
          lineHeight="26px"
        >¡Felicitaciones!</Text>
        <Text
          platform={platform}
          fontSize='xLarge'
          color='secondary'
          fontWeight={300}
          letterSpacing='4px'
          lineHeight={confirmationLineHeight}
          override='text-align: center;'
        >{title} fue correctamente subida.</Text>
      </MainContent>
      <Button variant='highlight' onClick={onClose}>
        <Text platform={platform} fontSize='large' color='primary' fontWeight={300} letterSpacing='4px' lineHeight="17px">ir a home</Text>
      </Button>
    </>
  );
}