import React, { useContext, useState, useEffect, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider
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
    margin: '5px',
    '&:focus': {
      backgroundColor: theme.palette.default.main,
      opacity: '0.3',
      color: theme.palette.background.main
    },
    '&:hover': {
      backgroundColor: theme.palette.default.main,
      color: theme.palette.background.main,
      opacity: '0.1'
    }
  },
  listAvatar: {
    marginLeft: '100px',
    padding: '500px'
  },
  text: {
    padding: '0 8px'
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
          <Typography variant="h6" component="h5" color="inherit">
            DEUX
          </Typography>
        </div>
        <List classes={{ root: classes.list }}>
          <ListItem button key="features" classes={{ root: classes.listItem }}>
            <ListItemText>
              <Typography
                color="inherit"
                component="li"
                variant="body1"
                classes={{ root: classes.text }}
              >
                Featured
              </Typography>
            </ListItemText>
          </ListItem>
          <Divider classes={{ root: classes.divider }} />
          {categories.map(category => (
            <ListItem
              button
              key={category.id}
              classes={{ root: classes.listItem }}
            >
              <ListItemText>
                <Typography
                  color="inherit"
                  component="li"
                  variant="body1"
                  classes={{ root: classes.text }}
                >
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
              {/* <ListItemAvatar classes={{ root: classes.listAvatar }}>
                <Avatar
                  alt="me"
                  src={user.picture ? user.picture : undefined}
                />
              </ListItemAvatar> */}
              <ListItemText>
                <Typography
                  classes={{ root: classes.text }}
                  color="inherit"
                  component="li"
                  variant="body1"
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
