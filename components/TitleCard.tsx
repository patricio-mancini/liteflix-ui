import { useState } from 'react';
import Image from "next/image";
import styled from 'styled-components';
import Icon from "./Icon";
import Text from './Text';
import { Theme } from '@/lib/theme';

const Card = styled.div`
  position: relative;
  display: flex;
  flex-flow: column nowrap;
  height: 146px;
  width: 220px;
`;

const StyledImage = styled(Image)`
  object-fit: cover;
  object-position: 50% 40%;
  border-radius: 4px;
`;

const Gradient = styled.div<{ theme?: Theme, $isHovered: boolean }>`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 1;
  transition: background 0.5s;
  ${({ $isHovered, theme }) => $isHovered ?
    `background: ${theme.colors.primaryTransparent(0.5)}; height: 100%;` :
    `background: linear-gradient(180deg, rgba(0, 0, 0, 0) calc(100% - 100px), rgba(0, 0, 0, .8)); height: 100%;`
  };
`;

const PlayOverlay = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 2;
`;

const TextOverlay = styled.div`
  display: flex;
  justify-content: center;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  margin-bottom: 14px;
  z-index: 2;
`;

const textOverrideStyles = `
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  width: 80%;
`;

const HoverOverlay = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-end;
  gap: 21px;
  padding: 0px 16px 16px 16px;
  width: 100%;
  height: 100%;
  z-index: 2;
  box-sizing: border-box;
`;

const TitleRow = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 12px;
`;

const titleRowOverrides = `
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  width: 80%;
`;

const TitleInfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const VoteInfo = styled.div`
  display: flex;
  justify-content: center;
  gap: 6px;
`;

const PlayIconContainer = styled.span<{ $isRowPlayHovered: boolean }>`
  animation-name: ${({ $isRowPlayHovered }) => ($isRowPlayHovered ? 'fade-in' : 'fade-out')};
  animation-timing-function: ease-out;
  animation-duration: 450ms;
  animation-fill-mode: both;
  cursor: pointer;
}

@keyframes fade-out {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}`;

interface TitleCardProps {
  title: string
  voteAverage?: number
  year?: string
  src: string;
}

export default function TitleCard({
  title,
  voteAverage,
  year,
  src
}: Readonly<TitleCardProps>) {
  const [isHovered, setIsHovered] = useState(false);
  const [isRowPlayHovered, setIsRowPlayHovered] = useState(false);

  return (
    <Card
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <StyledImage
        priority
        src={src}
        alt={title}
        fill
        sizes="(max-width: 768px) 30vw, (max-width: 1200px) 20vw, 15vw"
      />
      <Gradient $isHovered={isHovered} />
      {!isHovered || !year || !voteAverage ? (
        <>
          <PlayOverlay>
            <PlayIconContainer
              $isRowPlayHovered={isRowPlayHovered}
              onMouseEnter={() => setIsRowPlayHovered(true)}
              onMouseLeave={() => setIsRowPlayHovered(false)}
            >
              <Icon
                icon={isRowPlayHovered ? "outlinedPlayHover" : "outlinedPlay"}
                alt="Reproducir"
                height={40}
                width={40}
              />
            </PlayIconContainer>
          </PlayOverlay>
          <TextOverlay>
            <Text
              platform='web'
              fontSize='medium'
              color='secondary'
              fontWeight={300}
              letterSpacing='4px'
              override={textOverrideStyles}
            >
              {title}
            </Text>
          </TextOverlay>
        </>
      ) : (
        <HoverOverlay>
          <TitleRow>
            <PlayIconContainer
              $isRowPlayHovered={isRowPlayHovered}
              onMouseEnter={() => setIsRowPlayHovered(true)}
              onMouseLeave={() => setIsRowPlayHovered(false)}
            >
              <Icon
                icon={isRowPlayHovered ? "outlinedPlayHover" : "outlinedPlay"} 
                alt="Reproducir" 
                height={24} 
                width={24}
                />
            </PlayIconContainer>
            <Text
                platform='web'
                fontSize='medium'
                color='secondary'
                fontWeight={300}
                letterSpacing='4px'
                override={titleRowOverrides}
              >
                {title}
              </Text>
          </TitleRow>
          <TitleInfoRow>
            <VoteInfo>
              <span>
                <Icon icon="star" alt="Puntuación" height={12} width={12} />
              </span>
              <Text
                  platform='web'
                  fontSize='small'
                  color='secondary'
                  fontWeight={300}
                  lineHeight='16px'
                  letterSpacing='2px'
                >
                  {voteAverage}
                </Text>
            </VoteInfo>
            <Text
              platform='web'
              fontSize='small'
              color='secondary'
              fontWeight={300}
              lineHeight='16px'
              letterSpacing='2px'
            >
              {year}
            </Text>
          </TitleInfoRow>
        </HoverOverlay>
      )}
    </Card>
  )
}
