import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import SimpleCard from './simpleCard';
import CarouselContainer from './carousel-container';

// eslint-disable-next-line no-unused-vars
const styles = theme => ({
  root: {
    flexgrow: 1,
    maxWidth: 1600,
    minHeight: 600,
    margin: '0 auto'
  },
  bckgImg: {
    background:
      'url(https://images.unsplash.com/photo-1545119560-8db36a735ee2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80)'
  }
});

var Main = props => {
  var [categories, setCategories] = useState([]);
  var [items, setItems] = useState([]);
  var { classes } = props;

  var url = 'http://localhost:5000/';

  useEffect(() => {
    fetchHomeContent().then(data => {
      let { categories, items } = data;
      setCategories(categories);
      setItems(items);
    });
  }, []);

  async function fetchHomeContent() {
    try {
      const response = await fetch(url);
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
              name={category.name}
              description={category.description}
              picture={category.picture}
            />
          </Grid>
        ))}
      </Grid>
      <Grid container spacing={24} className={classes.root}>
        {categories.map(category => (
          <CarouselContainer
            items={items}
            category={category.name}
            key={category.id}
          />
        ))}
      </Grid>
    </div>
  );
};

export default withStyles(styles)(Main);
