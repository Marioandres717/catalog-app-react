import React, { Component } from 'react';
import './App.css';
import { Router } from '@reach/router';
import Login from './registration/login';
import SignUp from './registration/sign-up';
import CatalogList from './catalog/catalog-list';
import NavBar from './navigation/navbar';
import Main from './landing-page/main';
import ItemList from './catalog/items/item-list';

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar />
        <Router>
          <Main path="/" />
          <Login path="/login" />
          <SignUp path="/signup" />
          <CatalogList path="/catalog" />
          <ItemList path="/items" />
        </Router>
      </div>
    );
  }
}

export default App;
