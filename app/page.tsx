
import ContentView from "@/components/ContentView";

import { fetchFeaturedTitle, fetchPopularTitles, fetchUserTitles } from '@/lib/api/server';

export default async function Home() {
  const featured = await fetchFeaturedTitle();
  const userTitles = await fetchUserTitles();
  let popularList = await fetchPopularTitles();
  popularList = popularList.filter(title => title.id !== featured.id).slice(0, 4);

  return (
    <ContentView featured={featured} popularList={popularList} userTitles={userTitles} />
  );
}
