import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Firebase from 'firebase';

/**
 * css styles for the header.
 */
const styles = {
    root: {
        flexGrow: 1,
    },
    rightToolbar: {
        marginLeft: 'auto',
        marginRight: -12,
    },
    leftToolbar: {
        marginLeft: -12,
        marginRight: 'auto',
    },
};

/**
 * displays the header, on the top of the homepage.
 */
class MenuAppBar extends React.Component {
    state = {
        auth: true,
        anchorEl: null,
    };

    handleMenu = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    logoutClick = () => {
        Firebase.auth().signOut();
    };

    // Calls back to change the view on homepage
    handleChange = (event,view) => {
        this.props.changeView(view);
    };
      
    render() {
        const { classes } = this.props;
        const { auth, anchorEl } = this.state;
        const open = Boolean(anchorEl);

        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <div className={classes.leftToolbar}>
                            <Button
                                aria-owns={anchorEl ? 'view-choices' : undefined}
                                aria-haspopup="true"
                                onClick={this.handleMenu}
                            >
                                Change View
                            </Button>
                            <Menu
                                id="view-choices"
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={this.handleClose}
                            >
                            {this.props.views.map(view => (
                                <MenuItem 
                                    onClick={event => this.handleChange(event, view)}
                                    value={view}>{view}
                                </MenuItem>
                            ))}
                            </Menu>
                        </div>
                        <Button className={classes.rightToolbar} onClick={this.logoutClick}>
                            Log Out
                        </Button>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

MenuAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MenuAppBar);