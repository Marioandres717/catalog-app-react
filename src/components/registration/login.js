import React, { Component } from 'react';
import Facebook from './facebook';
import Google from './google';
export default class Login extends Component {
  render() {
    return (
      <div>
        <Facebook />
        <Google />
      </div>
    );
  }
}
