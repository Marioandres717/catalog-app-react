import React, { useContext } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContext from '../../snackbarContext';

function NotSnackbar() {
  var { snackbar, handleClose } = useContext(SnackbarContext);
  var { vertical, horizontal, open, message } = snackbar;

  return (
    <Snackbar
      anchorOrigin={{ vertical, horizontal }}
      open={open}
      onClose={handleClose}
      ContentProps={{
        'aria-describedby': 'message-id'
      }}
      message={<span id="message-id">{message}</span>}
      autoHideDuration={3000}
    />
  );
}

export default NotSnackbar;
