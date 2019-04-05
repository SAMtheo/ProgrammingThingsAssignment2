import React, { Component } from 'react';
import {
  Button, TextField
} from '@material-ui/core';
import { subscribe } from 'mqtt-react';
import '../../styles/checkAccessExists.css';

const topic = "checkAccess";

class CheckAccessExists extends Component {
  constructor(props) {
    super(props);

    this.checkAccessClick = this.checkAccessClick.bind(this);
  }

  componentWillUnmount() {
    const { mqtt } = this.props;
    mqtt.end(true);
  }

  async checkAccessClick() {
    const userID = this.props.user.userId;
    const roomID = document.getElementById('check-room').value;    
    const message = roomID + ":" + userID;
    const { mqtt } = this.props;
    await mqtt.publish(topic, message);
  }

  render() {
    return (
      <div className="check-container">
        <h3>Check Access</h3>

        <form>
          <TextField
            id="check-room"
            label="Room"
            margin="normal"
            variant="outlined"
          />
        </form>

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