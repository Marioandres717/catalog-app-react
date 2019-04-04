import React from 'react';
import { Typography, AppBar, Toolbar, withStyles } from '@material-ui/core';

const drawerWidth = 240;

const styles = () => ({
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth
  }
});

const NotAppBar = props => {
  const { classes } = props;
  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <Typography variant="h6" color="inherit" noWrap>
          LOL
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default withStyles(styles)(NotAppBar);
