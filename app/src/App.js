import React, { Component } from 'react';
import Firebase from 'firebase';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import LoginPage from './components/loginPage.jsx';
import Homepage from './components/homepage.jsx';
import Loading from './components/loading.jsx';
import { readFile } from 'fs';

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

const config = {
  apiKey: "AIzaSyB4z3YAM4GSk5OdiFmtwG5XM3SSU2QbCyE",
  authDomain: "programming-things-da9e0.firebaseapp.com",
  databaseURL: "https://programming-things-da9e0.firebaseio.com/",
  projectId: "programming-things-da9e0",
  storageBucket: "programming-things-da9e0.appspot.com",
  messagingSenderId: "15550876073"
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: true,
      loading: true,
    };
  }

  componentWillMount() {
    Firebase.initializeApp(config);

    Firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // User is signed in.
        console.log("signed in.");
        if (!this.state.loggedIn) {
          console.log("set loggedIn to true");
          this.setState({loggedIn: true});
        }
        // ...
      } else {
        // User is signed out.
        // ...
        console.log("not signed in.");
        this.setState({loggedIn: false});
      }
    });
    this.setState({loading: false});
  }

  render() {
    console.log(this.state.loggedIn);
    if (this.state.loading) {
      return (
        <MuiThemeProvider theme={theme}>
          <Loading />
        </MuiThemeProvider>
      );
    }
    return (
      <Router>
        <div className="page">
          <MuiThemeProvider theme={theme}>
            <Route path='/login' component={LoginPage}/>
            <Route exact path='/' component={() => {
              if (this.state.loggedIn) {
                return (
                  <Homepage />
                );
              } else {
                return (
                  <Redirect to='/login' />
                );
              }
            }}/>
          </MuiThemeProvider>
        </div>
      </Router>
    );
  }
}

export default App;
