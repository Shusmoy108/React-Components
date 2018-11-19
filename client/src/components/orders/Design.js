import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableFooter from "@material-ui/core/TableFooter";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import IconButton from "@material-ui/core/IconButton";
import Collapse from "@material-ui/core/Collapse";
import Pagination from "./Pagination";
import classnames from "classnames";

import { TableStyles } from "./Styles";
import { OrderConsumer } from "contexts/orderContext";
import Card from "./Card";
import { AuthConsumer } from "contexts/authContext";
import CardItem from "./CardItem";

const CustomTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white
    },
    body: {
        fontSize: 14
    }
}))(TableCell);

class Design extends Component {
    render() {
        const {
            classes,
            handleExpandClick,
            handleActionClick,
            inDesignOrders,
            lockedInDesignOrders,
            admin,
            handleLockOrder,
            handleUnlockOrder,
            expanded,
            confirmInDesign
        } = this.props;
        let tableItems = [...lockedInDesignOrders, ...inDesignOrders];
        return (
            <div>
                <Paper className={classes.root}>
                    <div className={classes.tableWrapper}>
                        <Table className={classes.table}>
                            <TableHead>
                                <TableRow>
                                    <CustomTableCell>
                                        Order Info
                                    </CustomTableCell>
                                    <CustomTableCell>Items</CustomTableCell>
                                    <CustomTableCell>Total</CustomTableCell>
                                    <CustomTableCell>
                                        Delivery Info
                                    </CustomTableCell>
                                    <CustomTableCell>Options</CustomTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {tableItems.map((row, i) => {
                                    let cardItems = row.items.map(
                                        (template, k) => (
                                            <TableRow
                                                key={k}
                                                className={classes.tableRow}
                                            >
                                                <CardItem
                                                    template={template}
                                                    id={i}
                                                />
                                                <TableCell colSpan="1">
                                                    <Collapse
                                                        in={expanded[i]}
                                                        timeout="auto"
                                                        unmountOnExit
                                                    >
                                                        <div
                                                            className={
                                                                classes.option
                                                            }
                                                        >
                                                            <Button
                                                                variant="outlined"
                                                                onClick={() =>
                                                                    handleActionClick(
                                                                        row._id
                                                                    )
                                                                }
                                                                disabled={
                                                                    !row.lock ||
                                                                    row.adminId !==
                                                                        admin.id
                                                                }
                                                                className={
                                                                    classes.button
                                                                }
                                                                color="primary"
                                                            >
                                                                Upload
                                                            </Button>
                                                            <Button
                                                                variant="outlined"
                                                                disabled={
                                                                    !row.lock ||
                                                                    row.adminId !==
                                                                        admin.id
                                                                }
                                                                onClick={() =>
                                                                    handleActionClick(
                                                                        row._id
                                                                    )
                                                                }
                                                                className={
                                                                    classes.button
                                                                }
                                                                color="primary"
                                                            >
                                                                Preview
                                                            </Button>
                                                        </div>
                                                    </Collapse>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    );

                                    return (
                                        <React.Fragment key={i}>
                                            <TableRow className={classes.row}>
                                                <Card row={row} />
                                                <TableCell>
                                                    <div
                                                        className={
                                                            classes.option
                                                        }
                                                    >
                                                        <Button
                                                            variant="outlined"
                                                            onClick={() => {
                                                                row.adminId ===
                                                                admin.id
                                                                    ? handleUnlockOrder(
                                                                          row.orderId
                                                                      )
                                                                    : handleLockOrder(
                                                                          row.orderId
                                                                      );
                                                            }}
                                                            className={
                                                                classes.button
                                                            }
                                                            disabled={
                                                                row.lock &&
                                                                row.adminId !==
                                                                    admin.id
                                                            }
                                                            color="primary"
                                                        >
                                                            {row.adminId ===
                                                            admin.id
                                                                ? "Unlock"
                                                                : row.lock
                                                                ? "Locked"
                                                                : "Lock"}
                                                        </Button>
                                                        <Button
                                                            variant="outlined"
                                                            onClick={() =>
                                                                // handleLockClick(
                                                                //     row._id
                                                                // )
                                                                console.log(
                                                                    "Loading..."
                                                                )
                                                            }
                                                            className={
                                                                classes.button
                                                            }
                                                            disabled={
                                                                !row.lock ||
                                                                row.adminId !==
                                                                    admin.id
                                                            }
                                                            color="primary"
                                                        >
                                                            Download
                                                        </Button>
                                                        <Button
                                                            variant="outlined"
                                                            onClick={() =>
                                                                confirmInDesign(
                                                                    row.orderId
                                                                )
                                                            }
                                                            className={
                                                                classes.button
                                                            }
                                                            disabled={
                                                                !row.lock ||
                                                                row.adminId !==
                                                                    admin.id
                                                            }
                                                            color="primary"
                                                        >
                                                            Confirm
                                                        </Button>
                                                        <IconButton
                                                            // disabled={row.adminId === admin.adminId ? false : true}
                                                            className={classnames(
                                                                classes.expand,
                                                                {
                                                                    [classes.expandOpen]:
                                                                        expanded[
                                                                            i
                                                                        ]
                                                                }
                                                            )}
                                                            onClick={() =>
                                                                handleExpandClick(
                                                                    i
                                                                )
                                                            }
                                                            aria-expanded={
                                                                expanded[i]
                                                            }
                                                            aria-label="Show more"
                                                            color="primary"
                                                        >
                                                            <ExpandMoreIcon />
                                                        </IconButton>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                            {/* {row.adminId ===
                                                admin.adminId && cardItems} */}
                                            {cardItems}
                                        </React.Fragment>
                                    );
                                })}
                            </TableBody>
                            <TableFooter />
                        </Table>
                    </div>
                </Paper>
                <Pagination />
            </div>
        );
    }
}

const consumerComponent = (props) => (
    <AuthConsumer>
        {({ admin }) => (
            <OrderConsumer>
                {({
                    handleLockOrder,
                    handleUnlockOrder,
                    expanded,
                    handleExpandClick,
                    handleActionClick,
                    inDesignOrders,
                    lockedInDesignOrders,
                    confirmInDesign
                }) => {
                    let data = {
                        handleLockOrder,
                        handleUnlockOrder,
                        expanded,
                        handleExpandClick,
                        handleActionClick,
                        inDesignOrders,
                        lockedInDesignOrders,
                        confirmInDesign,
                        ...props,
                        admin
                    };
                    return <Design {...data} />;
                }}
            </OrderConsumer>
        )}
    </AuthConsumer>
);

export default withStyles(TableStyles, { withTheme: true })(consumerComponent);
