import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import CatalogDetail from './catalog-detail';

const styles = (theme) => ({
  root: {
    maxWidth: '87vw',
    maxHeight: '100vh',
    margin: '0 auto',
    backgroundColor: '#ffaa11',
    display: 'grid'
  },
  centerText: {
    textAlign: 'center'
  }
});
class CatalogList extends Component {
  url = 'http://localhost:5000/';
  state = {
    categories: []
  };
  async componentDidMount() {
    try {
      const response = await fetch(this.url);
      const data = await response.json();
      this.setState({ categories: data.categories });
    } catch (err) {
      console.error(err);
    }
  }
  render() {
    const { classes } = this.props;
    const { categories } = this.state;
    return (
      <div className={classes.root}>
        <h2 className={classes.centerText}>List of categories</h2>
        {categories.map((category) => (
          <div key={category.id}>
            <CatalogDetail category={category} />
          </div>
        ))}
      </div>
    );
  }
}

export default withStyles(styles)(CatalogList);
