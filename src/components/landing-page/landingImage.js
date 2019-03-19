import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const styles = (theme) => ({
  root: {
    flexgrow: 1
  },
  ladingImage: {
    width: '100%',
    height: '60%'
  },
  paper: {
    marginTop: theme.spacing.unit * 2,
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.primary
  }
});

var LadingImage = (props) => {
    const { classes } = props;
    return (
      <Grid container spacing={24} justify="center">
        <Grid item xs={10}>
          <img
            className={classes.ladingImage}
            src="https://images.unsplash.com/photo-1445510861639-5651173bc5d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1254&q=80"
            alt="lading"
          />
        </Grid>
      </Grid>
    );
}

export default withStyles(styles)(LadingImage);
