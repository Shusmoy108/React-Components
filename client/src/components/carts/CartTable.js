import React from "react";

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

const CustomTableCell = withStyles(theme => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white
    },
    body: {
        fontSize: 14
    }
}))(TableCell);

const styles = theme => ({
    root: {
        width: "100%",
        marginTop: theme.spacing.unit * 3,
        overflowX: "auto"
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
    },
    button: {
        marginLeft: theme.spacing.unit * 3
    }
});

const CartTable = props => {
    const { classes, data } = props;
    let total = cartItems => {
        return cartItems.length === 0
            ? 0
            : cartItems
                .map(
                    elem => elem.templateId ?
                        elem.total -
                        elem.total * (elem.templateId.offerPercentage / 100) : 0
                )
                .reduce((a, c) => a + c);
    };
    return (
        <div>
            {" "}
            <Paper className={classes.root}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <CustomTableCell>User</CustomTableCell>
                            <CustomTableCell>Templates</CustomTableCell>
                            <CustomTableCell>Total</CustomTableCell>
                            <CustomTableCell numeric>Actions</CustomTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row, i) => {
                            return (
                                <TableRow className={classes.row} key={i}>
                                    <CustomTableCell component="th" scope="row">
                                        <p>Name: {row.userId.name}</p>
                                        <p>Phone: {row.userId.phone}</p>
                                        <p>Email: {row.userId.email}</p>
                                    </CustomTableCell>
                                    <CustomTableCell>
                                        {row.cartItems.map((cart, i) => {
                                            return cart.templateId && 
                                            (
                                                <div
                                                    style={{ display: "flex" }}
                                                    key={i}
                                                >
                                                    <img
                                                        src={`/images/${cart.templateId.itemPicture}`}
                                                        alt="item"
                                                        style={{
                                                            height: 70,
                                                            width: 70,
                                                            marginTop: 12
                                                        }}
                                                    />
                                                    <div
                                                        style={{
                                                            display: "flex",
                                                            flexFlow: "column",
                                                            marginLeft: 5
                                                        }}
                                                    >
                                                        <div
                                                            style={{
                                                                display: "flex",
                                                                maxHeight: 25
                                                            }}
                                                        >
                                                            <p
                                                                style={{
                                                                    minWidth: 250
                                                                }}
                                                            >
                                                                {
                                                                    cart.templateName
                                                                }
                                                            </p>
                                                            <p>{cart.total} tk</p>
                                                        </div>
                                                        <div
                                                            style={{
                                                                display: "flex",
                                                                flexFlow:
                                                                    "column"
                                                            }}
                                                        >
                                                            <div style={{ display: "flex", maxHeight: 25 }}>
                                                                <p style={{ minWidth: 250 }}>
                                                                    {
                                                                        cart
                                                                            .templateId
                                                                            .productName
                                                                    }
                                                                </p>
                                                                {cart.templateId.offerAvailable ? (
                                                                    <p>
                                                                        {
                                                                            cart.templateId.offerPercentage
                                                                        }{" "}
                                                                        %
                                                                </p>
                                                                ) : " "}
                                                            </div>
                                                            <div style={{ display: "flex", maxHeight: 25 }}>
                                                                <p
                                                                    style={{
                                                                        minWidth: 250
                                                                    }}
                                                                >
                                                                    {cart.quantity}
                                                                </p>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </CustomTableCell>
                                    <CustomTableCell>
                                        <p>{total(row.cartItems)} tk</p>
                                    </CustomTableCell>
                                    <CustomTableCell numeric>
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                        >
                                            Add to Order
                                        </Button>
                                    </CustomTableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </Paper>
        </div>
    );
};

CartTable.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CartTable);
