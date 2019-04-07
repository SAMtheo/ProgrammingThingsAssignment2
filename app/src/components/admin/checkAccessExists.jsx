import React, { Component } from 'react';
import { Button, TextField } from '@material-ui/core';
import { subscribe } from 'mqtt-react';
import '../../styles/checkAccessExists.css';

// topic for mqtt publish and subscribe
const topic = "checkAccess";

/**
 * checks if a user exists within supplied room.
 */
class CheckAccessExists extends Component {
  constructor(props) {
    super(props);

    this.checkAccessClick = this.checkAccessClick.bind(this);
  }

  /**
   * unmounts mqtt when component is destroyed.
   */
  componentWillUnmount() {
    const { mqtt } = this.props;
    mqtt.end(true);
  }

  /**
   * sends mqtt request with details taken from text fields.
   */
  async checkAccessClick() {
    const userID = document.getElementById('check-user').value;
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
            id="check-user"
            label="User"
            margin="normal"
            variant="outlined"
          />
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

/**
 * subscribes to the topic to see response
 */
export default subscribe({
  topic,
})(CheckAccessExists);
