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
        <Grid container>
          <Grid item xs={12}>
            <Card className="homepage-container">
              <Grid container spacing={8}>
                <Grid item xs={12}>
                  <h1>Room Access System</h1>
                  <p>dummy data: 80099E1C 0001</p>
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
