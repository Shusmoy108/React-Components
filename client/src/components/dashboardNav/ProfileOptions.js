import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { withStyles } from '@material-ui/core/styles';
import { AuthContext } from "contexts/authContext";
import { Redirect } from "react-router-dom";


const styles = theme => ({
  root: {
    display: 'flex',
  },
  paper: {
    marginRight: theme.spacing.unit * 2,
  },
});

class ProfileOptions extends React.Component {
  state = {
    open: false,
    redirectToReferrer: false,
  };

  handleToggle = () => {
    this.setState(state => ({ open: !state.open }));
  };

  handleClose = event => {
    if (this.anchorEl.contains(event.target)) {
      return;
    }

    this.setState({ open: false });
  };

  handleLogout = () => {
      this.props.setLogOut(() => {
        this.setState({redirectToReferrer: true});
      })
  }

  render() {
    const { classes } = this.props;
    const { open, redirectToReferrer } = this.state;

    if (redirectToReferrer === true) {
        return <Redirect to='/login' />;
    }

    return (
      <div className={classes.root} >
          <Button
            buttonRef={node => {
              this.anchorEl = node;
            }}
            aria-owns={open ? 'menu-list-grow' : null}
            aria-haspopup="true"
            onClick={this.handleToggle}
            style={{width: '100%'}}
          >
            {this.props.admin.name}
          </Button>
          <Popper open={open} anchorEl={this.anchorEl} transition disablePortal style={{zIndex: 1}}>
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                id="menu-list-grow"
                style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
              >
                <Paper >
                  <ClickAwayListener onClickAway={this.handleClose}>
                    <MenuList>
                      <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                      <MenuItem onClick={this.handleClose}>My account</MenuItem>
                      <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </div>
    );
  }
}

ProfileOptions.propTypes = {
  classes: PropTypes.object.isRequired,
  setLogOut: PropTypes.func.isRequired,
  admin: PropTypes.object.isRequired
};

const consumerComponent = props => (
	<AuthContext.Consumer>
		{({ setLogOut, admin }) => (
			<ProfileOptions
                {...props}
                admin = {admin}
				setLogOut = {setLogOut}
			/>
		)}
	</AuthContext.Consumer>
);

export default withStyles(styles)(consumerComponent);
