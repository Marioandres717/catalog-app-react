import React, { useContext, useState, useEffect, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar
} from '@material-ui/core';
// import NotAppBar from '../utils/appBar';
import Brand from '../utils/brand';
import UserContext from '../../userContext';
import { readCategories } from '../utils/urlBuilder';

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
    color: 'white',
    borderRightWidth: 0,
    zIndex: 0,
    width: defaultWidth
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
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      opacity: '0.37',
      color: theme.palette.textPrimary.main
    },
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.textPrimary.main,
      opacity: '0.9'
    }
  },
  listAvatar: {
    marginLeft: '100px',
    padding: '500px'
  }
});

const Home = props => {
  const { classes } = props;
  const { user } = useContext(UserContext);
  const [categories, setCategories] = useState([]);
  const firstname = user.name.split(' ')[0];

  useEffect(() => {
    fetchData()
      .then(data => {
        setCategories(data);
      })
      .then(console.log('Successfully retrieved'));
  }, []);

  async function fetchData() {
    const response = await fetch(readCategories());
    const { categories } = await response.json();
    return categories;
  }

  return (
    <div className={classes.home}>
      {/* <NotAppBar /> */}
      <Drawer
        variant="permanent"
        classes={{ root: classes.drawer, paper: classes.drawerPaper }}
        anchor="left"
      >
        <div className={classes.logo}>
          <Brand />
          <Typography variant="h6" component="h5" color="primary">
            DEUX
          </Typography>
        </div>
        <List classes={{ root: classes.list }}>
          {categories.map(category => (
            <ListItem
              button
              key={category.id}
              classes={{ root: classes.listItem }}
            >
              <ListItemText>
                <Typography color="inherit" component="li">
                  {category.name}
                </Typography>
              </ListItemText>
            </ListItem>
          ))}
          <ListItem
            button
            key={user.id ? user.id : undefined}
            classes={{ root: classes.listItem }}
          >
            <Fragment>
              <ListItemAvatar classes={{ root: classes.listAvatar }}>
                <Avatar
                  alt="me"
                  src={user.picture ? user.picture : undefined}
                />
              </ListItemAvatar>
              <ListItemText>
                <Typography
                  classes={{ root: classes.username }}
                  color="inherit"
                  component="li"
                >
                  {firstname}
                </Typography>
              </ListItemText>
            </Fragment>
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
};

export default withStyles(styles)(Home);
