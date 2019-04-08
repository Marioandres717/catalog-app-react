import React, { useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider
} from '@material-ui/core';
import Brand from '../utils/brand';
import { navigate } from '@reach/router';
import Login from '../registration/login';

const defaultWidth = '256px';

const styles = theme => ({
  home: {
    display: 'flex'
  },
  drawer: {
    flexShrink: 0
  },
  drawerPaper: {
    backgroundColor: theme.palette.background.main,
    color: theme.palette.default.main,
    borderRightWidth: 0,
    zIndex: 0,
    width: defaultWidth,
    textTransform: 'uppercase'
  },
  toolbar: theme.mixins.toolbar,
  logo: {
    textAlign: 'center',
    textTransform: 'uppercase'
  },
  list: {
    margin: '70px  5px auto 5px'
  },
  listItem: {
    borderRadius: '6px',
    textAlign: 'center',
    margin: '5px'
  },
  listAvatar: {
    marginLeft: '100px',
    padding: '500px'
  },
  text: {
    padding: '0 8px',
    color: theme.palette.default.main,
    margin: '5px'
  },
  divider: {
    backgroundColor: theme.palette.primary.main,
    width: '50px',
    height: '2px',
    display: 'block',
    position: 'relative',
    top: '-8px',
    left: '100px'
  }
});

const Home = props => {
  const {
    classes,
    categories,
    handleSelectItemsFromCategory,
    handleSelectAllItems
  } = props;

  useEffect(() => {
    handleSelectAllItems();
  }, [categories]);

  return (
    <div className={classes.home}>
      <Drawer
        variant="permanent"
        classes={{ root: classes.drawer, paper: classes.drawerPaper }}
        anchor="left"
      >
        <div className={classes.logo}>
          <Brand />
          <Typography variant="h6" component="h5" color="inherit">
            DEUX
          </Typography>
        </div>
        <List classes={{ root: classes.list }}>
          <ListItem
            button
            key="features"
            classes={{ root: classes.listItem }}
            onClick={() => {
              navigate('/');
              handleSelectAllItems();
            }}
          >
            <ListItemText
              primary="Featured"
              classes={{ primary: classes.text }}
            />
          </ListItem>
          <Divider classes={{ root: classes.divider }} />
          {categories.map(category => (
            <ListItem
              button
              key={category.id}
              classes={{ root: classes.listItem }}
              onClick={() => {
                navigate('/');
                handleSelectItemsFromCategory(category.id);
              }}
            >
              <ListItemText
                primary={category.name}
                classes={{ primary: classes.text }}
              />
            </ListItem>
          ))}
          <Login />
        </List>
      </Drawer>
    </div>
  );
};

export default withStyles(styles)(Home);
