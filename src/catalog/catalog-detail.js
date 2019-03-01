import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { Link } from '@reach/router';

const styles = (theme) => ({
  root: {
    border: '5px solid black',
    margin: '2%',
    backgroundColor: '#ccffcc'
  },
  container: {
    maxWidth: 200,
    display: 'inline'
  },
  picture: {
    maxWidth: 200
  },
  info: {
    display: 'inline-block'
  }
});
class CatalogDetail extends Component {
  render() {
    const { classes, category } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.container}>
          <img
            src={category.picture}
            alt={category.name}
            className={classes.picture}
          />
        </div>

        <div className="info">
          <h3>{category.name}</h3>
          <p>{category.description}</p>
          <Button>
            <Link to="/items">Go to products</Link>
          </Button>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(CatalogDetail);
