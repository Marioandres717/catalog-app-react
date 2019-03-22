import React from 'react';

const UserContext = React.createContext([
  {
    id: null,
    name: '',
    email: '',
    picture: '',
    fbAccessToken: '',
    csrfAccessToken: '',
    csrfRefreshToken: ''
  },
  () => {}
]);

export default UserContext;
