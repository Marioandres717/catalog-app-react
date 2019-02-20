import React, { Component } from 'react';
import './App.css';
import { Router, Link } from '@reach/router';
import Login from './registration/login';
import SignUp from './registration/sign-up';
import CatalogList from './catalog/catalog-list';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Link to="/">Hello</Link>

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
