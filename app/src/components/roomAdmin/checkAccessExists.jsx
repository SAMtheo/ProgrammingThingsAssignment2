import React, { Component } from 'react';
import {
  Button, TextField
} from '@material-ui/core';
import { subscribe } from 'mqtt-react';
import '../../styles/checkAccessExists.css';

const topic = "checkAccess";

/**
 * Component for checking a user's access to the room a room admin has access to.
 */
class CheckAccessExists extends Component {
  constructor(props) {
    super(props);

    this.checkAccessClick = this.checkAccessClick.bind(this);
  }


  componentWillUnmount() {
    const { mqtt } = this.props;

    // Closes connection
    mqtt.end(true);
  }

  /**
   * Takes the inputted userID and constructs a message containing it and the roomID to publish with MQTT.
   */
  async checkAccessClick() {
    const userID = document.getElementById('check-user').value;
    const roomID = this.props.roomNumber;
    const message = roomID + ":" + userID;
    const { mqtt } = this.props;

    // Publish to topic
    await mqtt.publish(topic, message);
  }

  render() {
    return (
      <div className="check-container">
        <h3>Check Access</h3>

        <form>
          <TextField
            id="check-user"
            label="User"
            margin="normal"
            variant="outlined"
          />
        </form>

        {/* <p>Room ID: {this.props.roomNumber}</p>
        <p>User ID: {this.props.userNumber}</p> */}

        <p>{this.props.data}</p>

        <Button onClick={this.checkAccessClick} variant="contained" color="primary">
          Check Access
        </Button>
      </div>
    );
  }
}

export default subscribe({
  topic,
})(CheckAccessExists);
