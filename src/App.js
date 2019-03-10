import React, { Component } from 'react';
import './App.css';
import { Router } from '@reach/router';
import Login from './components/registration/login';
import SignUp from './components/registration/sign-up';
import CatalogList from './components/catalog/catalog-list';
import NavBar from './components/navigation/navbar';
import Main from './components/landing-page/main';
import ItemList from './components/catalog/items/item-list';
import { Provider } from './userContext';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      userID: '',
      name: '',
      email: '',
      picture: '',
      handleFbLogin: this.handleFbLogin,
      handleFbLogout: this.handleFbLogout,
      handleDeleteFbPermission: this.handleDeleteFbPermission
    };
  }

  handleFbLogin = async (response) => {
    try {
      if (response.accessToken) {
        console.log(response);
        const result = await fetch('http://localhost:5000/fbconnect', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${response.accessToken}`
          }
        });
        console.log(result);

        const userID = await result.json();
        this.setState(
          {
            isLoggedIn: true,
            userID: userID,
            name: response.name,
            email: response.email,
            picture: response.picture.data.url
          },
          () => {
            console.log(this.state);
          }
        );
      }
    } catch (e) {
      console.error(e);
    }
  };

  handleFbLogout = () => {
    window.FB.logout((response) => {
      console.log(response);
      this.setState(
        {
          isLoggedIn: false,
          userID: '',
          name: '',
          email: '',
          picture: ''
        },
        () => {
          console.log(this.state);
        }
      );
    });
  };

  handleDeleteFbPermission = async () => {
    let userId = window.FB.getUserID();
    let accessToken = window.FB.getAccessToken();
    await fetch('http://localhost:5000/fbdelete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        data: {
          id: userId,
          accessToken: accessToken
        }
      })
    });
  };

  render() {
    return (
      <div className="App">
        <Provider value={this.state}>
          <NavBar />
          <Router>
            <Main path="/" />
            <Login path="/login" />
            <SignUp path="/signup" />
            <CatalogList path="/catalog" />
            <ItemList path="/items" />
          </Router>
        </Provider>
      </div>
    );
  }
}

export default App;
