import React, { Component } from 'react';
import {
    Button, TextField, MenuItem, FormControl
} from '@material-ui/core';
import '../../styles/giveAccess.css';

class RoomAccessRequests extends Component {
    constructor(props) {
        super(props);

        this.state = {
          request: this.props.requestList[0] || ""
        };

        this.giveAccessClick = this.giveAccessClick.bind(this);
    }

    componentWillUnmount() {
        const { mqtt } = this.props;
        mqtt.end(true);
    }

    async giveAccessClick() {
        // const roomID = this.props.roomNumber;
        // const userID = document.getElementById('giveAccess-user').value;
        // const message = roomID + ":" + userID;
        // const { mqtt } = this.props;
        // await mqtt.publish(topic, message);
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
                        select
                        value={this.state.request}
                        onChange={this.handleChange}
                        margin="normal"
                        variant="outlined">
                        {this.props.requestList.map((request) => (
                            <MenuItem value={request}>{request}</MenuItem>
                        ))}
                    </TextField>
                </form>

                {/* <p>Room ID: {this.props.roomNumber}</p>
        <p>User ID: {this.props.userNumber}</p> */}

                <p>{this.props.data}</p>

                <Button onClick={this.giveAccessClick} variant="contained" color="primary">
                    Make Request
                </Button>
            </div>
        );
    }
}

export default RoomAccessRequests;