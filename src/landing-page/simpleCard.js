import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from '@reach/router';

const styles = (theme) => ({
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
  }
});

class SimpleCard extends Component {
  state = {
    title: 'category',
    catalog: 'House Interiors',
    image:
      'https://images.unsplash.com/photo-1445510861639-5651173bc5d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1254&q=80'
  };

  handleClick = (event) => {};
  render() {
    const { classes } = this.props;
    const { title, catalog, image } = this.state;
    return (
      <Card className={classes.card}>
        <CardContent>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom>
            {title}
          </Typography>
          <Typography variant="h5" component="h2">
            {catalog}
          </Typography>
          <CardMedia
            className={classes.media}
            image={image}
            title="mens shoes catalog"
          />
        </CardContent>
        <CardActions className={classes.actions} disableActionSpacing>
          <Button size="small">
            <Link to="/catalog">Shop now</Link>
          </Button>
        </CardActions>
      </Card>
    );
  }
}

export default withStyles(styles)(SimpleCard);
