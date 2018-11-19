import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import ModalLayout from "./login/ModalLayout";

import styles from "./headerTopStyles";
import { Link } from "react-router-dom";

import { UserContext } from "contexts/userContext";
import { Avatar, Popover, Paper } from "@material-ui/core";
import ShoppingCartOutlined from "@material-ui/icons/ShoppingCartOutlined";
import VerifiedUserOutlined from "@material-ui/icons/VerifiedUserOutlined";
import RemoveCircleOutlined from "@material-ui/icons/RemoveCircleOutlined";
import FavoriteBorderOutlined from "@material-ui/icons/FavoriteBorderOutlined";
import Logo from "../../assets/logo.png";
import Email from "@material-ui/icons/Email";
import Phone from "@material-ui/icons/Phone";

class HeaderTop extends React.Component {
    state = {
        anchorEl: null,
        open: false
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };
    handleClickPop = event => {
        this.setState({
            anchorEl: event.currentTarget
        });
    };

    handleClosePop = () => {
        this.setState({
            anchorEl: null
        });
    };

    handleLogout = () => {
        this.handleClosePop();
        this.props.setLogout();
    };

    render() {
        const { classes, isAuthenticated, user } = this.props;
        //let isAuthenticated2 = true;
        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);

        return (
            <div className={classes.root}>
                <AppBar className={classes.color} position="static">
                    <Toolbar className={classes.toolbar}>


                        <a href="/">
                            <img
                                src={Logo}
                                alt="logo"
                                style={{ width: "auto", height: 30 }}
                            />
                        </a>
                        <Email className={classes.info} />
                        <Typography variant="body1" style={{ marginLeft: 4, fontSize: 14 }}>
                            info@biggo.com.bd
						</Typography>
                        <Phone className={classes.info} />
                        <Typography variant="body1" style={{ marginLeft: 4, fontSize: 14 }}>
                            01xxxxxxxxx
						</Typography>
                        <div className={classes.grow} />

                        <a href="/" className={classes.itemName} >Contact us</a>
                        <a href="/" className={classes.itemName} >Become a designer</a>
                        <a href="/" className={classes.itemName} >Wishlist</a>
                        {isAuthenticated ? (
                            <div>
                                <div
                                    aria-owns={open ? "simple-popper" : undefined}
                                    aria-haspopup="true"
                                    className={classes.avatar}
                                    onClick={this.handleClickPop}
                                >
                                    <Avatar src={user.avatar} className={classes.avatarIcon} />
                                    <div>
                                        {user.name}
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="15"
                                            height="15"
                                            viewBox="0 0 15 15"
                                        >
                                            <path d="M5 8l4 4 4-4z" />
                                        </svg>
                                    </div>
                                </div>
                                <Popover
                                    id="simple-popper"
                                    open={open}
                                    anchorEl={anchorEl}
                                    onClose={this.handleClosePop}
                                    anchorOrigin={{
                                        vertical: "bottom",
                                        horizontal: "right"
                                    }}
                                    transformOrigin={{
                                        vertical: "top",
                                        horizontal: "right"
                                    }}
                                    className={classes.profile}
                                >
                                    <Paper elevation={3}>
                                        <Button
                                            size="large"
                                            mini
                                            fullWidth
                                            className={classes.avatarButton}
                                            onClick={this.handleClosePop}
                                        >
                                            <ShoppingCartOutlined />
                                            <Typography variant="body1">Orders</Typography>
                                        </Button>

                                        <Button
                                            size="large"
                                            mini
                                            fullWidth
                                            className={classes.avatarButton}
                                            onClick={this.handleClosePop}
                                        >
                                            <FavoriteBorderOutlined />
                                            <Typography variant="body1">Wishlist</Typography>
                                        </Button>

                                        <Button
                                            size="large"
                                            mini
                                            fullWidth
                                            className={classes.avatarButton}
                                            component={Link}
                                            to="/profile"
                                            onClick={this.handleClosePop}
                                        >
                                            <VerifiedUserOutlined />
                                            <Typography variant="body1">Profile</Typography>
                                        </Button>

                                        <Button
                                            size="large"
                                            mini
                                            fullWidth
                                            className={classes.avatarButton}
                                            component={Link}
                                            to="/"
                                            onClick={this.handleLogout}
                                        >
                                            <RemoveCircleOutlined />
                                            <Typography variant="body1">Logout</Typography>
                                        </Button>
                                    </Paper>
                                </Popover>
                            </div>
                        ) : (
                                <Button
                                    color="primary"
                                    variant="outlined"
                                    className={classes.button}
                                    onClick={this.props.toggleModal}
                                    style={{ textTransform: "capitalize" }}
                                >
                                    Login
							</Button>
                            )}
                    </Toolbar>
                </AppBar>
                <ModalLayout
                    handleClickOpen={this.props.toggleModal}
                    handleClose={this.props.toggleModal}
                    open={this.props.open}
                />
            </div>
        );
    }
}

HeaderTop.propTypes = {
    classes: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired
};

const consumerComponent = props => (
    <UserContext.Consumer>
        {({ isAuthenticated, user, toggleLogin, loginOpen, setLogOut }) => (
            <HeaderTop
                {...props}
                toggleModal={toggleLogin}
                open={loginOpen}
                isAuthenticated={isAuthenticated}
                setLogout={setLogOut}
                user={user}
            />
        )}
    </UserContext.Consumer>
);

export default withStyles(styles)(consumerComponent);
