import React, { useState, useContext } from 'react';
import Modal from '../../modal';
import UserContext from '../../userContext';
import {
  ListItemText,
  withStyles,
  ListItem,
  ListItemAvatar,
  Avatar
} from '@material-ui/core';

var styles = theme => ({
  listItem: {
    borderRadius: '6px',
    textAlign: 'center',
    margin: '5px'
  },
  text: {
    padding: '0 8px',
    color: theme.palette.default.main,
    margin: '5px',
    textAlign: 'auto'
  }
});

var Login = props => {
  var { classes } = props;
  var [open, setOpen] = useState(false);
  var [selectedValue, setSelectedValue] = useState('marioArendon@mail.ca');
  var { user } = useContext(UserContext);
  const firstname = user.name.split(' ')[0];

  function handleLogin() {
    setOpen(true);
  }

  const handleClose = value => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <div>
      <ListItem
        button
        key={user.id ? user.id : undefined}
        classes={{ root: classes.listItem }}
        onClick={handleLogin}
      >
        <ListItemAvatar>
          <Avatar alt="me" src={user.picture ? user.picture : undefined} />
        </ListItemAvatar>
        <ListItemText
          primary={firstname ? firstname : 'Login'}
          classes={{ primary: classes.text }}
        />
      </ListItem>
      <Modal selectedValue={selectedValue} open={open} onClose={handleClose} />
    </div>
  );
};

export default withStyles(styles)(Login);
