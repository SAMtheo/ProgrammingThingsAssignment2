import React, { Component } from 'react';
import GiveAccess from './giveAccess.jsx';
import RemoveAccess from './removeAccess.jsx';
import CheckAccessExists from './checkAccessExists.jsx';
import DisplayAllRooms from './displayAllRooms.jsx';
import DisplayAllUsers from './displayAllUsers.jsx';
import { Connector } from 'mqtt-react';
import {
  Grid,
} from '@material-ui/core';

const ip = "mqtt://100.68.110.31:9001";

class AdminView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Grid container>
          <Grid item xs={12} sm={6}>
            <Connector mqttProps={ip}>
              <DisplayAllRooms />
            </Connector>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Connector mqttProps={ip}>
              <DisplayAllUsers />
            </Connector>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Connector mqttProps={ip}>
              <GiveAccess />
            </Connector>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Connector mqttProps={ip}>
              <RemoveAccess roomNumber="0001" userNumber="80099E1C" />
            </Connector>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Connector mqttProps={ip}>
              <CheckAccessExists />
            </Connector>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default AdminView;