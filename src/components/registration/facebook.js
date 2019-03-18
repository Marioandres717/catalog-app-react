import React, { useContext } from 'react';
import FacebookLogin from 'react-facebook-login';
import UserContext from '../../userContext';

const Facebook = props => {
  // eslint-disable-next-line no-unused-vars
  var [user, setUser] = useContext(UserContext);
  var { closeModal } = props;

  async function handleLogin(response) {
    try {
      if (response.accessToken) {
        let result = await fetch('http://localhost:5000/fbconnect', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${response.accessToken}`
          }
        });
        let userID = await result.json();
        let u = {
          id: userID,
          name: response.name,
          email: response.email,
          picture: response.picture.data.url
        };
        setUser(u);
        closeModal();
      }
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <FacebookLogin
      appId="651367041988776"
      autoLoad={false}
      fields="name,email,picture"
      callback={handleLogin}
    />
  );
};

export default Facebook;
