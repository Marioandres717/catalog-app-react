import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import SimpleCard from './simpleCard';
import Login from '../registration/login';

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
  state = {
    categories: []
  };

  url = 'http://localhost:5000/';

  async componentDidMount() {
    try {
      const response = await fetch(this.url);
      const data = await response.json();
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <p> {console.log(this.categories)}</p>
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
