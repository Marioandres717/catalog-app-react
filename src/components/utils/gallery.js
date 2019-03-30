import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

var styles = theme => ({
  root: {
    display: 'block',
    overflow: 'auto',
    zIndex: 0
  },
  content: {
    content: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.main,
      padding: theme.spacing.unit * 3
    }
  }
});
const Gallery = props => {
  const { classes } = props;
  return (
    <main className={classes.content}>
      <Typography variant="h2" color="primary">
        SUCCESS! asdasdad
      </Typography>
    </main>
  );
};

export default withStyles(styles)(Gallery);
