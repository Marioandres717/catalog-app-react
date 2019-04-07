import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  GridList,
  GridListTile,
  GridListTileBar,
  IconButton
} from '@material-ui/core';
import { navigate } from '@reach/router';
import ItemForm from '../home/itemForm';

var styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.main,
    padding: '80px 100px',
    maxWidth: '82vw',
    position: 'relative'
  },
  gridList: {
    transform: 'translateZ(0)'
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)'
  },
  onHoverTile: {
    border: '2px solid #696969'
  }
});

const Gallery = props => {
  var { classes, items } = props;
  var [isHover, setIsHover] = useState(null);

  function handleOnHover(tileId) {
    setIsHover(tileId);
  }

  function handleOffHover() {
    setIsHover(null);
  }

  function handleBtnClick(item) {
    navigate(`/items/${item.id}`, {
      state: {
        item: item
      }
    });
  }
  return (
    <div className={classes.root}>
      <GridList
        cellHeight={250}
        cols={4}
        spacing={20}
        className={classes.gridList}
      >
        {items.map(item => (
          <GridListTile
            key={item.id}
            data-id={item.id}
            onMouseEnter={() => handleOnHover(item.id)}
            onMouseLeave={() => handleOffHover()}
            classes={isHover == item.id ? { root: classes.onHoverTile } : null}
          >
            <img src={item.picture} alt={item.name} />
            {isHover == item.id && (
              <GridListTileBar
                title={item.name}
                subtitle={<span>{item.description}</span>}
                actionIcon={
                  <IconButton
                    className={classes.icon}
                    onClick={() => handleBtnClick(item)}
                  >
                    Buy
                  </IconButton>
                }
              />
            )}
          </GridListTile>
        ))}
      </GridList>
      <ItemForm />
    </div>
  );
};

export default withStyles(styles)(Gallery);
