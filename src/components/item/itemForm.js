import React, { useState, useContext, Fragment } from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import UserContext from '../../userContext';
import { Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import ItemModal from './itemModal';
import DeleteItemModal from './deleteItemModal';

const styles = theme => ({
  btn: {
    margin: '5px'
  },
  fab: {
    margin: theme.spacing.unit,
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2
  }
});

function ItemForm(props) {
  var { classes } = props;
  var { user } = useContext(UserContext);
  var [open, setOpen] = useState(false);
  var [dialog, setDialog] = useState('');
  var { item } = props.item
    ? props
    : { item: { id: '', name: '', description: '', picture: '' } };

  function handleClickOpen(dialog) {
    setOpen(true);
    setDialog(dialog);
  }

  function handleClose() {
    setOpen(false);
    setDialog('');
  }

  return (
    <div>
      {!item.id ? (
        <Fab
          color="primary"
          aria-label="Add"
          className={classes.fab}
          onClick={() => handleClickOpen('Edit')}
        >
          <AddIcon />
        </Fab>
      ) : (
        <Fragment>
          <Button
            variant="contained"
            color="primary"
            aria-label="Edit"
            onClick={() => handleClickOpen('Edit')}
            className={classes.btn}
            fullWidth
          >
            <EditIcon /> Edit Item
          </Button>
          <Button
            variant="contained"
            color="secondary"
            aria-label="Edit"
            onClick={() => handleClickOpen('Delete')}
            className={classes.btn}
            fullWidth
          >
            <DeleteIcon /> Delete Item
          </Button>
        </Fragment>
      )}
      {dialog === 'Edit' ? (
        <ItemModal
          open={open}
          item={item}
          handleClose={handleClose}
          user={user}
        />
      ) : null}
      {dialog === 'Delete' ? (
        <DeleteItemModal
          open={open}
          item={item}
          handleClose={handleClose}
          user={user}
        />
      ) : null}
    </div>
  );
}

export default withStyles(styles)(ItemForm);
