'use client'

import { useState } from 'react';
import styled from '@emotion/styled';
import { isMobile } from 'react-device-detect';
import { Categories, Title } from '@/types';
import TitleList from "@/components/TitleList";
import CategorySelector from '@/components/CategorySelector';

const Section = styled.div<{ isMobile: boolean }>`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  margin-top: ${isMobile ? '64px' : '80px'};
  margin-bottom: ${isMobile ? '52px' : '86px'};
  min-width: 220px;
`;

interface TitleListSectionProps {
  popularList: Title[];
  userTitles: { title: string; posterPath: string }[];
}

export default function TitleListSection({ popularList, userTitles }: TitleListSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<Categories>('Populares');

  return (
    <Section isMobile={isMobile}>
      <CategorySelector selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
      <TitleList items={selectedCategory === 'Populares' ? popularList : userTitles} />
    </Section>
  );
}