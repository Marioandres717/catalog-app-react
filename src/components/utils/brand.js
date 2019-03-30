import React from 'react';
import { withStyles } from '@material-ui/core';

var styles = theme => ({
  brand: {
    fill: theme.palette.primary.main,
    width: '48px',
    padding: '40px 0 0',
    margin: '0 auto'
  }
});

var Brand = props => {
  const { classes } = props;

  return (
    <svg
      className={classes.brand}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <path d="M17,2H7L2,6.62L12,22L22,6.62L17,2z M16.5,3.58l3.16,2.92H16.5V3.58z M7.59,3.5H15v3H4.34L7.59,3.5z M11.25,18.1L7.94,13h3.31V18.1z M11.25,11.5H6.96L4.69,8h6.56V11.5z M16.5,12.32 M12.75,18.09V8h6.56L12.75,18.09z" />
    </svg>
  );
};

export default withStyles(styles)(Brand);
