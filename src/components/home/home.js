import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const styles = theme => ({
  home: {
    flexgrow: 1,
    margin: '0 auto'
  }
});

const Home = props => {
  const { classes } = props;
  console.log(classes);
  return (
    <div className={classes.home}>
      <Typography color="secondary" variant="h1" component="h2" gutterBottom>
        THE JOE BUDDEN PODCAST
      </Typography>
      <Typography variant="h3" component="h4" gutterBottom>
        TOURS
      </Typography>
      <Typography
        color="inherit"
        variant="h6"
        component="h1"
        gutterBottom
        paragraph
      >
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Libero
        deleniti cumque tempore, illum temporibus, iste saepe perferendis quae
        officiis eveniet ducimus dolore nemo magnam voluptate labore earum
        perspiciatis explicabo assumenda.
      </Typography>
    </div>
  );
};

export default withStyles(styles)(Home);
