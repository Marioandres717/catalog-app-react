import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';

export default class Facebook extends Component {
  componentClicked = () => console.log('clicked');
  render() {
    var { handleLogin, isLoggedIn, name, email, picture } = this.props;
    if (isLoggedIn) {
      var fbContent = (
        <div
          style={{
            width: '400px',
            margin: 'auto',
            background: '#f4f4f4',
            padding: '20px'
          }}>
          <img src={picture} alt={name} />
          <h2>Welcome {name}</h2>
          Email: {email}
        </div>
      );
    } else {
      var fbContent = (
        <FacebookLogin
          appId="651367041988776"
          autoLoad={true}
          fields="name,email,picture"
          onClick={this.componentClicked}
          callback={handleLogin}
        />
      );
    }
    return <div>{fbContent}</div>;
  }
}
