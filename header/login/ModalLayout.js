import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import IconButton from "@material-ui/core/IconButton";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import withMobileDialog from "@material-ui/core/withMobileDialog";

import FacebookLogin from "react-facebook-login";
import { GoogleLogin } from "react-google-login";

// @material-ui/icons
import Close from "@material-ui/icons/Close";
import modalStyle from "./modalLayoutStyle";

import LoginModal from "./LoginModal";
import SignupModal from "./SignupModal";

import config from "utils/config.json";
import "./social.css";

function Transition(props) {
    return <Slide direction="down" {...props} />;
}

class ModalLayout extends React.Component {
    state = {
        open: true,
        modalVar: "LOGIN"
    };

    setLogin = () => {
        this.setState({ modalVar: "LOGIN" });
    };

    setSignup = () => {
        this.setState({ modalVar: "SIGNUP" });
    };

    render() {
        const { fullScreen, classes } = this.props;
        let modalContent = <LoginModal />;
        let modalFooter = (
            <div
                className={classes.modalFooter}
            >
                <Typography variant="caption" gutterBottom>
                    Don't have an Account?
				</Typography>
                <Button onClick={this.setSignup} color="primary">
                    SIGNUP
				</Button>
            </div>
        );
        if (this.state.modalVar === "SIGNUP") {
            modalContent = <SignupModal />;
            modalFooter = (
                <div
                    className={classes.modalFooter}
                >
                    <Typography variant="caption" gutterBottom>
                        Already have an Account?
					</Typography>
                    <Button onClick={this.setLogin} color="primary">
                        LOGIN
					</Button>
                </div>
            );
        }

        return (
            <Dialog
                fullScreen={fullScreen}
                open={this.props.open}
                TransitionComponent={Transition}
                onClose={this.props.handleClose}
                aria-labelledby="responsive-dialog-title"
                classes={{
                    paper: classes.paperOverride // class name, e.g. `classes-nesting-root-x`
                }}
            >
                <DialogTitle
                    disableTypography
                    className={classes.modalHeader}
                >
                    <Typography
                        variant="h6"
                        gutterBottom
                        className={classes.modalTitle}
                    >
                        {this.state.modalVar}
                    </Typography>
                    <IconButton
                        key="close"
                        aria-label="Close"
                        style={{ padding: 0, marginRight: 10 }}
                        onClick={this.props.handleClose}
                    >
                        <Close />
                    </IconButton>
                </DialogTitle>
                <DialogActions style={{ display: 'flex', flexFlow: 'column', padding: 4 }}>
                    <div className={classes.socialLine}>
                        <FacebookLogin
                            appId={config.FACEBOOK_APP_ID}
                            autoLoad={false}
                            fields="name,email,picture"
                            callback={this.props.facebookResponse}
                            icon={<i className={"fab fa-facebook"} style={{ padding: 10 }} />}
                            cssClass="fbClass"
                        />
                        <GoogleLogin
                            clientId={config.GOOGLE_CLIENT_ID}
                            onSuccess={this.props}
                            onFailure={this.props}
                            className="googleClass"
                        >
                            <i className="fab fa-google-plus-g" />
                            <span> Login with Google</span>
                        </GoogleLogin>
                    </div>
                    {modalContent}
                    {modalFooter}
                </DialogActions>
            </Dialog>
        );
    }
}

ModalLayout.propTypes = {};

export default withMobileDialog()(withStyles(modalStyle)(ModalLayout));
