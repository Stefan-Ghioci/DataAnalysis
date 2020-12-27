import React, { useState } from 'react';
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

const useStyles = makeStyles((theme) => ({
  search: {
    margin: theme.spacing(2),
  },
}));

const Main = () => {
  const classes = useStyles();
  const [searchText, setSearchText] = useState('');

  const handleSearchTextChanged = (event: { target: { value: string } }) => {
    const newValue = event.target.value;
    setSearchText(newValue);
  };
  return (
    <Container maxWidth="sm">
      <Card className={classes.search}>
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
