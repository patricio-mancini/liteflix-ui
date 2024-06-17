'use client'

import styled from '@emotion/styled';
import TitleCard from "./TitleCard";
import { Title } from '@/types/titles';

const CardList = styled.ul`
  display: flex;
  flex-flow: column nowrap;
  gap: 20px;
  margin-top: 32px;
`;

interface TitleListProps {
  items: Title[];
}


export default function TitleList({ items }: TitleListProps) {
  return (
    <CardList>
      {
        items.map((item) => (
          <li key={item.id }>
            <TitleCard
              title={item.title}
              src={item.posterPath}
              voteAverage={item.voteAverage}
              year={item.releaseYear}
            />
          </li>
        ))
      }
    </CardList>
  );
}
