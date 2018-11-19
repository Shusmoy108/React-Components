import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import CircularProgress from "@material-ui/core/CircularProgress";
import SwipeableViews from "react-swipeable-views";

import { OrderConsumer } from "contexts/orderContext";
import Pending from "./Pending";
import Design from "./Design";
import Production from "./Production";
import Delivery from "./Delivery";
import Delivered from "./Delivered";
import Search from "./Search";

const styles = theme => ({
    loading: {
        alignItems: "center",
        display: "flex",
        justifyContent: "center",
        height: 500
    }
});

function TabContainer({ children, dir }) {
    return (
        <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
            {children}
        </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
    dir: PropTypes.string.isRequired
};

class Orders extends Component {
    state = {
        value: 0,
        status: "pending"
    };
    componentDidMount() {
        window.comp = this;
    }

    handleChange = (event, value) => {
        this.props.resetCollapse();
        let nextStatus = "";
        if (value === 0) nextStatus = "Pending";
        else if (value === 1) nextStatus = "In-Design";
        else if (value === 2) nextStatus = "In-Production";
        else if (value === 3) nextStatus = "In-Delivery";
        else if (value === 4) nextStatus = "Delivered";
        else nextStatus = "Search";

        this.setState({
            value: value,
            status: nextStatus
        });
        this.props.changeDeliveryStatus(nextStatus);
    };

    handleChangeIndex = index => {
        this.setState({ value: index });
    };

    render() {
        const { classes, theme, loading } = this.props;
        let load;
        if (loading)
            load = (
                <div className={classes.loading}>
                    <CircularProgress size={55} thickness={3} />
                </div>
            );
        else
            load = (
                <SwipeableViews
                    axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                    index={this.state.value}
                    onChangeIndex={this.handleChangeIndex}
                >
                    <TabContainer dir={theme.direction}>
                        {this.state.value === 0 && <Pending />}
                    </TabContainer>
                    <TabContainer dir={theme.direction}>
                        {this.state.value === 1 && <Design />}
                    </TabContainer>
                    <TabContainer dir={theme.direction}>
                        {this.state.value === 2 && <Production />}
                    </TabContainer>
                    <TabContainer dir={theme.direction}>
                        {this.state.value === 3 && <Delivery />}
                    </TabContainer>
                    <TabContainer dir={theme.direction}>
                        {this.state.value === 4 && <Delivered />}
                    </TabContainer>
                    <TabContainer dir={theme.direction}>
                        {this.state.value === 5 && <Search />}
                    </TabContainer>
                </SwipeableViews>
            );
        return (
            <div>
                <Paper className={classes.root}>
                    <Tabs
                        value={this.state.value}
                        onChange={this.handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        fullWidth
                    >
                        <Tab label="Pending" />
                        <Tab label="In Design" />
                        <Tab label="In Production" />
                        <Tab label="In Delivery" />
                        <Tab label="Delivered" />
                        <Tab label="Search" />
                    </Tabs>
                </Paper>
                {load}
            </div>
        );
    }
}

Orders.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired
    // open: PropTypes.bool.isRequired,
    // func: PropTypes.func.isRequired
};

const consumerComponent = props => (
    <OrderConsumer>
        {({
            open,
            func,
            loading,
            expanded,
            changeDeliveryStatus,
            resetCollapse
        }) => {
            let data = {
                ...props,
                func,
                open,
                expanded,
                changeDeliveryStatus,
                resetCollapse,
                loading
            };
            return <Orders {...data} />;
        }}
    </OrderConsumer>
);

export default withStyles(styles, { withTheme: true })(consumerComponent);
