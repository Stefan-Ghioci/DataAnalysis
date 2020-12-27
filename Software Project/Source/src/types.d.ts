export type Movie = {
  id: number;
  genres: { id: number; name: string }[];
  keywords: { id: number; name: string }[];
  overview: string;
  popularity: number;
  releaseDate: Date;
  runtime: number;
  title: string;
  voteAverage: number;
  voteCount: number;
  cast: { id: number; character: string; name: string }[];
  crew: { id: number; job: string; name: string }[];
};

export type MovieData = {
  id: string;
  genres: string;
  keywords: string;
  overview: string;
  popularity: string;
  release_date: string;
  runtime: string;
  title: string;
  vote_average: string;
  vote_count: string;
};

export type CreditsData = {
  movie_id: string;
  cast: string;
  crew: string;
};
