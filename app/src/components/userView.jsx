import React, { Component } from 'react';
import {
  Grid,
} from '@material-ui/core';
import { Connector } from 'mqtt-react';
import DisplayAllRooms from './displayAllRooms.jsx';
import RequestAccess from './requestAccess.jsx';
import CheckAccess from './userCheckAccess.jsx';

const ip = "mqtt://100.68.110.31:9001";

class UserView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Grid container alignItems="stretch">
          <Grid item xs={12}>
            <div>
              <p>Email: {this.props.user.email}</p>
              <p>UserId: {this.props.user.userId}</p>
            </div>
          </Grid>
          <Grid item xs={12}>
            <Connector mqttProps={ip}>
              <DisplayAllRooms />
            </Connector>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Connector mqttProps={ip}>
              <RequestAccess user={this.props.user} rooms={this.props.rooms} />
            </Connector>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Connector mqttProps={ip}>
              <CheckAccess user={this.props.user} />
            </Connector>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default UserView;