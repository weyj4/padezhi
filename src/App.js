import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import NavigationIcon from '@material-ui/icons/Navigation';
import _ from 'lodash';

import wordList from './wordList';

const useStyles = makeStyles(theme => ({
  root: {
    width: '50%',
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(3),
    overflowX: 'auto',
  },
  error: {
    backgroundColor: 'red'
  }
  // table: {
  //   minWidth: 650,
  // },
}));

const state = {
  'книга': [],
  'земля' : []
}

const cases = ['Родительный Падеж','Дательный Падеж','Винительный Падеж', 'Творительный Падеж', 'Предложный Падеж']

const errorState = {
  'книга': ''
}

export default function App() {
  const classes = useStyles();
  console.log('wordList', wordList);

  function handleChange(event, word, idx) {
    state[word][idx] = event.target.value
    console.log('state', state);
  }

  function validateEntries() {
    console.log(state);
    console.log(wordList);
    _.map(state, (word, k) => {
      _.map(word, (entry, idx) => {
        const correctWord = wordList[k][idx];
        if (entry && entry !== correctWord) {
          console.log(`Error: submission ${entry} !== ${correctWord}`);
          errorState[idx] = 'error';
        }
      })
    });
  }

  return (
    <Paper className={classes.root}>
      {_.map(wordList, (word, key) => (
        <Table key={key} className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Падеж</TableCell>
              <TableCell align="right">Единственное Число</TableCell>
              <TableCell align="right">Множественное Число</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell component="th" scope="row">
                Именительный Падеж
              </TableCell>
              <TableCell align="right">{word[0]}</TableCell>
              <TableCell align="right">
                <Input onChange={(event) => handleChange(event, key, 6)} />
              </TableCell>
            </TableRow>
            {_.map(cases, (val, idx) => 
              <TableRow className={classes[errorState[idx]]}>
                <TableCell component="th" scope="row">
                  {val}
                </TableCell>
                <TableCell align="right">
                  <Input onChange={(event) => handleChange(event, key, idx + 1)}>
                  </Input>
                </TableCell>
                <TableCell align="right">
                  <Input onChange={(event) => handleChange(event, key, idx + 7)}>
                  </Input>
                </TableCell>
              </TableRow>            
            )}
          </TableBody>
        </Table>
      ))}
      <Fab variant="extended" aria-label="Delete" className={classes.fab} onClick={validateEntries}>
        <NavigationIcon className={classes.extendedIcon} />
        Submit
      </Fab>
    </Paper>
  );
}