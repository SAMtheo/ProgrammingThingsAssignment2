import React, { Component } from 'react';
import { Connector } from 'mqtt-react';
import { Grid } from '@material-ui/core';
import GiveAccess from './giveAccess.jsx';
import RemoveAccess from './removeAccess.jsx';
import CheckAccessExists from './checkAccessExists.jsx';
import DisplayAllRooms from './displayAllRooms.jsx';
import DisplayAllUsers from './displayAllUsers.jsx';

/**
 * admin view for application.
 * Shows all functions that they can see. 
 * these functions are not restricted to roomNumber
 * or userId.
 */
class AdminView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Grid container>
          <Grid item xs={12}>
            <div>
              <p>Email: {this.props.user.email}</p>
              <p>UserId: {this.props.user.userId}</p>
            </div>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Connector mqttProps={this.props.ip}>
              <DisplayAllRooms />
            </Connector>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Connector mqttProps={this.props.ip}>
              <DisplayAllUsers />
            </Connector>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Connector mqttProps={this.props.ip}>
              <GiveAccess />
            </Connector>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Connector mqttProps={this.props.ip}>
              <RemoveAccess />
            </Connector>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Connector mqttProps={this.props.ip}>
              <CheckAccessExists />
            </Connector>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default AdminView;
