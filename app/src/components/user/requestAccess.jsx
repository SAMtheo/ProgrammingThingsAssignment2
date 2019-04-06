import React, { Component } from 'react';
import { TextField, Button } from '@material-ui/core';
import { subscribe } from 'mqtt-react';
import Firebase from 'firebase';
import '../../styles/requestAccess.css';

// topic id for mqtt subscription and publish.
const topic = "requestNewAccess";

/**
 * requests access for specific user.
 * sends mqtt request for topic requestNewAccess.
 * then updates the database for that room,
 * saving the fact that they have requested access for a room.
 */
class RequestAccess extends Component {
  constructor(props) {
    super(props);
    this.requestAccessClick = this.requestAccessClick.bind(this);
  }

  /**
   * gets roomId from textfield, then userId and email from the
   * currently logged in user.
   * sends a request via mqtt and saves the request form to the
   * firebase database.
   */
  async requestAccessClick() {
    const roomId = document.getElementById('req-room').value;

    const userId = this.props.user.userId;
    const email = this.props.rooms[roomId].roomAdmin;

    const { mqtt } = this.props;

    const message = roomId + ":" + userId + ":" + email;
    // sends message to mqtt
    await mqtt.publish(topic, message);

    let reqForms;
    // checks if request has already been made
    await Firebase.database().ref('rooms/' + roomId + "/reqForms").once('value')
    .then(snapshot => {
      reqForms = snapshot.val() || [];
    });

    if (!reqForms.includes(userId)) {
      reqForms.push(userId);
    }

    // updates the request form for said room.
    Firebase.database().ref('rooms/' + roomId).update({
      reqForms,
    }, error => {
      if (error) {
        console.log(error);
      } else {
        console.log("success!");
      }
    });
  }

  render() {
    return (
      <div className="req-container">
        <h3>Request Access</h3>

        <form>
          <TextField
            id="req-room"
            label="Room"
            margin="normal"
            variant="outlined"
          />
        </form>

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
