import React, { useState, useEffect } from 'react';
import { Router } from '@reach/router';
import Login from './components/registration/login';
import CatalogList from './components/catalog/catalog-list';
import Main from './components/landing-page/main';
import ItemList from './components/catalog/items/item-list';
import UserContext from './userContext';
import ItemDetails from './components/catalog/items/item-detail';
import ItemCreate from './components/catalog/items/item-create';
import Home from './components/home/home';
import withRoot from './withRoot';
import { withStyles } from '@material-ui/core/styles';
import Gallery from './components/utils/gallery';
import { home } from './components/utils/urlBuilder';
import Item from './components/home/item';
import NotAppBar from './components/utils/notAppBar';

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

function useUserLocalstorage() {
  const [user, setUser] = useState({
    id: null,
    name: '',
    email: '',
    picture: '',
    fbAccessToken: '',
    csrfAccessToken: '',
    csrfRefreshToken: ''
  });

  useEffect(() => {
    fetchUserFromLocalstorage();
  }, []);

  function fetchUserFromLocalstorage() {
    if (localStorage.length) {
      let data = {
        id: +localStorage.id,
        accessToken: localStorage.accessToken,
        name: localStorage.name,
        email: localStorage.email,
        picture: localStorage.picture,
        csrfAccessToken: localStorage.csrfAccessToken,
        csrfRefreshToken: localStorage.csrfRefreshToken
      };
      setUser(data);
    }
  }

  function saveInfoInLocalstorage(user) {
    localStorage.setItem('accessToken', user.fbAccessToken);
    localStorage.setItem('id', user.id);
    localStorage.setItem('email', user.email);
    localStorage.setItem('name', user.name);
    localStorage.setItem('picture', user.picture);
    localStorage.setItem('csrfAccessToken', user.csrfAccessToken);
    localStorage.setItem('csrfRefreshToken', user.csrfRefreshToken);
  }

  return { user, setUser, fetchUserFromLocalstorage, saveInfoInLocalstorage };
}

function useDataFetch() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchHomeContent().then(data => setData(data));
  }, []);

  async function fetchHomeContent() {
    try {
      const response = await fetch(home());
      const { categories } = await response.json();
      return categories;
    } catch (err) {
      console.error(err);
    }
  }
  return { data, setData, fetchHomeContent };
}

const App = props => {
  var { classes } = props;
  var userHook = useUserLocalstorage();
  var dataHook = useDataFetch();
  var [categories, setCategories] = useState([]);
  var [items, setItems] = useState([]);
  var { data } = dataHook;

  useEffect(() => {
    categoriesNameAndId();
  }, [data]);

  function categoriesNameAndId() {
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
      <div className={classes.app}>
        <Home
          categories={categories}
          handleSelectItemsFromCategory={itemsFromCategory}
          handleSelectAllItems={AllItems}
        />
        <Router>
          <Gallery path="/" items={items} />
          <Item path="/items/:id" />
          <Main path="/main" />
          <Login path="/login" />
          <CatalogList path="/categories" />
          <ItemList path="/categories/:categoryId/items" />
          <ItemDetails path="/categories/:categoryId/items/:itemId" />
          <ItemCreate path="/categories/:categoryId/additems" />
        </Router>
      </div>
    </UserContext.Provider>
  );
};

export default withRoot(withStyles(styles)(App));
