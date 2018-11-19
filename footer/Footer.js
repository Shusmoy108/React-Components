import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";
import classNames from "classnames";
import IconButton from "@material-ui/core/IconButton";
import {
    Tooltip,
    Hidden,
    Typography,
    Button,
    Divider
} from "@material-ui/core";
import Map from "./Map";
const styles = theme => ({
    root: {
        backgroundColor: theme.palette.primary.main,
        top: "auto",
        bottom: 0
    },
    button: {
        textTransform: "none",
        margin: "2% 0",
        padding: 8,
        borderWidth: "0",
        [theme.breakpoints.down("sm")]: {
            //marginRight: theme.spacing.unit * 1,
            padding: 4
        }
        //textTransform: "none"
    },
    textcolor: {
        color: "white"
        //paddingTop: "3%",
        //paddingBottom: "3%"
        //margin: "1%"
        //textAlign: "left"
    },
    fontcolor: {
        color: "white"
    },
    icon: {
        margin: theme.spacing.unit * 1
    },
    image: {
        height: 100,
        width: 200,
        paddingBottom: 30,
        paddingTop: 10,
        [theme.breakpoints.between("xs", "sm")]: {
            height: theme.spacing.unit * 15,
            width: theme.spacing.unit * 15
        },
        [theme.breakpoints.down("xs")]: {
            height: theme.spacing.unit * 20,
            width: theme.spacing.unit * 40
        }
    },
    copyright: {
        color: "white",
        textAlign: "center",
        padding: ".5% 0"
    },
    gridClass: {
        padding: "1%  10% 0 10%",
        [theme.breakpoints.down("sm")]: {
            //marginRight: theme.spacing.unit * 1,
            padding: "3%"
        }
    },
    margins: {
        padding: "0 1%"
    },
    linkStyle: {
        color: "white",
        //textDecoration: "none",
        paddingBottom: "6%"
    },
    mobileStyle: {
        [theme.breakpoints.down("xs")]: {
            paddingTop: "4%"
        }
    },
    IconButton: {
        margin: "0",
        padding: "0"
    },
    tabStyle: {
        color: "white",
        // [theme.breakpoints.down("md")]: {
        //     textAlign: "right"
        // },
        // [theme.breakpoints.down("xs")]: {
        //     textAlign: "left"
        // },
        [theme.breakpoints.between("xs", "sm")]: {
            //paddingRight: "2%",
            //paddingLeft: "2%"
        }
    },
    addressStyle: {
        color: "white",
        paddingTop: "2%"
    },
    alignRightStyle: {
        color: "white",
        textAlign: "right"
    },
    alignCenterStyle: {
        color: "white",
        textAlign: "center"
    },
    contactStyle: {
        paddingLeft: "20%",
        [theme.breakpoints.between("650px", "600px")]: {
            paddingLeft: 0
        }
    },
    sideStyle: {
        [theme.breakpoints.up("xs")]: {
            paddingLeft: "6%"
        },
        [theme.breakpoints.down("xs")]: {
            paddingLeft: "0%"
        }
    }
});

class Footer extends Component {
    handleGetCatalog = () => {};
    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <Grid container className={classes.gridClass}>
                    <Grid item sm={3} xs={12}>
                        <Map />
                    </Grid>
                    <Grid item sm={9} xs={12} className={classes.mobileStyle}>
                        <Grid container className={classes.sideStyle}>
                            <Grid
                                item
                                sm={5}
                                xs={8}
                                className={classes.tabStyle}
                            >
                                <Typography className={classes.textcolor}>
                                    Help Line:
                                </Typography>

                                <Typography className={classes.textcolor}>
                                    E-mail :{" "}
                                    <a
                                        href="https://www.facebook.com"
                                        
                                        className={classes.linkStyle}
                                    >
                                        info@biggo.com.bd
                                    </a>
                                </Typography>

                                <Typography className={classes.addressStyle}>
                                    Suit#D 1501-1502, Al Razi Complex (Level 15)
                                    161-167,Shaheed Syed Nazrul Islam Sarani
                                    Purana Paltan,Dhaka-100,Bangladesh
                                </Typography>
                                <br />
                            </Grid>
                            <Grid item sm={3} xs={4}>
                                <Typography className={classes.alignRightStyle}>
                                    <a
                                        href="https://www.facebook.com"
                                        
