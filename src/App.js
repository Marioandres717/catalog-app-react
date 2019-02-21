import React, { Component } from 'react';
import './App.css';
import { Router } from '@reach/router';
import Login from './registration/login';
import SignUp from './registration/sign-up';
import CatalogList from './catalog/catalog-list';
import NavBar from './navigation/navbar';

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar />
        <Router>
          <Login path="/login" />
          <SignUp path="/signup" />
          <CatalogList path="/" />
        </Router>
      </div>
    );
  }
}

export default App;
