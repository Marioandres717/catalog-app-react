import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Carousel from './carousel';
import { Link } from '@reach/router';

const styles = theme => ({
  carousel: {
    margin: '2% 0',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper
  },
  category: {
    marginRight: 'auto',
    display: 'flex',
    flexFlow: 'row wrap',
    alignItems: 'flex-end'
  },
  link: {
    textDecoration: 'none',
    margin: 'auto 20px'
  }
});

var CarouselContainer = props => {
  const { classes, category } = props;
  const { id, name, items } = category;
  return (
    <Grid item xs={12} className={classes.carousel}>
      <div className={classes.category}>
        <h2>{name}</h2>
        <Link to={`/categories/${id}/items`} className={classes.link}>
          See more
        </Link>
      </div>
      {items.length > 0 && <Carousel categoryId={id} items={items} />}
    </Grid>
  );
};

export default withStyles(styles)(CarouselContainer);
