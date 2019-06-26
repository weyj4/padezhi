import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function SimpleTabs({ handleChange, value }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs value={value} onChange={(event, newValue) => handleChange(event, newValue)}>
          <Tab label="adjectives" />
          <Tab label="First Declension Feminine" />
          <Tab label="Second Declension Masculine/Neuter" />
        </Tabs>
      </AppBar>
      {value === 0 && <TabContainer>adjectives</TabContainer>}
      {value === 1 && <TabContainer>First Declension Feminine</TabContainer>}
      {value === 2 && <TabContainer>Second Declension Masculine/Neuter</TabContainer>}
    </div>
  );
}