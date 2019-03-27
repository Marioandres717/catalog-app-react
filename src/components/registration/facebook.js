import React, { useContext } from 'react';
import FacebookLogin from 'react-facebook-login';
import UserContext from '../../userContext';
import retrieveCookies from '../utils/cookieRetriever';

const Facebook = props => {
  // eslint-disable-next-line no-unused-vars
  var { setUser } = useContext(UserContext);
  var { closeModal, localstorage } = props;

  async function handleLogin(response) {
    try {
      if (response.accessToken) {
        let result = await fetch('http://localhost:5000/fbconnect', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            accept: 'application/json',
            Authorization: `Bearer ${response.accessToken}`
          },
          credentials: 'include'
        });
        let userID = await result.json();
        const cookies = retrieveCookies();
        let u = {
          id: userID,
          name: response.name,
          email: response.email,
          picture: response.picture.data.url,
          fbAccessToken: response.accessToken,
          csrfAccessToken: cookies['csrf_access_token'],
          csrfRefreshToken: cookies['csrf_refresh_token']
        };
        setUser(u);
        closeModal();
        localstorage(u);
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
