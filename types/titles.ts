export type Categories = 'Mis Películas' | 'Populares';

export interface Title {
  id?: number;
  title: string;
  voteAverage?: number;
  releaseYear?: string;
  posterPath: string;
}

export interface FeaturedTitle {
  id: number
  title: string
  backdropSrc: string
}