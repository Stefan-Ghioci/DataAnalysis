import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import InputAdornment from '@material-ui/core/InputAdornment';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    alignContent: 'space-around',
    '& > *': {
      margin: '2.5vh 5vh',
    },
  },
});

const Main = () => {
  const classes = useStyles();
  const [searchText, setSearchText] = useState('');

  const handleSearchTextChanged = (event) => {
    const newValue = event.target.value;
    setSearchText(newValue);

    if (newValue.length >= 3)
      // TODO: search movies
      console.log('Searching for movies by keyword {}', newValue);
  };
  return (
    <Paper className={classes.root} elevation={3}>
      <Typography variant="h6">Select a movie, find similar ones</Typography>
      <Box>
        <TextField
          variant="standard"
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
      </Box>
    </Paper>
  );
};

export default function App() {
  return (
    <>
      <CssBaseline />
      <Router>
        <Switch>
          <Route path="/" component={Main} />
        </Switch>
      </Router>
    </>
  );
}
