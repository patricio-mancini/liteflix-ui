import { useMemo } from 'react';
import styled from 'styled-components';
import { isMobile } from 'react-device-detect';
import { Theme } from '@/lib/theme';
import { FontSize, Platform } from '@/lib/theme';
import Text from './Text';

interface ProgressBarProps {
  progress: number
  isError: boolean
  onAction: (action: ActionType) => void
}

enum Labels {
  DONE = '¡listo!',
  RETRY = 'reintentar',
  CANCEL = 'cancelar'
}

const Bar = styled.div<{ theme?: Theme }>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 4px;
  background-color: ${({ theme }) => theme.colors.secondaryTransparent(0.5)};
`;

const ProgressIndicator = styled.div<{ progress: number, isError: boolean, theme?: Theme }>`
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  width: ${({ progress, isError }) => (isError ? '100%' : `${progress}%`)};
  height: 10px;
  background-color: ${({ theme, isError }) => (isError ? theme.colors.danger : theme.colors.accent)};
`;


const Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
  gap: 16px;
`;

const BarContainer = styled.div`
  position: relative;
`;

const ActionContainer = styled.span`
  align-self: flex-end;
  cursor: pointer;
  padding-top: 4px;
`;

export type ActionType = 'retry' | 'cancel'; 

function calculateActionLabel(progress: number, isError: boolean): string | null {
  if (progress === 100 && !isError) {
    return Labels.DONE;
  } else if (progress < 100) {
    return isError ? Labels.RETRY : Labels.CANCEL;
  }
  return null;
}

export default function ProgressBar({ progress, isError, onAction }: Readonly<ProgressBarProps>) {
  const actionLabel = calculateActionLabel(progress, isError);

  const actionHandler = () => {
    if(actionLabel === Labels.DONE) {
      return;
    }
    onAction(actionLabel === Labels.RETRY ? 'retry' : 'cancel');
  }

  const { platform, fontSize, lineHeight } = useMemo<{
    platform: Platform,
    fontSize: FontSize,
    lineHeight: string
  }>(()=> {
    return {
      platform: isMobile ? 'mobile' : 'web',
      fontSize: isMobile ? 'small' : 'medium',
      lineHeight: isMobile ? '16.8px' : '19.2px'
    };
  }, []);

  return (
    <Container>
      <div>
        {isError ? (
          <>
            <Text
              platform={platform}
              fontSize={fontSize}
              color="secondary"
              fontWeight={700}
              letterSpacing="4px"
            >
              ¡error!
            </Text>
            <Text
              platform={platform}
              fontSize={fontSize}
              color="secondary"
              fontWeight={300}
              letterSpacing="4px"
              lineHeight={lineHeight}
              override="white-space: pre-wrap;"
            >
              no se pudo cargar la película
            </Text>
          </>
        ) : progress === 100 ? (
          <Text
            platform={platform}
            fontSize={fontSize}
            color="secondary"
            fontWeight={700}
            letterSpacing="4px"
            override="white-space: pre-wrap;"
          >
            {progress}% cargado
          </Text>
        ) : (
          <>
            <Text
              platform={platform}
              fontSize={fontSize}
              color="secondary"
              fontWeight={300}
              letterSpacing="4px"
              lineHeight={lineHeight}
            >
              cargando
            </Text>
            <Text
              platform={platform}
              fontSize={fontSize}
              color="secondary"
              fontWeight={700}
              letterSpacing="4px"
              override="white-space: pre-wrap;"
            >
              {progress}%
            </Text>
          </>
        )}
      </div>
      <BarContainer>
        <Bar>
          <ProgressIndicator progress={progress} isError={isError} />
        </Bar>
      </BarContainer>
      <ActionContainer onClick={actionHandler}>
        <Text
          platform="web"
          fontSize="large"
          color={actionLabel === Labels.DONE ? 'accent' : 'secondary'}
          fontWeight={actionLabel === Labels.DONE ? 300 : 700}
          letterSpacing="4px"
        >
          {actionLabel}
        </Text>
      </ActionContainer>
    </Container>
  );
}