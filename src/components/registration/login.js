import React, { Component } from 'react';
import Facebook from './facebook';
import Google from './google';
import UserContext from '../../userContext';
import Modal from '../../modal';
export default class Login extends Component {
  state = {
    showModal: false
  };

  toggleModal = () => {
    this.setState(state => ({
      showModal: !state.showModal
    }));
  };

  closeModal = () => {
    this.setState({
      showModal: false
    });
  };

  render() {
    var { showModal } = this.state;
    // using function as a child pattern in order to get the context inside the component
    return (
      <UserContext.Consumer>
        {user => (
          <div>
            <h1>{user.name}</h1>
            <button onClick={this.toggleModal}>Sign up | Login</button>
            {showModal ? (
              <Modal>
                <div>
                  <h1>Join the Catalog community</h1>
                  <Facebook closeModal={this.closeModal} />
                  <Google closeModal={this.closeModal} />
                  <button onClick={this.closeModal}>Close</button>
                </div>
              </Modal>
            ) : null}
          </div>
        )}
      </UserContext.Consumer>
    );
  }
}
