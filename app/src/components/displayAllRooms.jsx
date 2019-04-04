import React, { Component } from 'react';
import {
  Grid, Button,
} from '@material-ui/core';
import '../styles/displayAllRooms.css';
import { subscribe } from 'mqtt-react';

const topic = "getRooms";

class DisplayAllRooms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomList: [],
    };
    this.getTables = this.getTables.bind(this);
  }

  async getTables() {
    const { mqtt } = this.props;
    await mqtt.publish(topic, "get");
  }

  render() {
    return (
      <div className="displayRooms-container">
        <h3>List Of Rooms</h3>
        <Grid container>
          <Grid item xs={12} sm={6}>
            <ul>
              {this.state.roomList.map((room, idx) => (
                <li key={idx}>
                  {room}
                </li>
              ))}
            </ul>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button variant="contained" color="primary" onClick={this.getTables}>
              Update List
            </Button>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default DisplayAllRooms;
