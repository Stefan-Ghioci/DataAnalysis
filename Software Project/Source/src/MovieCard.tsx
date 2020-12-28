import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { Movie } from './types';

interface MovieCardProps {
  movie: Movie;
  onFindSimilarMovie: (id: number) => void;
}

const MovieCard = ({ movie, onFindSimilarMovie }: MovieCardProps) => {
  return (
    <Card>
      <CardHeader
        title={`${movie.title} (${movie.releaseDate.getFullYear()})`}
        subheader={movie.genres.map((genre) => genre.name).join(', ')}
      />
      <CardContent>
        <Typography variant="body2">{movie.overview}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => onFindSimilarMovie(movie.id)}>
          Find similar
        </Button>
      </CardActions>
    </Card>
  );
};

export default MovieCard;
