import React, { Component } from 'react';
import {
  Card, CardContent, CardActions, Grid, TextField, Button,
} from '@material-ui/core';
import '../styles/loginPage.css';

class LoginPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="login-background">
        <Grid container justify="center" alignItems="center">
          <Grid item xs={12} sm={4}>
            <Card>
              <CardContent className="login-container">
                <h2>Login Page</h2>
                <form className="login-form" noValidate autoComplete="off">
                  <TextField
                    id="login-email"
                    label="Email"
                    // className={classes.textField}
                    // value={this.state.name}
                    // onChange={this.handleChange('name')}
                    margin="normal"
                    variant="outlined"
                  />
                  <TextField
                    id="login-password"
                    label="Password"
                    // className={classes.textField}
                    // value={this.state.name}
                    // onChange={this.handleChange('name')}
                    margin="normal"
                    variant="outlined"
                  />
                </form>
              </CardContent>
              <CardActions>
                <Button variant="contained" color="primary" className="login-button">
                  Login
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
