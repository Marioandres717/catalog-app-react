import React from 'react';

const SnackbarContext = React.createContext({
  open: false,
  vertical: 'bottom',
  horizontal: 'left',
  message: '',
  variant: 'success'
});

export default SnackbarContext;
