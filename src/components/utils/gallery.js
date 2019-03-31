import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  Typography,
  GridList,
  GridListTile,
  ListSubheader,
  GridListTileBar,
  IconButton
} from '@material-ui/core';

var styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'auto',
    backgroundColor: theme.palette.background.main
  },
  gridList: {
    width: 500,
    height: 450
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)'
  }
});

const Gallery = props => {
  const { classes, items } = props;

  return (
    <div className={classes.root}>
      <GridList cellHeight={180} className={classes.gridList}>
        <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
          <ListSubheader component="div">December</ListSubheader>
        </GridListTile>
        {items.map(item => (
          <GridListTile key={item.id}>
            <img src={item.picture} alt={item.name} />
            <GridListTileBar
              title={item.name}
              subtitle={<span>by: {item.author}</span>}
              actionIcon={
                <IconButton className={classes.icon}>
                  {/* <IfonIcon /> */}
                </IconButton>
              }
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
};

export default withStyles(styles)(Gallery);
