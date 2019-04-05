import React, { Component } from 'react';
import {
  Card, Grid,
} from '@material-ui/core';
import Loading from './loading.jsx';
import '../styles/homepage.css';
import RequestAccess from './requestAccess.jsx';
import RemoveAccess from './removeAccess.jsx';
import CheckAccessExists from './checkAccessExists.jsx';
import DisplayAllRooms from './displayAllRooms.jsx';
import DisplayAllUsers from './displayAllUsers.jsx';
import { Connector } from 'mqtt-react';
import MenuAppBar from './header.jsx';
import Firebase from 'firebase';

class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  async componentWillMount() {
    const uid = Firebase.auth().currentUser.uid;
    let user;
    await Firebase.database().ref('users/' + uid).once('value')
    .then(snapshot => {
      user = snapshot.val() || { permission: "user" };
    }); 

    console.log(user);
    this.setState({ loading: false });
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
                  <Connector mqttProps="mqtt://100.68.110.31:9001">
                    <RequestAccess roomNumber="0001" userNumber="80099E1C" />
                  </Connector>
                  <Connector mqttProps="mqtt://100.68.110.31:9001">
                    <RemoveAccess roomNumber="0001" userNumber="80099E1C" />
                  </Connector>
                  <Connector mqttProps="mqtt://100.68.110.31:9001">
                    <CheckAccessExists />
                  </Connector>
                  <Connector mqttProps="mqtt://100.68.110.31:9001">
                    <DisplayAllRooms />
                  </Connector>
                  <Connector mqttProps="mqtt://100.68.110.31:9001">
                    <DisplayAllUsers />
                  </Connector>
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
