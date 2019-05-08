import { useState, useEffect } from 'react';

function useUser() {
  const [user, setUser] = useState({
    id: null,
    name: '',
    email: '',
    picture: '',
    fbAccessToken: '',
    csrfAccessToken: '',
    csrfRefreshToken: ''
  });

  useEffect(() => {
    fetchUserFromLocalstorage();
  }, []);

  function fetchUserFromLocalstorage() {
    if (localStorage.length) {
      let data = {
        id: +localStorage.id,
        accessToken: localStorage.accessToken,
        name: localStorage.name,
        email: localStorage.email,
        picture: localStorage.picture,
        csrfAccessToken: localStorage.csrfAccessToken,
        csrfRefreshToken: localStorage.csrfRefreshToken
      };
      setUser(data);
    }
  }

  function saveInfoInLocalstorage(user) {
    localStorage.setItem('accessToken', user.fbAccessToken);
    localStorage.setItem('id', user.id);
    localStorage.setItem('email', user.email);
    localStorage.setItem('name', user.name);
    localStorage.setItem('picture', user.picture);
    localStorage.setItem('csrfAccessToken', user.csrfAccessToken);
    localStorage.setItem('csrfRefreshToken', user.csrfRefreshToken);
  }

  return { user, setUser, fetchUserFromLocalstorage, saveInfoInLocalstorage };
}

export default useUser;
