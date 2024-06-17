'use client'

import { useState, useEffect } from "react";
import styled from '@emotion/styled';
import BackdropImage from "@/components/BackdropImage";
import FeaturedInfo from "@/components/FeaturedInfo";
import Navbar from "@/components/Navbar";
import Main from "@/components/Main";
import TitleListSection from "@/components/TitleListSection";
import { ModalMenu } from "@/components/ModalMenu";
import { ModalAddMovie } from "@/components/ModalAddMovie";
import { Title, FeaturedTitle } from '@/types';

interface ContentViewProps {
  featured: FeaturedTitle
  popularList: Title[]
  userTitles: Title[]
}

const Container = styled.div`
  position: relative;
  display: flex;
  flex-flow: column nowrap;
  height: 100%;
  box-sizing: border-box;
`;

export default function ContentView({ featured, userTitles, popularList }: ContentViewProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <Container>
      {isClient && (
        <>
          <BackdropImage src={featured.backdropSrc} title={featured.title} />
          <Navbar />
          <Main>
            <FeaturedInfo title={featured.title} />
            <TitleListSection popularList={popularList} userTitles={userTitles} />
            <ModalMenu />
            <ModalAddMovie />
          </Main>
        </>
      )}
    </Container>
  );
}
