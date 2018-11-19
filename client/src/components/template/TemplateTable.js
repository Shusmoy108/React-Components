import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";

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
class TemplateTable extends React.Component {
    render() {
        const { classes, products } = this.props;

        return (
            <Paper className={classes.root}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <CustomTableCell style={{ textAlign: "center" }}>
                                Product Name
                            </CustomTableCell>
                            <CustomTableCell style={{ textAlign: "center" }}>
                                Description
                            </CustomTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map((product, i) => {
                            let link = "/" + product;
                            return (
                                <TableRow className={classes.row} key={i}>
                                    <CustomTableCell component="th" scope="row">
                                        <Button
                                            style={{ width: "100%" }}
                                            component={Link}
                                            to={link}
                                        >
                                            {product}
                                        </Button>
                                    </CustomTableCell>

                                    <CustomTableCell
                                        component="th"
                                        scope="row"
                                        style={{ textAlign: "center" }}
                                    >
                                        {product}
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

TemplateTable.propTypes = {
    classes: PropTypes.object.isRequired,
    products: PropTypes.array.isRequired
};

export default withStyles(styles)(TemplateTable);
