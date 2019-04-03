import React, { Component } from 'react';
import {
  Button,
} from '@material-ui/core';
import '../styles/requestAccess.css';

class RequestAccess extends Component {
  constructor(props) {
    super(props);

    this.requestAccessClick = this.requestAccessClick.bind(this);
  }

  requestAccessClick() {
    const roomID = '0001';
    const userID = 'user1';


  }

  render() {
    return (
      <div className="requestAccess-container">
        <h3>Request Access</h3>

        <p>Room ID: 0001</p>
        <p>User ID: user1</p>

        <Button onClick={this.requestAccessClick} variant="contained" color="primary">
          Request Access
        </Button>
      </div>
    );
  }
}

export default RequestAccess;