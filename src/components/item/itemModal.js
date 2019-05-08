import React, { useState, Fragment, useEffect, useContext } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  withStyles
} from '@material-ui/core';
import { readCategories, editItem, addItem } from '../utils/urlBuilder';
import SnackbarContext from '../../context/snackbarContext';
import { navigate } from '@reach/router';
import useProduct from '../../hooks/useProduct';

const styles = theme => ({
  root: {
    padding: '30px',
    backgroundColor: 'transparent'
  },
  formControl: {
    marginTop: theme.spacing.unit,
    minWidth: 150
  }
});

function ItemModal(props) {
  var { classes, item, setItems, handleClose, user, open } = props;
  var [name, setName] = useState(item.name ? item.name : '');
  var [picture, setPicture] = useState(item.picture ? item.picture : '');
  var [price, setPrice] = useState(item.price ? item.price : 126.99);
  var [categories, setCategories] = useState([]);
  var [description, setDescription] = useState(
    item.description ? item.description : ''
  );
  var [category, setCategory] = useState(
    item.categoryId ? item.categoryId : ''
  );
  var { snackbar, setSnackbar } = useContext(SnackbarContext);
  var { fetchAllContent } = useProduct();

  useEffect(() => {
    fetch(readCategories())
      .then(data => data.json())
      .then(({ categories }) => setCategories(categories));
  }, []);

  async function submitItem() {
    try {
      await fetch(
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
      handleClose();
      setSnackbar({
        ...snackbar,
        open: true,
        variant: 'success',
        message: item.id
          ? `${name} Succesfully Edited`
          : `${name} Succesfully Added`
      });
      let data = await fetchAllContent();
      setItems(data);
      navigate(`/`);
    } catch (e) {
      console.error(e);
      setSnackbar({
        ...snackbar,
        open: true,
        variant: 'error',
        message: `Error!, could not completed operation, try again.`
      });
      navigate(`/`);
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
      </Fragment>
    </Dialog>
  );
}

export default withStyles(styles)(ItemModal);
