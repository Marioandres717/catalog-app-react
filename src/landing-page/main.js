import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import SimpleCard from './simpleCard';

const styles = (theme) => ({
  root: {
    flexgrow: 1
  },
  ladingImage: {
    width: '100%',
    height: '60%'
  },
  paper: {
    marginTop: theme.spacing.unit * 2,
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.primary
  }
});

class Main extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid container spacing={24} justify="center">
          <Grid item xs={3}>
            <SimpleCard />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(Main);
