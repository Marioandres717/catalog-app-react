import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import SimpleCard from './simpleCard';
import CarouselContainer from './carousel-container';
import { home } from '../utils/urlBuilder';

// eslint-disable-next-line no-unused-vars
const styles = theme => ({
  root: {
    flexgrow: 1,
    maxWidth: 1600,
    minHeight: 600,
    margin: '0 auto'
  }
});

var Main = props => {
  var [categories, setCategories] = useState([]);
  var { classes } = props;

  useEffect(() => {
    fetchHomeContent().then(data => {
      let { categories } = data;
      setCategories(categories);
    });
  }, []);

  async function fetchHomeContent() {
    try {
      const response = await fetch(home());
      const data = await response.json();
      return data;
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
      <Grid
        container
        spacing={24}
        justify="space-around"
        alignItems="flex-end"
        className={`${classes.root} ${classes.bckgImg}`}
      >
        {categories.map(category => (
          <Grid item xs={3} key={category.id} className={classes.card}>
            <SimpleCard
              id={category.id}
              name={category.name}
              description={category.description}
              picture={category.picture}
            />
          </Grid>
        ))}
      </Grid>
      <Grid container spacing={24} className={classes.root}>
        {categories.map(category => (
          <CarouselContainer category={category} key={category.id} />
        ))}
      </Grid>
    </div>
  );
};

export default withStyles(styles)(Main);
