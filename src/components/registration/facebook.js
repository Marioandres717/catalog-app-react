import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';

export default class Facebook extends Component {
  state = {
    isLoggedIn: false,
    userID: '',
    name: '',
    email: '',
    picture: ''
  };

  responseFacebook = async (response) => {
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
          (state) => {
            console.log('hola', this.state);
          }
        );
      }
    } catch (e) {
      console.error(e);
    }
  };

  componentClicked = () => console.log('clicked');
  render() {
    let fbContent;

    if (this.state.isLoggedIn) {
      fbContent = (
        <div
          style={{
            width: '400px',
            margin: 'auto',
            background: '#f4f4f4',
            padding: '20px'
          }}>
          <img src={this.state.picture} alt={this.state.name} />
          <h2>Welcome {this.state.name}</h2>
          Email: {this.state.email}
        </div>
      );
    } else {
      fbContent = (
        <FacebookLogin
          appId="651367041988776"
          autoLoad={false}
          fields="name,email,picture"
          onClick={this.componentClicked}
          callback={this.responseFacebook}
        />
      );
    }
    return <div>{fbContent}</div>;
  }
}
