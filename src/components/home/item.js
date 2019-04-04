import React from 'react';
import {
  Typography,
  withStyles,
  Grid,
  Divider,
  Chip,
  Button
} from '@material-ui/core';

const styles = theme => ({
  base: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.main,
    padding: '80px 100px 0px',
    maxWidth: '82vw'
  },
  root: {
    padding: '30px',
    backgroundColor: theme.palette.background.paper
  },
  chip: {
    marginRight: theme.spacing.unit
  },
  section1: {
    margin: `${theme.spacing.unit * 3}px ${theme.spacing.unit * 2}px`
  },
  section2: {
    margin: theme.spacing.unit * 2
  },
  section3: {
    margin: `${theme.spacing.unit * 6}px ${theme.spacing.unit * 2}px ${theme
      .spacing.unit * 2}px`
  },
  image: {
    maxWidht: '737px',
    maxHeight: '737px'
  }
});

const Item = props => {
  const { classes, location } = props;
  const { item } = location.state;
  return (
    <div className={classes.base}>
      <img src={item.picture} alt={item.name} className={classes.image} />
      <div className={classes.root}>
        <div className={classes.section1}>
          <Grid container alignItems="center">
            <Grid item xs>
              <Typography gutterBottom variant="h4">
                {item.name}
              </Typography>
            </Grid>
            <Grid item>
              <Typography gutterBottom variant="h6">
                $4.50
              </Typography>
            </Grid>
          </Grid>
          <Typography color="textSecondary">{item.description}</Typography>
        </div>
        <Divider variant="middle" />
        <div className={classes.section2}>
          <Typography gutterBottom variant="body1">
            Select type
          </Typography>
          <div>
            <Chip className={classes.chip} label="Extra Soft" />
            <Chip className={classes.chip} label="Soft" />
            <Chip className={classes.chip} label="Medium" />
            <Chip className={classes.chip} label="Hard" />
          </div>
        </div>
        <div className={classes.section3}>
          <Button variant="contained" color="primary" fullWidth>
            Add to cart
          </Button>
          <Button variant="contained" color="primary" fullWidth>
            Buy it now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default withStyles(styles)(Item);
