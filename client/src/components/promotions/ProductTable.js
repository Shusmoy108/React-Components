import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import Checkbox from "@material-ui/core/Checkbox";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Modal from "../dialogs/Modal";
import Button from "@material-ui/core/Button";
import EditProduct from "./EditProduct";
import productValidators from "../../validators/productValidators";
import { editOffer } from "../../axiosLib/promotionsAxios";

const actionsStyles = theme => ({
    root: {
        flexShrink: 0,
        color: theme.palette.text.secondary,
        marginLeft: theme.spacing.unit * 2.5
    }
});

class TablePaginationActions extends React.Component {
    handleFirstPageButtonClick = event => {
        this.props.onChangePage(event, 0);
    };

    handleBackButtonClick = event => {
        this.props.onChangePage(event, this.props.page - 1);
    };

    handleNextButtonClick = event => {
        this.props.onChangePage(event, this.props.page + 1);
    };

    handleLastPageButtonClick = event => {
        this.props.onChangePage(
            event,
            Math.max(
                0,
                Math.ceil(this.props.count / this.props.rowsPerPage) - 1
            )
        );
    };

    render() {
        const { classes, count, page, rowsPerPage, theme } = this.props;

        return (
            <div className={classes.root}>
                <IconButton
                    onClick={this.handleFirstPageButtonClick}
                    disabled={page === 0}
                    aria-label="First Page"
                >
                    {theme.direction === "rtl" ? (
                        <LastPageIcon />
                    ) : (
                        <FirstPageIcon />
                    )}
                </IconButton>
                <IconButton
                    onClick={this.handleBackButtonClick}
                    disabled={page === 0}
                    aria-label="Previous Page"
                >
                    {theme.direction === "rtl" ? (
                        <KeyboardArrowRight />
                    ) : (
                        <KeyboardArrowLeft />
                    )}
                </IconButton>
                <IconButton
                    onClick={this.handleNextButtonClick}
                    disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                    aria-label="Next Page"
                >
                    {theme.direction === "rtl" ? (
                        <KeyboardArrowLeft />
                    ) : (
                        <KeyboardArrowRight />
                    )}
                </IconButton>
                <IconButton
                    onClick={this.handleLastPageButtonClick}
                    disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                    aria-label="Last Page"
                >
                    {theme.direction === "rtl" ? (
                        <FirstPageIcon />
                    ) : (
                        <LastPageIcon />
                    )}
                </IconButton>
            </div>
        );
    }
}

TablePaginationActions.propTypes = {
    classes: PropTypes.object.isRequired,
    count: PropTypes.number.isRequired,
    onChangePage: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
    theme: PropTypes.object.isRequired
};

const TablePaginationActionsWrapped = withStyles(actionsStyles, {
    withTheme: true
})(TablePaginationActions);

const styles = theme => ({
    root: {
        margin: "5% 8%"
    },
    table: {
        minWidth: 500
    },
    tableWrapper: {
        overflowX: "auto"
    }
});
const CustomTableCell = withStyles(theme => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white
    },
    body: {
        fontSize: 14
    }
}))(TableCell);

class CustomPaginationActionsTable extends React.Component {
    constructor(props) {
        super(props);
        this.handleEditSubmit = this.handleEditSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    state = {
        id: "",
        page: 0,
        rowsPerPage: 5,
        modalbool: false,
        position: 0,
        editbool: false,
        name: "",
        offerAvailable: false,
        offerPercentage: "",
        profitMargin: 0,
        errors: {}
    };

    /// Edit button on Click
    handleEditOpen = (i, id) => {
        let offerPercentage;
        if (!this.props.products[i].offerAvailable) {
            offerPercentage = "";
        } else {
            offerPercentage = this.props.products[i].offerPercentage;
        }
        this.setState(
            {
                id: id,
                position: i,
                name: this.props.products[i].name,
                offerAvailable: this.props.products[i].offerAvailable,
                offerPercentage: offerPercentage,
                profitMargin: this.props.products[i].profitMargin
            },
            () => {
                this.setState({ editbool: true });
            }
        );
    };

    /// handle Offer Available on click
    handleOfferAvailable = () => {
        this.setState({ offerAvailable: !this.state.offerAvailable });
    };

    /// handle input Change
    handleInputChange = prop => event => {
        this.setState({ [prop]: event.target.value });
    };

    ///
    // handle edit on Submit
    ///
    handleEditSubmit() {
        let formData = this.state;
        if (!formData.offerAvailable) {
            formData.offerPercentage = "";
        }
        // console.log(this.state, "send");
        const {
            errors,
            isValid
        } = productValidators.updateProductDimensionsOnId(formData);

        //Check Validation
        if (!isValid) {
            this.setState({ errors: errors });
        } else {
            editOffer(formData, (err, data) => {
                let that = this;

                if (err) {
                    this.setState({ errors: err });
                } else {
                    that.handleClose();
                    that.props.handleProductsChange(
                        that.state.position,
                        data.updatedProduct
                    );
                    this.setState({ errors: {} });
                }
            });
        }
    }

    /// Delete icon On click
    handleDeleteOpen = (i, id) => {
        let offerPercentage;
        if (!this.props.products[i].offerAvailable) {
            offerPercentage = "";
        } else {
            offerPercentage = this.props.products[i].offerPercentage;
        }
        this.setState(
            {
                id: id,
                position: i,
                name: this.props.products[i].name,
                offerAvailable: this.props.products[i].offerAvailable,
                offerPercentage: offerPercentage,
                profitMargin: this.props.products[i].profitMargin
            },
            () => {
                this.setState({ modalbool: true });
            }
        );
    };

    ///
    // handle Delete on Submit
    ///
    handleDeleteSubmit = () => {
        let formData = this.state;
        formData.offerAvailable = false;
        formData.offerPercentage = "";

        editOffer(formData, (err, data) => {
            let that = this;

            if (err) {
                this.setState({ errors: err });
            } else {
                that.props.handleProductsChange(
                    that.state.position,
                    data.updatedProduct
                );
                this.setState({ errors: {} });
            }
            that.handleModalClose();
        });
    };

    handleClose = () => {
        this.setState({ editbool: false, errors: {} });
    };
    handleChangePage = (event, page) => {
        this.setState({ page });
    };

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };

