import React, { useState, useContext, useEffect, Fragment } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from '@material-ui/core/styles';
import UserContext from '../../userContext';
import { editItem, addItem, readCategories } from '../utils/urlBuilder';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Fab
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { navigate } from '@reach/router/lib/history';

const styles = theme => ({
  formControl: {
    marginTop: theme.spacing.unit,
    minWidth: 150
  },
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
  var { item } = props.item
    ? props
    : { item: { id: '', name: '', description: '', picture: '' } };

  //form state
  var [name, setName] = useState(item.name ? item.name : '');
  var [description, setDescription] = useState(
    item.description ? item.description : ''
  );
  var [picture, setPicture] = useState(item.picture ? item.picture : '');
  var [price, setPrice] = useState(item.price ? item.price : 126.99);
  var [category, setCategory] = useState(
    item.categoryId ? item.categoryId : ''
  );
  var [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch(readCategories())
      .then(data => data.json())
      .then(({ categories }) => setCategories(categories));
  }, []);

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  async function submitItem() {
    try {
      //   setSubmitted(true);
      let resp = await fetch(
        item.id ? editItem(item.categoryId, item.id) : addItem(category),
        {
          method: item.id ? 'PUT' : 'POST',
          mode: 'cors',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            accept: 'application/json',
            'X-CSRF-TOKEN': user.csrfAccessToken
          },
          body: JSON.stringify({
            name,
            description,
            picture,
            categoryId: category
          })
        }
      );
      let data = await resp.json();
      console.log('Sucessful!', data);
      //   navigate(`/categories/${categoryId}/items`);
    } catch (e) {
      console.error(e);
      //   setSubmitted(true);
    }
  }

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
      navigate('/');
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div>
      {!item.id ? (
        <Fab
          color="primary"
          aria-label="Add"
          className={classes.fab}
          onClick={handleClickOpen}
        >
          <AddIcon />
        </Fab>
      ) : (
        <Fragment>
          <Button
            variant="contained"
            color="primary"
            aria-label="Edit"
            onClick={handleClickOpen}
            className={classes.btn}
            fullWidth
          >
            <EditIcon /> Edit Item
          </Button>
          <Button
            variant="contained"
            color="secondary"
            aria-label="Edit"
            onClick={handleDelete}
            className={classes.btn}
            fullWidth
          >
            <DeleteIcon /> Delete Item
          </Button>
        </Fragment>
      )}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        classes={{ root: classes.root }}
      >
        <DialogTitle id="form-dialog-title">
          {item.id ? 'Edit Item' : 'Add Item'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            To keep changes to this Item, please press the save button.
          </DialogContentText>

          <TextField
            // eslint-disable-next-line jsx-a11y/no-autofocus
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="input"
            fullWidth
            value={name}
            onChange={e => setName(e.target.value)}
          />

          <TextField
            // eslint-disable-next-line jsx-a11y/no-autofocus
            margin="dense"
            id="description"
            label="Description"
            type="text"
            fullWidth
            value={description}
            onChange={e => setDescription(e.target.value)}
          />

          <TextField
            // eslint-disable-next-line jsx-a11y/no-autofocus
            margin="dense"
            id="picture"
            label="Picture"
            type="text"
            fullWidth
            value={picture}
            onChange={e => setPicture(e.target.value)}
          />

          <TextField
            // eslint-disable-next-line jsx-a11y/no-autofocus
            margin="dense"
            id="price"
            label="Price"
            type="text"
            value={price}
            fullWidth
            onChange={e => setPrice(e.target.value)}
          />

          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="age-simple">Category</InputLabel>
            <Select
              value={category}
              onChange={e => setCategory(e.target.value)}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {categories.length > 0
                ? categories.map(category => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.name}
                    </MenuItem>
                  ))
                : null}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary" variant="outlined">
            Cancel
          </Button>
          <Button onClick={submitItem} color="primary" variant="outlined">
            Keep Changes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default withStyles(styles)(ItemForm);
