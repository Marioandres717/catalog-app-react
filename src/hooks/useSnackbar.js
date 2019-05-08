import { useState } from 'react';

function useSnackbar() {
  const [snackbar, setSnackbar] = useState({
    open: false,
    vertical: 'bottom',
    horizontal: 'left',
    message: '',
    variant: 'success'
  });

  const handleOpen = newState => () => {
    setSnackbar({ open: true, ...newState });
  };

  function handleClose() {
    setSnackbar({ ...snackbar, open: false });
  }

  return { snackbar, setSnackbar, handleOpen, handleClose };
}

export default useSnackbar;
