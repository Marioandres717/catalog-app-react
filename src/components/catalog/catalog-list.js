import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import CatalogDetail from './catalog-detail';

const styles = theme => ({
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
const CatalogList = props => {
  var url = 'http://localhost:5000/';
  var { classes } = props;
  var [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories().then(data => {
      setCategories(data.categories);
    });
  }, []);

  async function fetchCategories() {
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className={classes.root}>
      <h2 className={classes.centerText}>List of categories</h2>
      {categories.map(category => (
        <div key={category.id}>
          <CatalogDetail category={category} />
        </div>
      ))}
    </div>
  );
};

export default withStyles(styles)(CatalogList);
