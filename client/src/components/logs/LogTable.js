import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import moment from "moment";
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
    row: {
        "&:nth-of-type(odd)": {
            backgroundColor: theme.palette.background.default
        }
    }
});
class LogTable extends React.Component {
    render() {
        const { classes, logs } = this.props;

        return (
            <Paper className={classes.root}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <CustomTableCell>Admin Username</CustomTableCell>
                            <CustomTableCell>Description</CustomTableCell>
                            <CustomTableCell>Type</CustomTableCell>
                            <CustomTableCell>Table Name</CustomTableCell>
                            <CustomTableCell>Date</CustomTableCell>
                            <CustomTableCell>From</CustomTableCell>
                            <CustomTableCell>To</CustomTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {logs.map(log => {
                            return (
                                <TableRow className={classes.row} key={log._id}>
                                    <CustomTableCell component="th" scope="row">
                                        {log.adminUsername}
                                    </CustomTableCell>
                                    <CustomTableCell component="th" scope="row">
                                        {log.description}
                                    </CustomTableCell>
                                    <CustomTableCell component="th" scope="row">
                                        {log.type}
                                    </CustomTableCell>

                                    <CustomTableCell component="th" scope="row">
                                        {log.tableModel}
                                    </CustomTableCell>
                                    <CustomTableCell component="th" scope="row">
                                        {moment(
                                            new Date(
                                                log.createdAt
                                            ).toDateString()
                                        ).format("DD-MM-YYYY")}
                                        {/* {new Date(log.createdAt).toDateString()} */}
                                    </CustomTableCell>
                                    <CustomTableCell component="th" scope="row">
                                        {log.from}
                                    </CustomTableCell>
                                    <CustomTableCell component="th" scope="row">
                                        {log.to}
                                    </CustomTableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </Paper>
        );
    }
}

LogTable.propTypes = {
    classes: PropTypes.object.isRequired,
    logs: PropTypes.array.isRequired
};

export default withStyles(styles)(LogTable);
