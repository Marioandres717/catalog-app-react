import React, { Component } from 'react';
import Facebook from './facebook';
import Google from './google';
import { Consumer } from '../../userContext';

export default class Login extends Component {
  render() {
    // using function as a child pattern in order to get the context inside the component
    return (
      <Consumer>
        {(context) => (
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
              <Facebook handleLogin={context.handleFbLogin} {...context} />
              <button onClick={context.handleFbLogout}>Log out from FB</button>
              <Google />
            </div>
          </div>
        )}
      </Consumer>
    );
  }
}
