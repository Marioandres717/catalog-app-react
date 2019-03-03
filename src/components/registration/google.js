import React, { Component } from 'react';
import { GoogleLogin } from 'react-google-login';

export default class Google extends Component {
  state = {
    isLoggedIn: false,
    userID: '',
    name: '',
    email: '',
    picture: ''
  };
  responseGoogle = (response) => {
    console.log(response);
  };
  render() {
    return (
      <GoogleLogin
        clientId="143659131919-antcafffo6ca81dvvpikgjqrtfdfbvic.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={this.responseGoogle}
        onFailure={this.responseGoogle}
      />
    );
  }
}
