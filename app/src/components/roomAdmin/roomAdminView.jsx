import React, { Component } from 'react';
import GiveAccess from '../roomAdmin/giveAccess.jsx';
import RemoveAccess from '../roomAdmin/removeAccess.jsx';
import CheckAccessExists from '../roomAdmin/checkAccessExists.jsx';
import DisplayRoomUsers from './displayRoomUsers.jsx';
import RoomAccessRequests from './roomAccessRequests.jsx';
import { Connector } from 'mqtt-react';
import {
  Grid,
} from '@material-ui/core';

/**
 * View component containing room admin specific components.
 */
class RoomAdminView extends Component {
  constructor(props) {
    super(props);

    // Test data for request forms.
    this.state = {
      requestForms: [
        "samtheo",
        "joe",
      ],
    };
  }

  async componentWillMount() {
    // Get request forms from Firebase
    const reqForms = this.props.rooms[this.props.user.roomNumber].reqForms;
    if (reqForms != null) {
      // Filter out invalid userIDs
      const reqFormsFiltered = reqForms.filter(userId => (userId !== null))
      this.setState({ requestForms: reqForms });
    } else {
      // If there are no req forms, then put an empty file instead
      this.setState({ requestForms: [] });
    }
  }

  render() {
    return (
      <div>
        <Grid container>
          <Grid item xs={12}>
            <p>Email: {this.props.user.email}</p>
            <p>UserId: {this.props.user.userId}</p>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Connector mqttProps={this.props.ip}>
              <div className="displayRooms-container">
                <h3>My Room</h3>
                <p>
                  {this.props.user.roomNumber}
                </p>
              </div>
            </Connector>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Connector mqttProps={this.props.ip}>
              <DisplayRoomUsers roomNumber={this.props.user.roomNumber}/>
            </Connector>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Connector mqttProps={this.props.ip}>
              <GiveAccess roomNumber={this.props.user.roomNumber}/>
            </Connector>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Connector mqttProps={this.props.ip}>
              <RemoveAccess roomNumber={this.props.user.roomNumber}/>
            </Connector>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Connector mqttProps={this.props.ip}>
              <CheckAccessExists roomNumber={this.props.user.roomNumber}/>
            </Connector>
          </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Connector mqttProps={this.props.ip}>
                <RoomAccessRequests requestList={this.state.requestForms} roomNumber={this.props.user.roomNumber} />
              </Connector>
            </Grid>
        </Grid>
      </div>
    );
  }
}

export default RoomAdminView;