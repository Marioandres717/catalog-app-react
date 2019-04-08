import React, { useState, useContext, Fragment } from 'react';
import Modal from '../../modal';
import UserContext from '../../userContext';
import {
  ListItemText,
  withStyles,
  ListItem,
  ListItemAvatar,
  Avatar
} from '@material-ui/core';
import SnackbarContext from '../../snackbarContext';

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
  const firstname = user.name ? user.name.split(' ')[0] : '';

  function handleLogin() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
    setSnackbar({ ...snackbar, open: true, message: `Welcome!` });
  }

  function handleLogout() {
    localStorage.clear();
    setSnackbar({
      ...snackbar,
      open: true,
      message: `${firstname}, Thanks For shopping with us!`
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
          primary={firstname ? 'Logout(' + firstname + ')' : 'Login'}
          classes={
            user.picture
              ? { primary: classes.loggedIn }
              : { primary: classes.text }
          }
        />
      </ListItem>
      <Modal open={open} onClose={handleClose} />
    </Fragment>
  );
}

export default withStyles(styles)(Login);
