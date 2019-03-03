import React, { Component } from 'react';
import Facebook from './facebook';
import Google from './google';
export default class Login extends Component {
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
          <Facebook />
          <Google />
        </div>
      </div>
    );
  }
}
