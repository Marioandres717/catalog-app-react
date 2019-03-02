import React, { Component } from 'react';
import './App.css';
import { Router } from '@reach/router';
import Login from './components/registration/login';
import SignUp from './components/registration/sign-up';
import CatalogList from './components/catalog/catalog-list';
import NavBar from './components/navigation/navbar';
import Main from './components/landing-page/main';
import ItemList from './components/catalog/items/item-list';

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
