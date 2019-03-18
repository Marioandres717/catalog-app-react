import React from 'react';

const UserContext = React.createContext([
  {
    id: null,
    name: '',
    email: '',
    picture: ''
  },
  () => {}
]);

export default UserContext;
