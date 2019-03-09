import React from 'react';

const UserContext = React.createContext({
  isLoggedIn: false,
  userID: '',
  name: '',
  email: '',
  picture: '',
  handleFbLogin() {},
  handleFbLogout() {},
  handleDeleteFbPermission() {}
});

export const Provider = UserContext.Provider;
export const Consumer = UserContext.Consumer;
