import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import SimpleCard from './simpleCard';
import Login from '../registration/login';

const styles = (theme) => ({
  root: {
    flexgrow: 1,
    maxWidth: 1600,
    minHeight: 600,
    margin: '0 auto'
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
  },
  bckgImg: {
    background:
      'url(https://images.unsplash.com/photo-1545119560-8db36a735ee2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80)'
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
      const duplicated = [...data.categories, ...data.categories];
      this.setState({ categories: duplicated });
    } catch (err) {
      console.error(err);
    }
  }

  render() {
    const { classes } = this.props;
    const { categories } = this.state;
    return (
      <div>
        <Grid
          container
          spacing={24}
          justify="space-around"
          alignItems="flex-end"
          className={`${classes.root} ${classes.bckgImg}`}>
          {categories.map((categorie) => (
            <Grid item xs={3} key={categorie.id} className={classes.card}>
              <SimpleCard
                name={categorie.name}
                description={categorie.description}
                picture={categorie.picture}
              />
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={24} className={classes.root}>
          <h1>HELLO</h1>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(Main);
