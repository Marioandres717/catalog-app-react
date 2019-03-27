import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from '@reach/router';

// eslint-disable-next-line no-unused-vars
const styles = theme => ({
  card: {
    maxWidth: 400
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)'
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  },
  media: {
    height: 0,
    paddingTop: '56.25%'
  },
  actions: {
    display: 'flex'
  },
  link: {
    textDecoration: 'none'
  }
});

var SimpleCard = props => {
  const { classes, id, name, picture } = props;
  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          {name}
        </Typography>
        <Typography variant="h5" component="h2">
          {name}
        </Typography>
        <Link to={`/categories/${id}/items`}>
          <CardMedia
            className={classes.media}
            image={picture}
            title="mens shoes catalog"
          />
        </Link>
      </CardContent>
      <CardActions className={classes.actions} disableActionSpacing>
        <Button size="small">
          <Link to={`/categories/${id}/items`} className={classes.link}>
            Shop now
          </Link>
        </Button>
      </CardActions>
    </Card>
  );
};

export default withStyles(styles)(SimpleCard);
