import React, { Component } from 'react';
import {
  TextField, Button
} from '@material-ui/core';
import '../styles/requestAccess.css';
import { subscribe } from 'mqtt-react';
import Firebase from 'firebase';

const topic = "requestNewAccess";

class RequestAccess extends Component {
  constructor(props) {
    super(props);
    this.requestAccessClick = this.requestAccessClick.bind(this);
  }

  async requestAccessClick() {
    const roomId = document.getElementById('req-room').value;

    const userId = this.props.user.userId;
    const email = this.props.user.email;

    const { mqtt } = this.props;

    const message = roomId + ":" + userId + ":" + email;
    await mqtt.publish(topic, message);

    let reqForms;
    await Firebase.database().ref('rooms/' + roomId + "/reqForms").once('value')
    .then(snapshot => {
      reqForms = snapshot.val() || [];
    });

    if (!reqForms.includes(userId)) {
      reqForms.push(userId);
    }

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
          {/* <TextField
            id="req-user"
            label="User"
            margin="normal"
            variant="outlined"
          /> */}
          <TextField
            id="req-room"
            label="Room"
            margin="normal"
            variant="outlined"
          />
          {/* <TextField
            id="req-email"
            label="Email"
            margin="normal"
            variant="outlined"
          /> */}
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
