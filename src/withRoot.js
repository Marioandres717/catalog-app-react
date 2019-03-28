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

const themeA = {
  primary: {
    light: '#ffd869',
    main: '#ffcf44',
    dark: '#b2902f',
    contrastText: '#000'
  },
  onPrimary: {
    light: '#5b5b63',
    main: '#33333d',
    dark: '#23232a',
    contrastText: '#fff'
  },
  secondary: {
    light: '#ffd869',
    main: '#ffcf44',
    dark: '#b2902f',
    contrastText: '#000'
  },
  onSecondary: {
    light: '#ffffff',
    main: '#FFFFFF',
    dark: '#b2b2b2',
    contrastText: '#000'
  },
  background: {
    light: '#5b5b63',
    main: '#33333d',
    dark: '#23232a',
    contrastText: '#fff'
  },
  onBackground: {
    light: '#ffffff',
    main: '#FFFFFF',
    dark: '#b2b2b2',
    contrastText: '#000'
  }
};

// A theme with custom primary and secondary color.
// It's optional.
const theme = createMuiTheme({
  palette: themeA,
  typography: {
    useNextVariants: true
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
