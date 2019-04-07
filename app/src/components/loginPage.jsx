import React, { Component } from 'react';
import {
  Card, CardContent, CardActions, Grid, TextField, Button,
} from '@material-ui/core';
import Firebase from 'firebase';
import '../styles/loginPage.css';

/**
 * Login page deals with signup and login of the user.
 * the user will be redirected here if they are not logged in.
 * if a user is logged in and tries to get here, then they are redirected
 * to the homepage.
 */
class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
  }

  /**
   * gets the email and password from the textfields.
   * then uses firebase auth to login. Can only login if their email and
   * passwords are complete.
   */
  async handleLogin() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    // console logs error if the user cannot login
    await Firebase.auth().signInWithEmailAndPassword(email, password)
    .catch(error => {
      console.log(error);
    });
  }

  /**
   * gets the email and password from the textfields.
   * then uses firebase to create an account.
   * once an account is created, it sets up a field in the
   * database to store user information.
   */
  async handleSignup() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    const { user: { uid } } = await Firebase.auth().createUserWithEmailAndPassword(email, password)
    .catch((error) => {
      console.log(error);
    });

    // sets data for new useer
    await Firebase.database().ref('users/' + uid).set(
      {
        uid,
        email,
        permission: "user",
      }, (error) => {
        if (error) {
          console.log(error);
        } else {
          console.log("success!");
        }
      }
    );
  }

  render() {
    return (
      <div className="login-background">
        <Grid container justify="center" alignItems="center">
          <Grid item xs={12} sm={4}>
            <Card className="login-card">
              <CardContent className="login-container">
                <h2>Login Page</h2>
                <form className="login-form" noValidate autoComplete="off">
                  <Grid container>
                    <Grid item xs={12}>
                      <TextField
                        id="login-email"
                        label="Email"
                        autoComplete="email"
                        type="email"
                        margin="normal"
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        id="login-password"
                        label="Password"
                        type="password"
                        margin="normal"
                        variant="outlined"
                      />
                    </Grid>
                  </Grid>
                </form>
              </CardContent>
              <CardActions>
                <Button variant="contained" color="primary" className="login-button" onClick={this.handleLogin}>
                  Login
                </Button>
                <Button variant="contained" color="secondary" className="login-button" onClick={this.handleSignup}>
                  Sign Up
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default LoginPage;
