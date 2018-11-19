import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import NextIcon from "@material-ui/icons/NavigateNextTwoTone";
import BackIcon from "@material-ui/icons/NavigateBeforeTwoTone";
import IconButton from "@material-ui/core/IconButton";
import { Typography } from "@material-ui/core";

import { PaginationStyles } from "./Styles";
import { OrderConsumer } from "contexts/orderContext";

class Pagination extends Component {
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <IconButton
                    // className={classes.Button}
                    // onClick={() => handleExpandClick(i)}
                    color="primary"
                    className={classes.margin}
                >
                    <BackIcon />
                </IconButton>
                <Typography
                    variant="body2"
                    className={classes.margin}
                    color="primary"
                >
                    <b>1</b>
                </Typography>
                <IconButton
                    // className={classes.Button}
                    // onClick={() => handleExpandClick(i)}
                    color="primary"
                    className={classes.margin}
                >
                    <NextIcon />
                </IconButton>
            </div>
        );
    }
}

const consumerComponent = props => (
    <OrderConsumer>
        {({ handleLockClick }) => {
            let data = {
                ...props,
                handleLockClick
            };
            return <Pagination {...data} />;
        }}
    </OrderConsumer>
);

export default withStyles(PaginationStyles, { withTheme: true })(
    consumerComponent
);
