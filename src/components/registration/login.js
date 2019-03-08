import React, { Component } from 'react';
import Facebook from './facebook';
import Google from './google';
export default class Login extends Component {
  state = {
    isLoggedIn: false,
    userID: '',
    name: '',
    email: '',
    picture: ''
  };

  handleFbLogin = async (response) => {
    try {
      if (response.accessToken) {
        console.log(response);
        const result = await fetch('http://localhost:5000/fbconnect', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ data: response.accessToken })
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
      <div className="login">
        <img className="login-image" />
        <div>
          <form className="login-form">
            <h3>Login</h3>
            <label htmlFor="email">Email</label>
            <input name="email" type="text" className="email" />
            <label htmlFor="password">Password</label>
            <input name="password" type="password" className="password" />
            <button>Sign in</button>
          </form>
        </div>

        <div className="Oauth-providers">
          <h3>Sign in with</h3>
          <Facebook handleLogin={this.handleFbLogin} {...this.state} />
          <button onClick={this.handleFbLogout}>Log out from FB</button>
          <Google />
        </div>
      </div>
    );
  }
}
