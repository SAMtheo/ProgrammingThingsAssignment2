import React, { Component } from 'react';
import { Card, Grid } from '@material-ui/core';
import Firebase from 'firebase';
import Loading from './loading.jsx';
import MenuAppBar from './header.jsx';
import AdminView from './admin/adminView.jsx';
import RoomAdminView from './roomAdmin/roomAdminView.jsx'
import UserView from './user/userView.jsx';
import '../styles/homepage.css';

/**
 * the Homepage componenet decides which view should be displayed,
 * This is done by retrieving user data from firebase then depending
 * on their permissions, selects which view they can see.
 */
class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      user: { permission: "user" },
      ip: "mqtt://100.68.110.31:9001",
    };
    this.renderPermissionView = this.renderPermissionView.bind(this);
  }

  /**
   * checks uid of currently signed in user. then retieves user data
   * from the firebase database.
   * also gets all room data,
   * then stores this data into the state of the homepage componenet,
   * to be passed to individual components.
   */
  async componentWillMount() {
    const uid = Firebase.auth().currentUser.uid;
    let user;
    // gets user detials from firebase
    await Firebase.database().ref('users/' + uid).once('value')
    .then(snapshot => {
      user = snapshot.val() || { permission: "user" };
    }); 

    let rooms;
    // gets room details from firebase
    await Firebase.database().ref('rooms/').once('value')
    .then(snapshot => {
      rooms = snapshot.val() || {};
    });

    this.setState({ loading: false, user, rooms });
  }

  /**
   * depending on the user permissions, show a different view
   */
  renderPermissionView() {
    switch (this.state.user.permission) {
      case "super": {
        return (
          <AdminView ip={this.state.ip} user={this.state.user} />
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
