import React, { Fragment, useContext } from 'react';
import {
  Typography,
  withStyles,
  Grid,
  Divider,
  Chip,
  Button
} from '@material-ui/core';
import UserContext from '../../userContext';
import { navigate } from '@reach/router/lib/history';
import ItemForm from './itemForm';

const styles = theme => ({
  base: {
    display: 'grid',
    gridTemplateColumns: 'minMax(220px, 434px) 448.8px',
    gridTemplateRows: 'minMax(auto, 434px) auto',
    justifyContent: 'center',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.main,
    padding: '80px 100px 0px',
    maxWidth: '82vw'
  },
  root: {
    padding: '30px',
    backgroundColor: theme.palette.background.paper
  },
  chip: {
    marginRight: theme.spacing.unit
  },
  section1: {
    margin: `${theme.spacing.unit * 3}px ${theme.spacing.unit * 2}px`
  },
  section2: {
    margin: theme.spacing.unit * 2
  },
  section3: {
    margin: `${theme.spacing.unit * 6}px ${theme.spacing.unit * 2}px ${theme
      .spacing.unit * 2}px`
  },
  image: {
    maxWidth: '100%',
    maxHeight: '100%'
  },
  btn: {
    margin: '10px 0'
  }
});

const Item = props => {
  const { classes, location } = props;
  const { user } = useContext(UserContext);
  const { item } = location.state;

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
    <div className={classes.base}>
      <div>
        <img src={item.picture} alt={item.name} className={classes.image} />
      </div>
      <div className={classes.root}>
        <div className={classes.section1}>
          <Grid container alignItems="center">
            <Grid item xs>
              <Typography gutterBottom variant="h4">
                {item.name}
              </Typography>
            </Grid>
            <Grid item>
              <Typography gutterBottom variant="h6">
                $4.50
              </Typography>
            </Grid>
          </Grid>
          <Typography color="textSecondary">{item.description}</Typography>
        </div>
        <Divider variant="middle" />
        <div className={classes.section2}>
          <Typography gutterBottom variant="body1">
            Select type
          </Typography>
          <div>
            <Chip className={classes.chip} label="Extra Soft" />
            <Chip className={classes.chip} label="Soft" />
            <Chip className={classes.chip} label="Medium" />
            <Chip className={classes.chip} label="Hard" />
          </div>
        </div>
        <div className={classes.section3}>
          {user.id == item.userId ? (
            <Fragment>
              <ItemForm item={item} />
              <Button
                variant="contained"
                color="secondary"
                fullWidth
                onClick={handleDelete}
                className={classes.btn}
              >
                Delete
              </Button>
            </Fragment>
          ) : (
            <Fragment>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                className={classes.btn}
              >
                Add to cart
              </Button>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                className={classes.btn}
              >
                Buy it now
              </Button>
            </Fragment>
          )}
        </div>
      </div>
    </div>
  );
};

export default withStyles(styles)(Item);
