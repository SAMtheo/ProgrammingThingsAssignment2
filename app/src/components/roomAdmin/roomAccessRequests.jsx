import React, { Component } from 'react';
import {
    Button, TextField, MenuItem, FormControl
} from '@material-ui/core';
import '../../styles/giveAccess.css';
import Firebase from 'firebase';
import { subscribe } from 'mqtt-react';

const topic = "giveAccess";

/*
 * Gives users that have requested access to the room admin's room.
 */
class RoomAccessRequests extends Component {
  constructor(props) {
    super(props);

    // Stores the dropdown's menu items.
    this.state = {
      request: this.props.requestList[0] || "",
      requestList: this.props.requestList,
    };

    this.giveAccessClick = this.giveAccessClick.bind(this);
}

  componentWillUnmount() {
    const { mqtt } = this.props;

    // Closes the MQTT connection.
    mqtt.end(true);
  }

  /**
   * Sends the request to allow access to a user that has requested it - updates the list after.
   */
  async giveAccessClick() {
    const requestedUser = document.getElementById('requestedUser').value;
    const message = this.props.roomNumber + ":" + requestedUser;
    const { mqtt } = this.props;

    await mqtt.publish(topic, message);

    // Finds the request forms assigned to that room.
    let reqForms;
    await Firebase.database().ref('rooms/' + this.props.roomNumber + '/reqForms').once('value')
    .then(snapshot => {
      reqForms = snapshot.val() || [];
    });

    reqForms = reqForms.filter(userId => (userId !== null));

    const newForms = reqForms.filter(userId => (userId !== requestedUser));

    // Updates the list
    await Firebase.database().ref('rooms/' + this.props.roomNumber).update({
      reqForms: newForms,
    }, error => {
      if (error) {
        console.log(error);
      }
    });

    this.setState({ requestList: newForms });
  }

  /**
   * Update the currently displayed item in the dropdown.
   * @param event
   */
  handleChange = event => {
    this.setState({ request: event.target.value });
  };

  render() {
    return (
      <div className="removeAccess-container">
        <h3>Rooms Requests</h3>

        <form>
          <TextField
            id="requestedUser"
            select
            value={this.state.request}
            onChange={this.handleChange}
            margin="normal"
            variant="outlined">
            {this.state.requestList.map((request, idx) => (
              <MenuItem key={idx} value={request}>{request}</MenuItem>
            ))}
          </TextField>
        </form>

        <p>{this.props.data}</p>

        <Button onClick={this.giveAccessClick} variant="contained" color="primary">
          Make Request
        </Button>
      </div>
    );
  }
}

export default subscribe({
  topic,
})(RoomAccessRequests);
