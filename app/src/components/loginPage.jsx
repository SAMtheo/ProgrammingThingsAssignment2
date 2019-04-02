import React, { Component } from 'react';
import {
  Card, CardContent, CardActions, Grid, TextField, Button,
} from '@material-ui/core';
import '../styles/loginPage.css';

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
  }

  handleLogin() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    console.log(email, password);
  }

  handleSignup() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    console.log(email, password);
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
                        type="Email"
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