                                        className={classes.linkStyle}
                                    >
                                        About Us
                                    </a>
                                    <br />
                                    <a
                                        href="https://www.facebook.com"
                                        
                                        className={classes.linkStyle}
                                    >
                                        Contact Us
                                    </a>
                                    <br />
                                    <a
                                        href="https://www.facebook.com"
                                        
                                        className={classes.linkStyle}
                                    >
                                        Privacy Policy
                                    </a>
                                    <br />
                                    <a
                                        href="https://www.facebook.com"
                                        
                                        className={classes.linkStyle}
                                    >
                                        Social Media
                                    </a>
                                    <br />
                                    <Button
                                        variant="contained"
                                        className={classes.button}
                                        onClick={this.handleGetCatalog}
                                    >
                                        Get the Catalog
                                    </Button>
                                </Typography>
                            </Grid>
                            <Grid
                                item
                                sm={4}
                                xs={12}
                                className={classes.alignCenterStyle}
                            >
                                <Typography
                                    className={classes.textcolor}
                                    //style={{ marginLeft: "20%" }}
                                >
                                    Stay in Touch
                                </Typography>
                                <Hidden only={["sm", "lg", "md", "xl"]}>
                                    <Grid
                                        item
                                        xs={12}
                                        //className={classes.alignCenterStyle}
                                    >
                                        <Tooltip
                                            title="Facebook For BigPrint"
                                            placement="bottom-start"
                                        >
                                            <IconButton
                                                aria-label="facebook"
                                                className={classes.IconButton}
                                            >
                                                <a
                                                    href="https://www.facebook.com"
                                                    
                                                >
                                                    <i
                                                        className={classNames(
                                                            classes.icon,
                                                            "fab fa-facebook"
                                                        )}
                                                        style={{
                                                            color: "#3b5998"
                                                        }}
                                                    />
                                                </a>
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip
                                            title="Google For BigPrint"
                                            placement="bottom-start"
                                        >
                                            <IconButton
                                                aria-label="google"
                                                className={classes.IconButton}
                                            >
                                                <a
                                                    href="https://www.google.com"
                                                    
                                                >
                                                    <i
                                                        className={classNames(
                                                            classes.icon,
                                                            "fab fa-google-plus-square"
                                                        )}
                                                        style={{
                                                            color: "#dd4b39"
                                                        }}
                                                    />
                                                </a>
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip
                                            title="Youtube For BigPrint"
                                            placement="bottom-start"
                                        >
                                            <IconButton
                                                aria-label="youtube"
                                                className={classes.IconButton}
                                            >
                                                <a
                                                    href="https://www.youtube.com"
                                                    
                                                >
                                                    <i
                                                        className={classNames(
                                                            classes.icon,
                                                            "fab fa-youtube"
                                                        )}
                                                        style={{
                                                            color: "#e52d27"
                                                        }}
                                                    />
                                                </a>
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip
                                            title="Instagram For BigPrint"
                                            placement="bottom-start"
                                        >
                                            <IconButton
                                                aria-label="instagram"
                                                className={classes.IconButton}
                                            >
                                                <a
                                                    href="https://www.instagram.com"
                                                    
                                                >
                                                    <i
                                                        className={classNames(
                                                            classes.icon,
                                                            "fab fa-instagram"
                                                        )}
                                                        style={{
                                                            color: "#3f729b"
                                                        }}
                                                    />
                                                </a>
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip
                                            title="Twitter For BigPrint"
                                            placement="bottom-start"
                                        >
                                            <IconButton
                                                aria-label="twitter"
                                                className={classes.IconButton}
                                            >
                                                <a
                                                    href="https://www.twitter.com"
                                                    
                                                >
                                                    <i
                                                        className={classNames(
                                                            classes.icon,
                                                            "fab fa-twitter"
                                                        )}
                                                        style={{
                                                            color: "#55acee"
                                                        }}
                                                    />
                                                </a>
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip
                                            title="LinkedIn For BigPrint"
                                            placement="bottom-start"
                                        >
                                            <IconButton
                                                aria-label="linkedin"
                                                className={classes.IconButton}
                                            >
                                                <a
                                                    href="https://www.linkedin.com"
                                                    
