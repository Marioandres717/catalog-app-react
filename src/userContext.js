import React from 'react';

const UserContext = React.createContext([
  {
    id: null,
    name: '',
    email: '',
    picture: '',
    access_token: ''
  },
  () => {}
]);

export default UserContext;
