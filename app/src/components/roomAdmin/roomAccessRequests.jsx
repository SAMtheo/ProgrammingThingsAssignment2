import React, { Component } from 'react';
import {
    Button, TextField, MenuItem, FormControl
} from '@material-ui/core';
import '../../styles/giveAccess.css';
import Firebase from 'firebase';
import { subscribe } from 'mqtt-react';

const topic = "giveAccess";

class RoomAccessRequests extends Component {
  constructor(props) {
    super(props);

    this.state = {
      request: this.props.requestList[0] || "",
      requestList: this.props.requestList,
    };

    this.giveAccessClick = this.giveAccessClick.bind(this);
}

  componentWillUnmount() {
    const { mqtt } = this.props;
    mqtt.end(true);
  }

  async giveAccessClick() {
    const requestedUser = document.getElementById('requestedUser').value;
    const message = this.props.roomNumber + ":" + requestedUser;
    const { mqtt } = this.props;

    await mqtt.publish(topic, message);

    console.log(this.props.requestList);

    let reqForms;
    await Firebase.database().ref('rooms/' + this.props.roomNumber + '/reqForms').once('value')
    .then(snapshot => {
      reqForms = snapshot.val() || [];
    });

    console.log(reqForms);

    reqForms = reqForms.filter(userId => (userId !== null));

    const newForms = reqForms.filter(userId => (userId !== requestedUser));
    console.log(newForms);

    await Firebase.database().ref('rooms/' + this.props.roomNumber).update({
      reqForms: newForms,
    }, error => {
      if (error) {
        console.log(error);
      } else {
        console.log("success!");
      }
    });

    this.setState({ requestList: newForms });
  }

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
