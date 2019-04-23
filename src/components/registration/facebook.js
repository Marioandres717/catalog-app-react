import React, { useContext } from 'react';
import FacebookLogin from 'react-facebook-login';
import UserContext from '../../userContext';
import retrieveCookies from '../utils/cookieRetriever';
import { fbConnect } from '../utils/urlBuilder';
import SnackbarContext from '../../snackbarContext';

function Facebook(props) {
  var { setUser, saveInfoInLocalstorage } = useContext(UserContext);
  var { snackbar, setSnackbar } = useContext(SnackbarContext);
  var { onClose } = props;

  async function handleLogin(response) {
    try {
      if (response.accessToken) {
        let result = await fetch(fbConnect(), {
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

        let user = {
          id: userID,
          name: response.name,
          email: response.email,
          picture: response.picture.data.url,
          fbAccessToken: response.accessToken,
          csrfAccessToken: cookies['csrf_access_token'],
          csrfRefreshToken: cookies['csrf_refresh_token']
        };
        setUser(user);
        saveInfoInLocalstorage(user);
        onClose();
      }
    } catch (e) {
      console.error(e);
      setSnackbar({ ...snackbar, open: true, message: `Error while login in` });
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
}

export default Facebook;
