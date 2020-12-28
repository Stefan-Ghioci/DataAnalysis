import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import CssBaseline from '@material-ui/core/CssBaseline';
import InputAdornment from '@material-ui/core/InputAdornment';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import {
  createMuiTheme,
  makeStyles,
  ThemeProvider,
} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { searchMovies } from './movie_repository';
import { Movie } from './types';
import MovieCard from './MovieCard';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(2),
    },
  },
}));

const Main = () => {
  const classes = useStyles();
  const [searchText, setSearchText] = useState('');
  const [foundMovies, setFoundMovies] = useState(new Set<Movie>());

  const handleSearchTextChanged = (event: { target: { value: string } }) => {
    const newValue = event.target.value;
    setSearchText(newValue);
  };

  const handleFindSimilarMovie = (id: number) => {
    // TODO: implement after clustering done
  };

  useEffect(() => {
    if (searchText.length >= 3) setFoundMovies(searchMovies(searchText));
    else setFoundMovies(new Set<Movie>());
  }, [searchText]);

  return (
    <Container maxWidth="sm" className={classes.root}>
      <Card>
        <CardHeader title="Select a movie, find similar ones" />
        <CardActions>
          <TextField
            fullWidth
            placeholder="Search"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            value={searchText}
            onChange={handleSearchTextChanged}
          />
        </CardActions>
      </Card>
      <Typography variant="h6">
        {/* eslint-disable-next-line no-nested-ternary */}
        {foundMovies.size !== 0
          ? 'Found matches'
          : searchText.length >= 3
          ? 'No matches found'
          : ''}
      </Typography>
      {Array.from(foundMovies).map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onFindSimilarMovie={handleFindSimilarMovie}
        />
      ))}
    </Container>
  );
};

export default function App() {
  return (
    <ThemeProvider theme={createMuiTheme({ palette: { type: 'dark' } })}>
      <CssBaseline />
      <Router>
        <Switch>
          <Route path="/" component={Main} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
}
