import React, { Component } from 'react';
import {
  Button,
} from '@material-ui/core';
import '../styles/removeAccess.css';

class RemoveAccess extends Component {
  constructor(props) {
    super(props);

    this.removeAccessClick = this.removeAccessClick.bind(this);
  }

  removeAccessClick() {
    const roomID = this.props.roomNumber;
    const userID = this.props.userNumber;
    console.log(roomID, userID);
  }

  render() {
    return (
      <div className="removeAccess-container">
        <h3>Remove Access</h3>

        <p>Room ID: {this.props.roomNumber}</p>
        <p>User ID: {this.props.userNumber}</p>

        <Button onClick={this.removeAccessClick} variant="contained" color="primary">
          Remove Access
        </Button>
      </div>
    );
  }
}

export default RemoveAccess;
