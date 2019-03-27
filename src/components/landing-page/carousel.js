import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import { Link } from '@reach/router';

const styles = theme => ({
  gridList: {
    flexWrap: 'nowrap',
    transform: 'translateZ(0)'
  },
  title: {
    color: '#FFFF'
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rbga(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)'
  }
});

var Carousel = props => {
  const { classes, categoryId, items } = props;

  return (
    <GridList cols={2.5} className={classes.gridList}>
      {items.map(item => (
        <GridListTile key={item.id}>
          <img src={item.picture} alt={items.name} />
          <Link to={`/categories/${categoryId}/items/${item.id}`}>
            <GridListTileBar
              title={item.name}
              classes={{
                root: classes.titleBar,
                title: classes.title
              }}
            />
          </Link>
        </GridListTile>
      ))}
    </GridList>
  );
};

export default withStyles(styles)(Carousel);
