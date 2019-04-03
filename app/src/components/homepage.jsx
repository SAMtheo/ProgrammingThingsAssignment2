import React, { Component } from 'react';
import {
  Card, Grid,
} from '@material-ui/core';
import Loading from './loading.jsx';
import '../styles/homepage.css';
import RequestAccess from './requestAccess.jsx';
import RemoveAccess from './removeAccess.jsx';
import MenuAppBar from './header.jsx';

class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  componentWillMount() {
    this.setState({loading: false});
  }

  render() {
    if (this.state.loading) {
      return (
        <Loading />
      );
    }
    return (
      <div className="background">
        <MenuAppBar />
        <Grid container>
          <Grid item xs={12}>
            <Card className="homepage-container">
              <Grid containe spacing={8}>
                <Grid item xs={12}>
                  <h1>Room Access System</h1>
                  <RequestAccess roomNumber="0001" userNumber="user1" />
                  <RemoveAccess roomNumber="0001" userNumber="user1" />
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Homepage;
