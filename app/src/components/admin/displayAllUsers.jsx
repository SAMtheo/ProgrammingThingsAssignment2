import React, { Component } from 'react';
import {
  Grid, Button,
} from '@material-ui/core';
import '../../styles/displayAllUsers.css';
import { subscribe } from 'mqtt-react';

const topic = "getUsers";

class DispalyAllUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userList: [],
    };
    this.getUsers = this.getUsers.bind(this);
  }

  componentWillUnmount() {
    const { mqtt } = this.props;
    mqtt.end(true);
  }

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

  async getUsers() {
    const { mqtt } = this.props;
    await mqtt.publish(topic, "get");
  }

  render() {
    return (
      <div className="diaplyAllUsers-container">
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
})(DispalyAllUsers);
