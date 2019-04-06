import React, { Component } from 'react';
import { Button, TextField } from '@material-ui/core';
import { subscribe } from 'mqtt-react';
import '../../styles/giveAccess.css';

// topic for mqtt subscribe and publish
const topic = "giveAccess";

/**
 * gives access to supplied user to a room selected.
 */
class GiveAccess extends Component {
  constructor(props) {
    super(props);

    this.giveAccessClick = this.giveAccessClick.bind(this);
  }

  /**
   * unmounts mqtt when component is destroyed
   */
  componentWillUnmount() {
    const { mqtt } = this.props;
    mqtt.end(true);
  }

  /**
   * sends giveAccess request to server using email and userid from
   * textfields.
   */
  async giveAccessClick() {
    const roomID = document.getElementById('giveAccess-room').value;
    const userID = document.getElementById('giveAccess-user').value;
    const message = roomID + ":" + userID;
    const { mqtt } = this.props;
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
          <TextField
            id="giveAccess-room"
            label="Room"
            margin="normal"
            variant="outlined"
          />
        </form>

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
