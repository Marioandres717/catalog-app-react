import React, { useState } from 'react';
import './App.css';
import { Router } from '@reach/router';
import Login from './components/registration/login';
import CatalogList from './components/catalog/catalog-list';
import NavBar from './components/navigation/navbar';
import Main from './components/landing-page/main';
import ItemList from './components/catalog/items/item-list';
import UserContext from './userContext';
import ItemDetails from './components/catalog/items/item-detail';
import ItemCreate from './components/catalog/items/item-create';

const App = () => {
  const user = useState(UserContext);

  return (
    <UserContext.Provider value={user}>
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
