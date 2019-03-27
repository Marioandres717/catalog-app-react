import React, { useState, useContext } from 'react';
import Facebook from './facebook';
// import Google from './google';
import UserContext from '../../userContext';
import Modal from '../../modal';

var Login = () => {
  var [showModal, setModal] = useState(false);
  var { user, saveInfoInLocalstorage } = useContext(UserContext);
  function toggleModal() {
    setModal(!showModal);
  }

  function closeModal() {
    setModal(false);
  }

  // using function as a child pattern in order to get the context inside the component
  return (
    <div>
      {user.id != null ? (
        <h1>Hello, {user.name}</h1>
      ) : (
        <button onClick={toggleModal}>Sign up | Login</button>
      )}
      {showModal ? (
        <Modal>
          <div>
            <h1>Join the Catalog community</h1>
            <Facebook
              closeModal={closeModal}
              localstorage={saveInfoInLocalstorage}
            />
            {/* <Google closeModal={closeModal} /> */}
            <button onClick={closeModal}>Close</button>
          </div>
        </Modal>
      ) : null}
    </div>
  );
};

export default Login;
