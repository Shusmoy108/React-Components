import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import ModalLayout from "./login/ModalLayout";
import HeaderOptions from './headeroption/HeaderOptions'
import styles from "./singleheaderstyle";
import { Link } from "react-router-dom";
import TextField from '@material-ui/core/TextField'
import { UserContext } from "contexts/userContext";
import { Avatar, Popover, Paper, Hidden } from "@material-ui/core";
import ShoppingCartOutlined from "@material-ui/icons/ShoppingCartOutlined";
import VerifiedUserOutlined from "@material-ui/icons/VerifiedUserOutlined";
import RemoveCircleOutlined from "@material-ui/icons/RemoveCircleOutlined";
import FavoriteBorderOutlined from "@material-ui/icons/FavoriteBorderOutlined";
import { IconButton } from "@material-ui/core";
import Cart from "@material-ui/icons/ShoppingCartTwoTone";
import Logo from "../../assets/logo.png";
import SearchIcon from "@material-ui/icons/Search";
import CallIcon from "@material-ui/icons/CallTwoTone";
import DesignIcon from "@material-ui/icons/CreateTwoTone";
import LoginIcon from "@material-ui/icons/PersonTwoTone";
import LoveIcon from "@material-ui/icons/FavoriteBorderTwoTone"
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import Tooltip from '@material-ui/core/Tooltip'
import Slide from '@material-ui/core/Slide'

function Transition(props) {
    return <Slide direction="left" {...props} />;
}

class SingleHeader extends React.Component {
    state = {
        anchorEl: null,
        open: false,
        searchField: false,
        imgShow: true,
    };
    handleClickOpen = () => {
        this.setState({ open: true });
    };
    handleSearch = () => {
        let that = this;
        this.setState({ searchField: !this.state.searchField }, () => {
            if (!this.state.searchField) {
                setTimeout(() => {
                    that.setState({ imgShow: !that.state.imgShow });
                }, 400)
            }
            else {
                that.setState({ imgShow: !that.state.imgShow });
            }
        });
    }
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
        const { classes, isAuthenticated, user, toggleCart, toggleModal } = this.props;
        //let isAuthenticated2 = true;cd server
        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);
        let searchShow, imgShow;

        if (this.state.searchField) {
            searchShow = { maxWidth: 300 }
            imgShow = {
                visibility: "hidden",
                width: "0px"
            }
        }
        else {
            // imgShow = {
            //     display: "none",
            //     opacity: "0"
            // }
            // searchShow = { maxWidth: 200 }

            // imgShow = {
            //     transition: "all 0.2s ease-out 0.5s",
            //     visibility: "visible",
            //     width: "auto"

            // }

        }


        return (
            <div className={classes.root}>
                <AppBar className={classes.color}>
                    <Toolbar className={classes.toolbar}>

                        <a href="/" className={classes.sectionDesktop}>
                            <img
                                src={Logo}
                                alt="logo"
                                style={{ width: "auto", height: 25 }}
                            />
                        </a>
                        <div className={classes.infoHeader} >
                            <HeaderOptions searchField={this.state.imgShow} />
                        </div>

                        {this.state.imgShow && (

                            <a href="/" className={classes.imgShow}>
                                <img
                                    src={Logo}
                                    alt="logo"
                                    style={{ width: "auto", height: 20 }}
                                />
                            </a>
                        )}
                        <div className={classes.grow} />
                        <Input
                            placeholder="Search Bigprint"
                            className={classes.searchInput}
                            style={searchShow}
                            startAdornment={
                                <InputAdornment position="start">
                                    <SearchIcon color="primary" className={classes.search} />
                                </InputAdornment>
                            }
                        />
                        <Tooltip title="Search">

                            <IconButton

                                color="primary"
                                className={classes.searchButton}
                                onClick={this.handleSearch}
                            >
                                <SearchIcon />
                            </IconButton>
                        </Tooltip>


                        <Tooltip title="Contact">

                            <IconButton

                                color="primary"
                                className={classes.button2}
                            //onClick={toggleCart}
                            >
                                <CallIcon />
                            </IconButton>
                        </Tooltip>

                        {/* // <Tooltip title="Designer">
                        //     <IconButton

                        //         color="primary"
                        //         className={classes.button2}
                        //     // onClick={toggleCart}
                        //     >
                        //         <DesignIcon />
                        //     </IconButton>
                        // </Tooltip>

                        // <Tooltip title="Wishlist">
                        //     <IconButton

                        //         color="primary"
                        //         className={classes.button2}
                        //     //onClick={toggleCart}
                        //     >
                        //         <LoveIcon />
                        //     </IconButton>
                        // </Tooltip> */}
                        <Tooltip title="Cart">
                            <IconButton

                                color="primary"
                                className={classes.button}
                                onClick={toggleCart}
                            >
                                <Cart />
                            </IconButton>
                        </Tooltip>
                        {isAuthenticated ? (

                            <div style={{ minHeight: 'inherit' }}>
                                <Tooltip title={user.name}>
                                    <IconButton

                                        color="primary"
                                        className={classes.button}
                                        onClick={this.handleClickPop}
                                    //onClick={toggleCart}
                                    >


                                        <Avatar src={user.avatar} className={classes.avatarIcon} />


                                    </IconButton>
                                </Tooltip>
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
                                <Tooltip title="Login">
                                    <IconButton

                                        color="primary"
                                        onClick={toggleModal}
                                        className={classes.button}
                                    //onClick={toggleCart}
                                    >


                                        <LoginIcon />

                                    </IconButton>
                                </Tooltip>
                            )}



                    </Toolbar>
                </AppBar>
                <ModalLayout
                    handleClickOpen={this.props.toggleModal}
                    handleClose={this.props.toggleModal}
                    open={this.props.open}
                />
            </div >
        );
    }
}

SingleHeader.propTypes = {
    classes: PropTypes.object.isRequired,
    //isAuthenticated: PropTypes.bool.isRequired,
    //user: PropTypes.object.isRequired
};

// const consumerComponent = props => (
// 	<UserContext.Consumer>
// 		{({ isAuthenticated, user, toggleLogin, loginOpen, setLogOut }) => (
// 			<HeaderTop
// 				{...props}
// 				toggleModal={toggleLogin}
// 				open={loginOpen}
// 				isAuthenticated={isAuthenticated}
// 				setLogout={setLogOut}
// 				user={user}
// 			/>
// 		)}
// 	</UserContext.Consumer>
// );
const consumerComponent = props => (
    <UserContext.Consumer>
        {({ toggleCart, isAuthenticated, user, toggleLogin, loginOpen, setLogOut }) => <SingleHeader {...props} toggleCart={toggleCart} toggleModal={toggleLogin}
            open={loginOpen}
            isAuthenticated={isAuthenticated}
            setLogout={setLogOut}
            user={user} />}
    </UserContext.Consumer>
);

export default withStyles(styles)(consumerComponent);