                                                >
                                                    <i
                                                        className={classNames(
                                                            classes.icon,
                                                            "fab fa-linkedin-in"
                                                        )}
                                                        style={{
                                                            color: "#0976b4"
                                                        }}
                                                    />
                                                </a>
                                            </IconButton>
                                        </Tooltip>
                                    </Grid>
                                </Hidden>
                                <Hidden only={"xs"}>
                                    <Grid>
                                        <Grid
                                            item
                                            sm={12}

                                            //className={classes.alignCenterStyle}
                                        >
                                            <Tooltip
                                                title="Facebook For BigPrint"
                                                placement="bottom-start"
                                            >
                                                <IconButton
                                                    aria-label="facebook"
                                                    className={
                                                        classes.IconButton
                                                    }
                                                >
                                                    <a
                                                        href="https://www.facebook.com"
                                                        
                                                    >
                                                        <i
                                                            className={classNames(
                                                                classes.icon,
                                                                "fab fa-facebook"
                                                            )}
                                                            style={{
                                                                color: "#3b5998"
                                                            }}
                                                        />
                                                    </a>
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip
                                                title="Google For BigPrint"
                                                placement="bottom-start"
                                            >
                                                <IconButton
                                                    aria-label="google"
                                                    className={
                                                        classes.IconButton
                                                    }
                                                >
                                                    <a
                                                        href="https://www.google.com"
                                                        
                                                    >
                                                        <i
                                                            className={classNames(
                                                                classes.icon,
                                                                "fab fa-google-plus-square"
                                                            )}
                                                            style={{
                                                                color: "#dd4b39"
                                                            }}
                                                        />
                                                    </a>
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip
                                                title="Youtube For BigPrint"
                                                placement="bottom-start"
                                            >
                                                <IconButton
                                                    aria-label="youtube"
                                                    className={
                                                        classes.IconButton
                                                    }
                                                >
                                                    <a
                                                        href="https://www.youtube.com"
                                                        
                                                    >
                                                        <i
                                                            className={classNames(
                                                                classes.icon,
                                                                "fab fa-youtube"
                                                            )}
                                                            style={{
                                                                color: "#e52d27"
                                                            }}
                                                        />
                                                    </a>
                                                </IconButton>
                                            </Tooltip>
                                        </Grid>
                                        <Grid item sm={12} xs={6}>
                                            <Tooltip
                                                title="Instagram For BigPrint"
                                                placement="bottom-start"
                                            >
                                                <IconButton
                                                    aria-label="instagram"
                                                    className={
                                                        classes.IconButton
                                                    }
                                                >
                                                    <a
                                                        href="https://www.instagram.com"
                                                        
                                                    >
                                                        <i
                                                            className={classNames(
                                                                classes.icon,
                                                                "fab fa-instagram"
                                                            )}
                                                            style={{
                                                                color: "#3f729b"
                                                            }}
                                                        />
                                                    </a>
                                                </IconButton>
                                            </Tooltip>

                                            <Tooltip
                                                title="Twitter For BigPrint"
                                                placement="bottom-start"
                                            >
                                                <IconButton
                                                    aria-label="twitter"
                                                    className={
                                                        classes.IconButton
                                                    }
                                                >
                                                    <a
                                                        href="https://www.twitter.com"
                                                        
                                                    >
                                                        <i
                                                            className={classNames(
                                                                classes.icon,
                                                                "fab fa-twitter"
                                                            )}
                                                            style={{
                                                                color: "#55acee"
                                                            }}
                                                        />
                                                    </a>
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip
                                                title="LinkedIn For BigPrint"
                                                placement="bottom-start"
                                            >
                                                <IconButton
                                                    aria-label="linkedin"
                                                    className={
                                                        classes.IconButton
                                                    }
                                                >
                                                    <a
                                                        href="https://www.linkedin.com"
                                                        
                                                    >
                                                        <i
                                                            className={classNames(
                                                                classes.icon,
                                                                "fab fa-linkedin-in"
                                                            )}
                                                            style={{
                                                                color: "#0976b4"
                                                            }}
                                                        />
                                                    </a>
                                                </IconButton>
                                            </Tooltip>
                                        </Grid>
                                    </Grid>
                                </Hidden>
                            </Grid>
                        </Grid>
                        <Divider
                            style={{
                                backgroundColor: "white",
                                marginTop: "1%"
                            }}
                        />
                        <Typography className={classes.copyright}>
                            @Copyright Bigprint 2018
                        </Typography>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

Footer.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Footer);
