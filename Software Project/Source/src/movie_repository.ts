import csv from 'csv-parser';
import fs from 'fs';
import { CreditsData, Movie, MovieData } from './types';

export const movies: Movie[] = [];

const movieDataList: MovieData[] = [];
const creditsDataList: CreditsData[] = [];

fs.createReadStream('assets/data/tmdb_5000_movies.csv')
  .pipe(csv())
  .on('data', (data) => movieDataList.push(data))
  .on('end', () => {
    fs.createReadStream('assets/data/tmdb_5000_credits.csv')
      .pipe(csv())
      .on('data', (data) => creditsDataList.push(data))
      .on('end', () => {
        movieDataList.forEach((movieData) => {
          const { overview, title } = movieData;

          const id = parseInt(movieData.id, 10);
          const runtime = parseInt(movieData.runtime, 10);
          const voteCount = parseInt(movieData.vote_count, 10);

          const popularity = parseFloat(movieData.popularity);
          const voteAverage = parseFloat(movieData.vote_average);

          const releaseDate = new Date(movieData.release_date);

          const genres: { id: number; name: string }[] = [];
          JSON.parse(movieData.genres).forEach(
            (genre: { id: string; name: string }) => {
              genres.push({
                id: parseInt(genre.id, 10),
                name: genre.name,
              });
            }
          );
          const keywords: { id: number; name: string }[] = [];
          JSON.parse(movieData.keywords).forEach(
            (keyword: { id: string; name: string }) => {
              keywords.push({
                id: parseInt(keyword.id, 10),
                name: keyword.name,
              });
            }
          );

          const creditsData = creditsDataList.find(
            (data) => data.movie_id === movieData.id
          );
          const cast: { id: number; character: string; name: string }[] = [];
          const crew: { id: number; job: string; name: string }[] = [];
          if (creditsData) {
            JSON.parse(creditsData.cast).forEach(
              (actor: { id: string; character: string; name: string }) => {
                cast.push({
                  id: parseInt(actor.id, 10),
                  character: actor.character,
                  name: actor.name,
                });
              }
            );
            JSON.parse(creditsData.crew).forEach(
              (member: { id: string; job: string; name: string }) => {
                crew.push({
                  id: parseInt(member.id, 10),
                  job: member.job,
                  name: member.name,
                });
              }
            );
          }

          movies.push({
            id,
            genres,
            keywords,
            overview,
            popularity,
            releaseDate,
            runtime,
            title,
            voteAverage,
            voteCount,
            cast,
            crew,
          });
        });
      });
  });

export const searchMovies = (query: string) => {
  const foundMovies = new Set<Movie>();

  // find by title
  movies.forEach((movie) => {
    if (movie.title.toUpperCase().includes(query.toUpperCase()))
      foundMovies.add(movie);
  });

  // find by keyword
  movies.forEach((movie) => {
    if (
      movie.keywords.find((keyword) =>
        keyword.name.toUpperCase().includes(query.toUpperCase())
      )
    )
      foundMovies.add(movie);
  });

  // find by cast
  movies.forEach((movie) => {
    if (
      movie.cast.find(
        (actor) =>
          actor.name.toUpperCase().includes(query.toUpperCase()) ||
          actor.character.toUpperCase().includes(query.toUpperCase())
      )
    )
      foundMovies.add(movie);
  });

  // find by genre
  movies.forEach((movie) => {
    if (
      movie.genres.find((genre) =>
        genre.name.toUpperCase().includes(query.toUpperCase())
      )
    )
      foundMovies.add(movie);
  });

  // find by crew
  movies.forEach((movie) => {
    if (
      movie.crew.find((member) =>
        member.name.toUpperCase().includes(query.toUpperCase())
      )
    )
      foundMovies.add(movie);
  });

  return foundMovies;
};
