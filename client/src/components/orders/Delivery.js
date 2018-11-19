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
import Pagination from "./Pagination";
import classnames from "classnames";

import { TableStyles } from "./Styles";
import { AuthConsumer } from "contexts/authContext";
import { OrderConsumer } from "contexts/orderContext";
import Card from "./Card";
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

class Delivery extends Component {
    render() {
        const {
            classes,
            handleLockOrder,
            handleUnlockOrder,
            expanded,
            handleExpandClick,
            handleActionClick,
            inDeliveryOrders,
            deleteFullOrder,
            lockedInDeliveryOrders,
            confirmInDelivery,
            admin
        } = this.props;
        let tableItems = [...lockedInDeliveryOrders, ...inDeliveryOrders];
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
                                                <TableCell colSpan="1" />
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
                                                                confirmInDelivery(
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
                                                        <Button
                                                            variant="outlined"
                                                            // onClick={() =>
                                                            //     handleLockClick(
                                                            //         row._id
                                                            //     )
                                                            // }
                                                            className={
                                                                classes.button
                                                            }
                                                            disabled={row.lock}
                                                            color="primary"
                                                        >
                                                            Print
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
                    inDeliveryOrders,
                    deleteFullOrder,
                    lockedInDeliveryOrders,
                    confirmInDelivery
                }) => {
                    let data = {
                        handleLockOrder,
                        handleUnlockOrder,
                        expanded,
                        handleExpandClick,
                        handleActionClick,
                        inDeliveryOrders,
                        deleteFullOrder,
                        lockedInDeliveryOrders,
                        confirmInDelivery,
                        ...props,
                        admin
                    };
                    return <Delivery {...data} />;
                }}
            </OrderConsumer>
        )}
    </AuthConsumer>
);

export default withStyles(TableStyles, { withTheme: true })(consumerComponent);
