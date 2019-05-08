import React, { useState, useContext, Fragment } from 'react';
import AuthModal from './authModal';
import UserContext from '../../context/userContext';
import {
  ListItemText,
  withStyles,
  ListItem,
  ListItemAvatar,
  Avatar
} from '@material-ui/core';
import SnackbarContext from '../../context/snackbarContext';
import isEmpty from '../utils/isEmptyObject';

var styles = theme => ({
  listItem: {
    borderRadius: '6px',
    textAlign: 'center',
    margin: '5px'
  },
  text: {
    padding: '0 8px',
    color: theme.palette.default.main,
    margin: '5px'
  },
  loggedIn: {
    padding: '0 8px',
    color: theme.palette.default.main,
    margin: '5px',
    textAlign: 'auto'
  }
});

function Login(props) {
  var { classes } = props;
  var [open, setOpen] = useState(false);
  var { user, setUser } = useContext(UserContext);
  var { snackbar, setSnackbar } = useContext(SnackbarContext);

  function handleLogin() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  function getFirstName(user) {
    if (isEmpty(user)) {
      return '';
    }
    var firstname = user.name ? user.name.split(' ')[0] : '';

    return firstname;
  }

  function handleLogout() {
    localStorage.clear();
    setSnackbar({
      ...snackbar,
      open: true,
      variant: 'success',
      message: `${getFirstName(user)}, Thanks For shopping with us!`
    });
    setUser(UserContext);
  }

  return (
    <Fragment>
      <ListItem
        button
        key={user.id ? user.id : undefined}
        classes={{ root: classes.listItem }}
        onClick={user.id ? handleLogout : handleLogin}
      >
        {user.picture ? (
          <ListItemAvatar>
            <Avatar alt="me" src={user.picture ? user.picture : undefined} />
          </ListItemAvatar>
        ) : null}

        <ListItemText
          primary={getFirstName(user) ? 'Logout' : 'Login'}
          classes={
            user.picture
              ? { primary: classes.loggedIn }
              : { primary: classes.text }
          }
        />
      </ListItem>
      <AuthModal open={open} onClose={handleClose} />
    </Fragment>
  );
}

export default withStyles(styles)(Login);
