import React, { useState, useEffect } from 'react';
import './App.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Router } from '@reach/router';
import Login from './components/registration/login';
import CatalogList from './components/catalog/catalog-list';
import NavBar from './components/navigation/navbar';
import Main from './components/landing-page/main';
import ItemList from './components/catalog/items/item-list';
import UserContext from './userContext';
import ItemDetails from './components/catalog/items/item-detail';
import ItemCreate from './components/catalog/items/item-create';

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

const App = () => {
  const localstorageHook = useUserLocalstorage();

  return (
    <UserContext.Provider value={localstorageHook}>
      <CssBaseline />
      <div className="App">
        <NavBar />
        <Router>
          <Main path="/" />
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

export default App;
