import React, { Component }  from 'react';
import { withStyles } from '@material-ui/core/styles';
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

import CaseRow from './components/CaseRow';
import Tabs from './components/Tabs';
import wordList from './wordList';

const styles = theme => ({
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
});

const cases = ['Родительный Падеж','Дательный Падеж','Винительный Падеж', 'Творительный Падеж', 'Предложный Падеж']

class App extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.setTab = this.setTab.bind(this);
  }

  state = {}

  handleChange(event, word, idx) {
    const input = this.state.input;
    console.log('this.state', this.state);
    input[word][idx] = event.target.value
    this.setState({
      input
    })
  }

  setTab(event, newValue) {
    const wl = wordList(newValue);
    this.setState({
      category: newValue,
      wordList: wl,
      input: _.mapValues(wl, (word) => []),
      errors: _.mapValues(wl, (word) => [])
    });
    console.log('set this.state', this.state);
  }

  validateEntries = () => {
    _.map(this.state.input, (declinedValues, wordRoot) => {
      _.map(declinedValues, (value, declensionIdx) => {
        const correctWord = this.state.wordList[wordRoot][declensionIdx];
        const errors = this.state.errors;
        if (value && value !== correctWord) {
          _.set(errors, [wordRoot, declensionIdx], 'error');
          this.setState({
            errors
          });
        } else {
          _.set(errors, [wordRoot, declensionIdx], '');
          this.setState({
            errors
          });
        }
      });
    });
  }
  
  render() {
    const { classes } = this.props;

    return (
      <Paper className={classes.root}>
        <Tabs 
          handleChange={(event, newValue) => this.setTab(event, newValue)}
          value={this.state.category}
        />
        {_.map(this.state.wordList, (word, key) => (
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
                  <Input onChange={(event) => this.handleChange(event, key, 6)} />
                </TableCell>
              </TableRow>
              {_.map(cases, (val, idx) => 
                <CaseRow
                  hasErrorsSingular={classes[_.get(this.state.errors, [word[0], idx + 1])]}
                  hasErrorsPlural={classes[_.get(this.state.errors, [word[0], idx + 7])]}
                  val={val}
                  handleChangeSingular={(event) => this.handleChange(event, key, idx + 1)}
                  handleChangePlural={(event) => this.handleChange(event, key, idx + 7)}
                  key={idx}
                />
              )}
            </TableBody>
          </Table>
        ))}
        <Fab variant="extended" aria-label="Delete" className={classes.fab} onClick={this.validateEntries}>
          <NavigationIcon className={classes.extendedIcon} />
          Submit
        </Fab>
      </Paper>
    );
  }
}

export default withStyles(styles)(App);