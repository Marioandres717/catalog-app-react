import React, { useState, useContext, useEffect } from 'react';
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
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';

const styles = theme => ({
  formControl: {
    marginTop: theme.spacing.unit,
    minWidth: 150
  }
});

function ItemForm(props) {
  var { classes } = props;
  var { user } = useContext(UserContext);
  var [open, setOpen] = useState(false);
  var { item } = props.item
    ? props
    : { item: { itemId: '', name: '', description: '', picture: '' } };

  //form state
  var [name, setName] = useState(item != null ? item.name : '');
  var [description, setDescription] = useState(
    item != null ? item.description : []
  );
  var [picture, setPicture] = useState(item != null ? item.picture : '');
  var [price, setPrice] = useState(item != null ? 126.99 : []);
  var [category, setCategory] = useState(item != null ? item.categoryId : '');
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
        item.itemId
          ? editItem(item.categoryId, item.itemId)
          : addItem(item.categoryId),
        {
          method: item.itemId ? 'PUT' : 'POST',
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
            category
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

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={handleClickOpen}
        fullWidth
      >
        Edit
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        classes={{ root: classes.root }}
      >
        <DialogTitle id="form-dialog-title">Edit Item</DialogTitle>
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
            value={item.name ? item.name : name}
            onChange={e => setName(e.target.value)}
          />

          <TextField
            // eslint-disable-next-line jsx-a11y/no-autofocus
            margin="dense"
            id="description"
            label="Description"
            type="text"
            fullWidth
            value={item.description ? item.description : description}
            onChange={e => setDescription(e.target.value)}
          />

          <TextField
            // eslint-disable-next-line jsx-a11y/no-autofocus
            margin="dense"
            id="picture"
            label="Picture"
            type="text"
            fullWidth
            value={item.picture ? item.picture : picture}
            onChange={e => setPicture(e.target.value)}
          />

          <TextField
            // eslint-disable-next-line jsx-a11y/no-autofocus
            margin="dense"
            id="price"
            label="Price"
            type="text"
            value={item.price ? item.price : price}
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
