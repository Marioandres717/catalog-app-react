import React, { useState } from 'react';
import Facebook from './facebook';
import Google from './google';
import UserContext from '../../userContext';
import Modal from '../../modal';

var Login = props => {
  var [showModal, setModal] = useState(false);
  console.log(showModal);
  function toggleModal() {
    setModal(!showModal);
  }

  function closeModal() {
    setModal(false);
  }

  // using function as a child pattern in order to get the context inside the component
  return (
    <UserContext.Consumer>
      {user => (
        <div>
          {user[0].id != null ? (
            <h1>Hello, {user[0].name}</h1>
          ) : (
            <button onClick={toggleModal}>Sign up | Login</button>
          )}
          {showModal ? (
            <Modal>
              <div>
                <h1>Join the Catalog community</h1>
                <Facebook closeModal={closeModal} />
                <Google closeModal={closeModal} />
                <button onClick={closeModal}>Close</button>
              </div>
            </Modal>
          ) : null}
        </div>
      )}
    </UserContext.Consumer>
  );
};

export default Login;
