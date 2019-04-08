import React, { Fragment } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
  withStyles
} from '@material-ui/core';
import { navigate } from '@reach/router/lib/history';

// eslint-disable-next-line no-unused-vars
const styles = theme => ({
  root: {
    padding: '30px',
    backgroundColor: 'transparent'
  }
});

function DeleteItemModal(props) {
  var { classes, item, handleClose, user, open } = props;

  async function handleDelete() {
    try {
      await fetch(
        `http://localhost:5000/categories/${item.categoryId}/items/${item.id}`,
        {
          method: 'DELETE',
          mode: 'cors',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': user.csrfAccessToken
          }
        }
      );
      console.log('SUCCESSFULLY DELETED');
      handleClose();
      navigate('/');
    } catch (e) {
      console.error(e);
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
