import BackdropImage from "@/components/BackdropImage";
import FeaturedInfo from "@/components/FeaturedInfo";
import Navbar from "@/components/Navbar";
import Main from "@/components/Main";
import TitleListSection from "@/components/TitleListSection";
import { ModalMenu } from "@/components/ModalMenu";
import { ModalAddMovie } from "@/components/ModalAddMovie";
import Container from "./Container";
import { Title, FeaturedTitle } from '@/types';

interface ContentViewProps {
  featured: FeaturedTitle
  popularList: Title[]
  userTitles: Title[]
}

export default function ContentView({ featured, userTitles, popularList }: ContentViewProps) {
  return (
    <Container>
      <BackdropImage src={featured.backdropSrc} title={featured.title} />
      <Navbar />
      <Main>
        <FeaturedInfo title={featured.title} />
        <TitleListSection popularList={popularList} userTitles={userTitles} />
        <ModalMenu />
        <ModalAddMovie />
      </Main>
    </Container>
  );
}
