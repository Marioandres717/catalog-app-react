import React from 'react';
import { create } from 'jss';
import JssProvider from 'react-jss/lib/JssProvider';
import {
  MuiThemeProvider,
  createMuiTheme,
  createGenerateClassName,
  jssPreset
} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import red from '@material-ui/core/colors/red';
import blue from '@material-ui/core/colors/blue';

const themeA = {
  primary: {
    main: '#ffcf44'
  },
  textPrimary: {
    main: '#33333d'
  },
  secondary: {
    main: '#c46024'
  },
  textSecondary: {
    main: blue
  },
  default: {
    main: '#FFFFFF'
  },
  background: {
    main: '#33333d'
  },
  error: red
};

// A theme with custom primary and secondary color.
// It's optional.
const theme = createMuiTheme({
  palette: themeA,
  typography: {
    useNextVariants: true,
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(','),
    fontWeightMedium: 500,
    body1: {
      fontWeight: 500
    },
    subtitle1: {
      fontSize: 12
    },
    button: {
      fontStyle: 'italic'
    }
  }
});

// Create a JSS instance with the default preset of plugins.
// It's optional.
const jss = create(jssPreset());

// The standard class name generator.
// It's optional.
const generateClassName = createGenerateClassName();

function withRoot(Component) {
  function WithRoot(props) {
    // JssProvider allows customizing the JSS styling solution.
    return (
      <JssProvider jss={jss} generateClassName={generateClassName}>
        {/* MuiThemeProvider makes the theme available down the React tree
          thanks to React context. */}
        <MuiThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Component {...props} />
        </MuiThemeProvider>
      </JssProvider>
    );
  }

  return WithRoot;
}

export default withRoot;
