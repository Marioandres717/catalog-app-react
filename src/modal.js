import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import List from '@material-ui/core/List';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Facebook from './components/registration/facebook';

const useStyles = makeStyles({
  container: {
    padding: '30px'
  },
  closeBtn: {
    display: 'flex',
    flex: 'start-end'
  }
});

function Modal(props) {
  const classes = useStyles();
  const { onClose, ...other } = props;

  function handleClose() {
    onClose();
  }

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      classes={{ paper: classes.container }}
      {...other}
    >
      <div>
        <DialogTitle id="simple-dialog-title">Login with</DialogTitle>
        <div>
          <List>
            <Facebook onClose={handleClose} />
          </List>
        </div>
      </div>
    </Dialog>
  );
}

Modal.propTypes = {
  onClose: PropTypes.func,
  selectedValue: PropTypes.string
};

export default Modal;
