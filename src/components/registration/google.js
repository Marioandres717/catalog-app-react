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
  responseGoogle = response => {
    console.log(response);
    const profile = response.getBasicProfile();
    // console.log(profile);
    this.setState(
      {
        isLoggedIn: true,
        userID: profile.getId(),
        email: profile.getEmail(),
        name: profile.getName(),
        picture: profile.getImageUrl()
      },
      () => {
        console.log(this.state);
      }
    );
  };
  render() {
    let googleContent;

    if (this.state.isLoggedIn) {
      googleContent = (
        <div
          style={{
            width: '400px',
            margin: 'auto',
            background: '#f4f4f4',
            padding: '20px'
          }}
        >
          <img src={this.state.picture} alt={this.state.name} />
          <h2>Welcome {this.state.name}</h2>
          Email: {this.state.email}
        </div>
      );
    } else {
      googleContent = (
        <GoogleLogin
          clientId="143659131919-antcafffo6ca81dvvpikgjqrtfdfbvic.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={this.responseGoogle}
          onFailure={this.responseGoogle}
        />
      );
    }
    return <div>{googleContent}</div>;
  }
}
