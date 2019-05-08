import React, { Fragment, useContext } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
  withStyles
} from '@material-ui/core';
import { navigate } from '@reach/router';
import SnackbarContext from '../../context/snackbarContext';
import { deleteItem } from '../utils/urlBuilder';

// eslint-disable-next-line no-unused-vars
const styles = theme => ({
  root: {
    padding: '30px',
    backgroundColor: 'transparent'
  }
});

function DeleteItemModal(props) {
  var { classes, item, setItems, handleClose, user, open } = props;
  var { snackbar, setSnackbar } = useContext(SnackbarContext);

  async function handleDelete() {
    try {
      let response = await fetch(deleteItem(item.categoryId, item.id), {
        method: 'DELETE',
        mode: 'cors',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': user.csrfAccessToken
        }
      });
      let { data } = await response.json();
      handleClose();
      setSnackbar({
        ...snackbar,
        open: true,
        variant: 'success',
        message: `${item.name} Succesfully Deleted`
      });
      setItems(data);
      navigate(`/`);
    } catch (e) {
      setSnackbar({
        ...snackbar,
        open: true,
        variant: 'error',
        message: `Failed to deleted item`
      });
    }
  }
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      classes={{ root: classes.root }}
    >
      <Fragment>
        <DialogTitle id="alert-dialog-slide-title">
          Are you sure you want to delete {item.name} ?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            If you accept to delete the item {item.name} there will no way to
            recover the data.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="primary">
            Accept
          </Button>
        </DialogActions>
      </Fragment>
    </Dialog>
  );
}

export default withStyles(styles)(DeleteItemModal);
