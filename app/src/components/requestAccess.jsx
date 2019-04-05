import React, { Component } from 'react';
import {
  Button, TextField
} from '@material-ui/core';
import '../styles/requestAccess.css';
import { subscribe } from 'mqtt-react';

const topic = "requestAccess";

class RequestAccess extends Component {
  constructor(props) {
    super(props);

    this.requestAccessClick = this.requestAccessClick.bind(this);
  }

  componentWillUnmount() {
    const { mqtt } = this.props;
    mqtt.end(true);
  }

  async requestAccessClick() {
    // const roomID = this.props.roomNumber;
    // const userID = this.props.userNumber;
    const roomID = document.getElementById('requestAccess-room').value;
    const userID = document.getElementById('requestAccess-user').value;
    const message = roomID + ":" + userID;
    const { mqtt } = this.props;
    await mqtt.publish(topic, message);
    // const response = this.props.data.filter(message => message.includes('#'))[0];
  }

  render() {
    return (
      <div className="requestAccess-container">
        <h3>Request Access</h3>

        <form>
          <TextField
            id="requestAccess-user"
            label="User"
            margin="normal"
            variant="outlined"
          />
          <TextField
            id="requestAccess-room"
            label="Room"
            margin="normal"
            variant="outlined"
          />
        </form>

        {/* <p>Room ID: {this.props.roomNumber}</p>
        <p>User ID: {this.props.userNumber}</p> */}

        <p>{this.props.data}</p>

        <Button onClick={this.requestAccessClick} variant="contained" color="primary">
          Request Access
        </Button>
      </div>
    );
  }
}

export default subscribe({
  topic,
})(RequestAccess);
