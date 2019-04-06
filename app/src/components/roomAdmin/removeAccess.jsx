import React, { Component } from 'react';
import {
  Button, TextField,
} from '@material-ui/core';
import '../../styles/removeAccess.css';
import { subscribe } from 'mqtt-react';

const topic = "removeAccess"

/**
 * Component for removing a specific user from the room a room admin has control over.
 */
class RemoveAccess extends Component {
  constructor(props) {
    super(props);

    this.removeAccessClick = this.removeAccessClick.bind(this);
  }

  componentWillUnmount() {
    const { mqtt } = this.props;

    // Closes the MQTT connection.
    mqtt.end(true);
  }

  /**
   * Takes the inputted userID and constructs a message containing it and the roomID to publish with MQTT.
   */
  async removeAccessClick() {
    const userID = document.getElementById('removeAccess-user').value;
    const roomID = this.props.roomNumber;
    const message = roomID + ":" + userID;

    const { mqtt } = this.props;
    await mqtt.publish(topic, message);
  }

  render() {
    return (
      <div className="removeAccess-container">
        <h3>Remove Access</h3>

        <form>
          <TextField
            id="removeAccess-user"
            label="User"
            margin="normal"
            variant="outlined"
          />
        </form>

        <p>{this.props.data}</p>

        <Button onClick={this.removeAccessClick} variant="contained" color="primary">
          Remove Access
        </Button>
      </div>
    );
  }
}

export default subscribe({
  topic,
})(RemoveAccess);
