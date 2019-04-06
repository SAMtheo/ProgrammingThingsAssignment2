import React, { Component } from 'react';
import {
  Grid, Button,
} from '@material-ui/core';
import '../../styles/displayAllUsers.css';
import { subscribe } from 'mqtt-react';

const topic = "getUsersDoor";

/**
 * Component for displaying all users in the room a room admin owns.
 */
class DisplayRoomUsers extends Component {
  constructor(props) {
    super(props);

    // Updated when list is retrieved.
    this.state = {
      userList: [],
    };

    this.getUsers = this.getUsers.bind(this);
  }

  componentWillUnmount() {
    const { mqtt } = this.props;

    // Close MQTT connection
    mqtt.end(true);
  }

  /**
   * Called before the component's state changes, will set the user list to what was recieved through MQTT.
   * @param newProps
   */
  componentWillUpdate(newProps) {
    if (newProps != this.props) {
      if (newProps.data != null) {
        const userList = newProps.data.filter(message => message.includes('#'));
        if (userList.length > 0) {
          const newUserList = userList[0].substr(1).split(',');
          const updatedUserList = newUserList.filter(room => (room != ""));
          this.setState({ userList: updatedUserList });
        }
      }
    }
  }

  /**
   * Send request through MQTT to the subscribed topic - gets the users.
   * @returns {Promise<void>}
   */
  async getUsers() {
    const { mqtt } = this.props;
    await mqtt.publish(topic, this.props.roomNumber);
  }

  render() {
    return (
      <div className="displyRoomUsers-container">
        <h3>List Of Users</h3>
        <Grid container>
          <Grid item xs={12} sm={6}>
            <ul>
              {this.state.userList.map((user, idx) => (
                <li key={idx}>
                  {user}
                </li>
              ))}
            </ul>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button variant="contained" color="primary" onClick={this.getUsers}>
              Update List
            </Button>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default subscribe({
  topic,
})(DisplayRoomUsers);
