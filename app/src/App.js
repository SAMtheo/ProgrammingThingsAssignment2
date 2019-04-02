import React, { Component } from 'react';
import logo from './logo.svg';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route } from "react-router-dom";
import LoginPage from './components/loginPage.jsx';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#E100FF',
    },
    secondary: {
      main: '#7F00FF',
    },
  },
});

class App extends Component {
  render() {
    return (
      <Router>
        <div className="page">
          <MuiThemeProvider theme={theme}>
            <Route exact path='/' component={homepage}/>
            <Route path='/login' component={LoginPage}/>
          </MuiThemeProvider>
        </div>
      </Router>
    );
  }
}

const homepage = () => {
  return (
    <div>
      homepage
    </div>
  );
};

export default App;
