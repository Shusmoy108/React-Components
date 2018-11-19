import React, { Component } from "react";
import { getAllCarts } from "../../axiosLib/cartAxios";
import CartTable from "./CartTable";

import Button from "@material-ui/core/Button";
import FormHelperText from "@material-ui/core/FormHelperText";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import CircularProgress from "@material-ui/core/CircularProgress";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
    root: {
        margin: theme.spacing.unit * 10
    },
    table: {
        minWidth: 700
    },
    searchItem: {
        display: "flex",
        margin: "2% 2%"
    },
    row: {
        "&:nth-of-type(odd)": {
            backgroundColor: theme.palette.background.default
        }
    },
    pagination: {
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        marginBottom: "5%"
    },
    arrowButton: {
        margin: "0 3%"
    }
});

class CartPage extends Component {
    state = {
        page: 1,
        carts: [],
        prevLoading: "loaded",
        nextLoading: "loaded",
        loading: "loading",
        glbErr: "",
        prev: true,
        next: true
    };

    handlePrev = () => {
        let page = this.state.page;
        if (page > 1) {
            page--;
        }
        if (page === 1) {
            this.setState({ prev: true });
        }
        this.setState({ prevLoading: "loading" }, () => {
            let that = this;
            getAllCarts(page, (err, data) => {
                if (!err) {
                    that.setState({
                        carts: data,
                        prevLoading: "loaded",
                        page: page,
                        next: false,
                        glbErr: ""
                    });
                }
            });
        });
    };

    handleNext = () => {
        let page = this.state.page;
        page++;
        this.setState({ nextLoading: "loading" }, () => {
            let that = this;
            getAllCarts(page, (err, data) => {
                if (!err) {
                    that.setState({
                        carts: data,
                        page: page,
                        nextLoading: "loaded",
                        prev: false,
                        glbErr: ""
                    });
                    if (data.length < 30) {
                        that.setState({ next: true, glbErr: "No more data" });
                    }
                } else {
                    that.setState({
                        nextLoading: "loaded",
                        glbErr: "No more Data",
                        next: true
                    });
                }
            });
        });
    };

    componentDidMount() {
        getAllCarts(this.state.page, (err, data) => {
            let that = this;
            if (!err) {
                that.setState({
                    carts: data,
                    prev: true,
                    glbErr: "",
                    next: false,
                    loading: "loaded"
                });
                if (data.length < 30) {
                    that.setState({ next: true });
                }
            }
        });
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <CartTable data={this.state.carts} />
                <div className={classes.pagination}>
                    {this.state.prevLoading === "loading" && (
                        <div className={classes.SearchIcon}>
                            <CircularProgress color="primary" />
                        </div>
                    )}
                    <Button
                        className={classes.arrowButton}
                        onClick={this.handlePrev}
                        disabled={this.state.prev}
                    >
                        <KeyboardArrowLeft />
                        Previous
                    </Button>
                    <FormHelperText
                        id="component-error-text"
                        style={{
                            color: "primary",
                            marginTop: 8,
                            fontSize: 20
                        }}
                    >
                        {this.state.page}
                    </FormHelperText>
                    <Button
                        className={classes.arrowButton}
                        onClick={this.handleNext}
                        disabled={this.state.next}
                    >
                        Next
                        <KeyboardArrowRight />
                    </Button>
                    {this.state.nextLoading === "loading" && (
                        <div className={classes.SearchIcon}>
                            <CircularProgress color="primary" />
                        </div>
                    )}
                    <FormHelperText
                        id="component-error-text"
                        style={{ color: "red", marginTop: 8, fontSize: 20 }}
                    >
                        {this.state.glbErr}
                    </FormHelperText>
                </div>
            </div>
        );
    }
}

CartPage.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CartPage);
