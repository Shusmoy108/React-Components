import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import TabElements from "./TabElements";
import Logo from "../../../assets/logo.png";

import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
const drawerWidth = 300;

const styles = theme => ({
    root: {
        display: "block"
    },
    tabStyle: {
        display: "block",
        maxWidth: 100,
        minWidth: 100,
        textTransform: "none",
        fontSize: 13
    },
    menuButton: {
        // marginLeft: 12,
        // marginRight: 20
        margin: 0,
        padding: 0,
        marginRight: 10
    },
    hide: {
        display: "none"
    },
    drawer: {
        width: drawerWidth
        //flexShrink: 0
    },
    drawerPaper: {
        width: drawerWidth
    },
    drawerHeader: {
        //display: "flex",
        alignItems: "center",
        //padding: "0 8px",
        ...theme.mixins.toolbar
        //justifyContent: "flex-end"
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        marginTop: 0,
        width: 150,
        alignItems: "center"
    },
    tabSelect: {
        transition: "0.1s",
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white
    }
});

class PersistentDrawerLeft extends React.Component {
    state = {
        value: 0,
        open: false
    };

    toggleDrawer = (side, open) => () => {
        this.setState({
            [side]: open
        });
    };
    handleSearchChange = e => {
        this.setState({ searchValue: e.target.value });
    };
    handleChange = (event, value) => {
        this.setState({ value });
    };
    handleDrawerOpen = () => {
        this.setState({ open: true });
    };

    handleDrawerClose = () => {
        this.setState({ open: false });
    };

    render() {
        const { classes, categorizedProducts } = this.props;
        const { open, value } = this.state;

        return (
            <div className={classes.root} onMouseLeave={this.handleDrawerClose}>
                <CssBaseline />

                <IconButton
                    style={{ borderRadius: "0" }}
                    color="inherit"
                    aria-label="Open drawer"
                    onClick={this.handleDrawerOpen}
                    className={classNames(classes.menuButton, open && classes.hide)}
                >
                    <MenuIcon />
                </IconButton>

                <SwipeableDrawer
                    open={this.state.open}
                    onClose={this.handleDrawerClose}
                    onOpen={this.handleDrawerOpen}
                >
                    <Tabs
                        value={this.state.value}
                        onChange={this.handleChange}
                        fullWidth
                        indicatorColor="primary"
                        style={{ textTransform: "none" }}
                    >
                        {categorizedProducts.map((item, contentIndex) => {
                            return (
                                <Tab
                                    className={classes.tabStyle}
                                    label={item._id}
                                    classes={{ selected: classes.tabSelect }}
                                    key={contentIndex}
                                />
                            );
                        })}
                    </Tabs>
                    {categorizedProducts.length && (
                        <TabElements data={categorizedProducts[value].products} />
                    )}
                </SwipeableDrawer>

            </div>
        );
    }
}

PersistentDrawerLeft.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(PersistentDrawerLeft);
