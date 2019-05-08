import React, { useState, useEffect } from 'react';
import { Router } from '@reach/router';
import UserContext from './context/userContext';
import Home from './components/navigation/home';
import withRoot from './withRoot';
import { withStyles } from '@material-ui/core/styles';
import Gallery from './components/utils/gallery';
import Item from './components/item/item';
import NotSnackbar from './components/utils/NotSnackbar';
import SnackbarContext from './context/snackbarContext';
import useUser from './hooks/useUser';
import useSnackbar from './hooks/useSnackbar';
import useProduct from './hooks/useProduct';
import isEmpty from './components/utils/isEmptyObject';

const styles = theme => ({
  app: {
    backgroundColor: theme.palette.background.main,
    color: theme.palette.default.main,
    margin: 0,
    paddingTop: '0.1px',
    minHeight: '100vh',
    display: 'grid',
    gridTemplateColumns: '256px 1fr'
  }
});

const App = props => {
  var { classes } = props;
  var userHook = useUser();
  var dataHook = useProduct();
  var snackbarHook = useSnackbar();
  var [categories, setCategories] = useState([]);
  var [items, setItems] = useState([]);
  var { data, setData } = dataHook;

  useEffect(() => {
    categoriesNameAndId();
  }, [data]);

  function categoriesNameAndId() {
    if (isEmpty(data)) {
      return [];
    }
    var categories = data.map(category => {
      let temp = {
        name: category.name,
        id: category.id
      };
      return temp;
    });
    setCategories(categories);
  }

  function AllItems() {
    var items = data.flatMap(arr => arr.items);
    setItems(items);
  }

  function itemsFromCategory(id) {
    var items = data
      .filter(category => category.id == id)
      .flatMap(category => category.items);
    setItems(items);
  }

  return (
    <UserContext.Provider value={userHook}>
      <SnackbarContext.Provider value={snackbarHook}>
        <div className={classes.app}>
          <Home
            categories={categories}
            handleSelectItemsFromCategory={itemsFromCategory}
            handleSelectAllItems={AllItems}
          />
          <Router>
            <Gallery path="/" items={items} setItems={setData} />
            <Item path="/items/:id" setItems={setData} />
          </Router>
          <NotSnackbar />
        </div>
      </SnackbarContext.Provider>
    </UserContext.Provider>
  );
};

export default withRoot(withStyles(styles)(App));
