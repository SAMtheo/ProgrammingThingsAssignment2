import React, { Component } from 'react';
import {
  Card, Grid,
} from '@material-ui/core';
import Loading from './loading.jsx';
import '../styles/homepage.css';
import MenuAppBar from './header.jsx';
import Firebase from 'firebase';
import AdminView from './admin/adminView.jsx';
import RoomAdminView from './roomAdmin/roomAdminView.jsx'
import UserView from './user/userView.jsx';

class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      user: { permission: "user" },
    };
    this.renderPermissionView = this.renderPermissionView.bind(this);
  }

  async componentWillMount() {
    const uid = Firebase.auth().currentUser.uid;
    let user;
    await Firebase.database().ref('users/' + uid).once('value')
    .then(snapshot => {
      user = snapshot.val() || { permission: "user" };
    }); 

    let rooms;
    await Firebase.database().ref('rooms/').once('value')
    .then(snapshot => {
      rooms = snapshot.val() || {};
    });

    console.log(user);
    this.setState({ loading: false, user, rooms });
  }

  renderPermissionView() {
    switch (this.state.user.permission) {
      case "super": {
        return (
          <AdminView />
        );
      }
      case "roomAdmin": {
        return (
            <RoomAdminView user={this.state.user} rooms={this.state.rooms} />
        )
      }
      case "user": {
        return (
          <UserView user={this.state.user} rooms={this.state.rooms} />
        );
      }
    }
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
              <Grid container spacing={8}>
                <Grid item xs={12}>
                  <h1>Room Access System</h1>
                  {this.renderPermissionView()}
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
