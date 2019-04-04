import React, { Component } from 'react';
import {
  Button, TextField,
} from '@material-ui/core';
import '../styles/removeAccess.css';
import { subscribe } from 'mqtt-react';

const topic = "removeAccess"

class RemoveAccess extends Component {
  constructor(props) {
    super(props);

    this.removeAccessClick = this.removeAccessClick.bind(this);
  }

  async removeAccessClick() {
    const userID = document.getElementById('removeAccess-user').value;
    const roomID = document.getElementById('removeAccess-room').value;
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
          <TextField
            id="removeAccess-room"
            label="Room"
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
