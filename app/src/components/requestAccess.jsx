import React, { Component } from 'react';
import {
  Button,
} from '@material-ui/core';
import '../styles/requestAccess.css';
import { subscribe } from 'mqtt-react';

class RequestAccess extends Component {
  constructor(props) {
    super(props);

    this.requestAccessClick = this.requestAccessClick.bind(this);
  }

  requestAccessClick() {
    const roomID = this.props.roomNumber;
    const userID = this.props.userNumber;
    const message = roomID + ":" + userID + "\n";
    console.log(roomID, userID);
    const { mqtt } = this.props;
    mqtt.publish('requestAccess', message);
  }

  render() {
    return (
      <div className="requestAccess-container">
        <h3>Request Access</h3>

        <p>Room ID: {this.props.roomNumber}</p>
        <p>User ID: {this.props.userNumber}</p>

        <Button onClick={this.requestAccessClick} variant="contained" color="primary">
          Request Access
        </Button>
      </div>
    );
  }
}

export default subscribe({
  topic: 'requsetAccess',
})(RequestAccess);