    handleModalClose = () => {
        this.setState({ modalbool: false });
    };
    render() {
        const { classes } = this.props;
        const rows = this.props.products;
        const { rowsPerPage, page, editbool } = this.state;
        const emptyRows =
            rowsPerPage -
            Math.min(rowsPerPage, rows.length - page * rowsPerPage);
        let edit, modal;
        if (editbool) {
            edit = (
                <EditProduct
                    open={editbool}
                    handleClose={this.handleClose}
                    action={"Edit"}
                    name={this.state.name}
                    errors={this.state.errors}
                    profitMargin={this.state.profitMargin}
                    offerPercentage={this.state.offerPercentage}
                    offerAvailable={this.state.offerAvailable}
                    handleEditSubmit={this.handleEditSubmit}
                    handleInputChange={this.handleInputChange}
                    handleOfferAvailable={this.handleOfferAvailable}
                    handleDeleteSubmit={this.handleDeleteSubmit}
                />
            );
        }
        if (this.state.modalbool) {
            modal = (
                <Modal
                    open={this.state.modalbool}
                    handleYes={this.handleDeleteSubmit}
                    handleNo={this.handleModalClose}
                    action={"delete"}
                    name={
                        this.props.products[this.state.position].name +
                        "'s Offer"
                    }
                />
            );
        }
        return (
            <Paper className={classes.root}>
                {edit}
                {modal}
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <CustomTableCell component="th" scope="row">
                                Product Name
                            </CustomTableCell>
                            <CustomTableCell
                                component="th"
                                scope="row"
                                style={{ paddingLeft: 100 }}
                            >
                                Offer
                            </CustomTableCell>
                            <CustomTableCell component="th" scope="row">
                                Profit Margin
                            </CustomTableCell>
                            <CustomTableCell />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows
                            .slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                            )
                            .map((row, i) => {
                                let col;
                                if (row.offerAvailable) {
                                    col = (
                                        <CustomTableCell
                                            component="th"
                                            scope="row"
                                            style={{ paddingLeft: 80 }}
                                        >
                                            <Checkbox
                                                checked={row.offerAvailable}
                                            />
                                            {row.offerPercentage}
                                        </CustomTableCell>
                                    );
                                } else {
                                    col = (
                                        <CustomTableCell
                                            component="th"
                                            scope="row"
                                            style={{ paddingLeft: 100 }}
                                        >
                                            {"----"}
                                        </CustomTableCell>
                                    );
                                }
                                return (
                                    <TableRow
                                        className={classes.row}
                                        key={row._id}
                                    >
                                        <CustomTableCell
                                            component="th"
                                            scope="row"
                                        >
                                            {row.name}
                                        </CustomTableCell>
                                        {col}
                                        <CustomTableCell
                                            component="th"
                                            scope="row"
                                        >
                                            {row.profitMargin}
                                        </CustomTableCell>
                                        <CustomTableCell>
                                            {/* Edit & Delete Buttons */}
                                            <Button
                                                onClick={() =>
                                                    this.handleEditOpen(
                                                        page * rowsPerPage + i,
                                                        row._id
                                                    )
                                                }
                                            >
                                                <EditIcon />
                                            </Button>
                                            <Button
                                                onClick={() =>
                                                    this.handleDeleteOpen(
                                                        page * rowsPerPage + i,
                                                        row._id
                                                    )
                                                }
                                            >
                                                <DeleteIcon />
                                            </Button>
                                        </CustomTableCell>
                                    </TableRow>
                                );
                            })}
                        {emptyRows > 0 && (
                            <TableRow style={{ height: 48 * emptyRows }}>
                                <TableCell colSpan={6} />
                            </TableRow>
                        )}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                colSpan={3}
                                count={rows.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onChangePage={this.handleChangePage}
                                onChangeRowsPerPage={
                                    this.handleChangeRowsPerPage
                                }
                                ActionsComponent={TablePaginationActionsWrapped}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </Paper>
        );
    }
}

CustomPaginationActionsTable.propTypes = {
    classes: PropTypes.object.isRequired,
    products: PropTypes.array.isRequired,
    handleProductsChange: PropTypes.func.isRequired
};

export default withStyles(styles)(CustomPaginationActionsTable);
