import React, { Component } from 'react';
import {
  Button, TextField
} from '@material-ui/core';
import '../../styles/giveAccess.css';
import { subscribe } from 'mqtt-react';

const topic = "giveAccess";

/**
 * Component for giving access to a specific user to the room admin's assigned room.
 */
class GiveAccess extends Component {
  constructor(props) {
    super(props);

    this.giveAccessClick = this.giveAccessClick.bind(this);
  }

  componentWillUnmount() {
    const { mqtt } = this.props;

    // Closes the MQTT connection
    mqtt.end(true);
  }

  /**
   * Publishes the request to the subscribed topic with both roomID and inputted userID.
   */
  async giveAccessClick() {
    const roomID = this.props.roomNumber;
    const userID = document.getElementById('giveAccess-user').value;
    const message = roomID + ":" + userID;
    const { mqtt } = this.props;

    // Publish the request
    await mqtt.publish(topic, message);
  }

  render() {
    return (
      <div className="giveAccess-container">
        <h3>Give Access</h3>

        <form>
          <TextField
            id="giveAccess-user"
            label="User"
            margin="normal"
            variant="outlined"
          />
        </form>

        {/* <p>Room ID: {this.props.roomNumber}</p>
        <p>User ID: {this.props.userNumber}</p> */}

        <p>{this.props.data}</p>

        <Button onClick={this.giveAccessClick} variant="contained" color="primary">
          Request Access
        </Button>
      </div>
    );
  }
}

export default subscribe({
  topic,
})(GiveAccess);
