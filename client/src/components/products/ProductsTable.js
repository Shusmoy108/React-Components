import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/DeleteForeverTwoTone";
import RatingIcon from "@material-ui/icons/StarBorderTwoTone";
import AddIcon from "@material-ui/icons/AddBoxRounded";
import BackIcon from "@material-ui/icons/ArrowBack";
import FormHelperText from "@material-ui/core/FormHelperText";

import TablePaginationActionsWrapped from "./TablePaginationActionsWrapped";
import ProductsTableStyles from "./ProductsTableStyles";
import EditImage from "./EditImage";
import EditProduct from "./EditProduct";
import EditRating from "./EditRating";
import AddProduct from "./AddProduct";
import Search from "./AutoSuggest";

import { ProductsConsumer } from "../../contexts/ProductsContext";

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
    componentDidMount = () => {
        this.props.getAllProducts();
        this.props.getFileNames();
        this.props.getAllCategories();
    };

    render() {
        const {
            classes,
            products,
            search,
            handleBack,
            searchProducts,
            selectedProduct,
            handleSearch,
            handleDialogOpen,
            page,
            error,
            rowsPerPage,
            handleChangePage,
            handleChangeRowsPerPage
        } = this.props;

        let tableItems = search ? selectedProduct : products;
        const emptyRows =
            rowsPerPage -
            Math.min(rowsPerPage, tableItems.length - page * rowsPerPage);

        return (
            <Paper className={classes.root}>
                <EditImage />
                <EditProduct />
                <EditRating />
                <AddProduct />
                <div className={search ? classes.top_search : classes.top}>
                    {search && (
                        <Button
                            variant="outlined"
                            onClick={handleBack}
                            className={classes.button}
                            color="primary"
                        >
                            <BackIcon />
                        </Button>
                    )}
                    {error.msg && (
                        <FormHelperText
                            id="component-error-text"
                            className={classes.error}
                        >
                            {error.msg}
                        </FormHelperText>
                    )}
                    <Search
                        suggestions={searchProducts}
                        placeholder="Search a Product"
                        handleSearch={handleSearch}
                    />
                    <Button
                        variant="outlined"
                        color="primary"
                        className={classes.button}
                        onClick={() => handleDialogOpen([], "add")}
                    >
                        <AddIcon />
                    </Button>
                </div>
                <div className={classes.tableWrapper}>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <CustomTableCell>Image</CustomTableCell>
                                <CustomTableCell>Name</CustomTableCell>
                                <CustomTableCell>Category</CustomTableCell>
                                <CustomTableCell>Type</CustomTableCell>
                                <CustomTableCell>Product Page</CustomTableCell>
                                <CustomTableCell numeric>
                                    Rating
                                </CustomTableCell>
                                <CustomTableCell>Actions</CustomTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tableItems
                                .slice(
                                    page * rowsPerPage,
                                    page * rowsPerPage + rowsPerPage
                                )
                                .map((row, i) => {
                                    // console.log(row);
                                    return (
                                        <TableRow
                                            key={i}
                                            className={classes.row}
                                        >
                                            {/* ----------------Image Here--------------- */}
                                            <TableCell>
                                                <div className={classes.image}>
                                                    <img
                                                        src={
                                                            "images/products/" +
                                                            row.imageLinkHover
                                                        }
                                                        alt={row.imageLinkHover}
                                                        height="75px"
                                                        width="75px"
                                                    />
                                                    <IconButton
                                                        id={row._id}
                                                        variant="outlined"
                                                        color="primary"
                                                        onClick={() =>
                                                            handleDialogOpen(
                                                                row,
                                                                "image"
                                                            )
                                                        }
                                                        className={
                                                            classes.button
                                                        }
                                                    >
                                                        <EditIcon
                                                            style={{
                                                                fontSize: "17px"
                                                            }}
                                                        />
                                                    </IconButton>
                                                </div>
                                            </TableCell>
                                            <TableCell>{row.name}</TableCell>
                                            <TableCell>
                                                {row.category}
                                            </TableCell>
                                            <TableCell>
                                                {row.type.toString()}
                                            </TableCell>
                                            <TableCell>
                                                {row.productPage}
                                            </TableCell>
                                            <TableCell>{row.rating}</TableCell>
                                            <TableCell>
                                                <Button
                                                    variant="outlined"
                                                    color="primary"
                                                    size="small"
                                                    className={classes.button}
                                                    onClick={() =>
                                                        handleDialogOpen(
                                                            row,
                                                            "edit"
                                                        )
                                                    }
                                                >
                                                    <EditIcon />
                                                </Button>
                                                <Button
                                                    variant="outlined"
                                                    size="small"
                                                    color="primary"
                                                    className={classes.button}
                                                    onClick={() =>
                                                        handleDialogOpen(
                                                            row,
                                                            "rating"
                                                        )
                                                    }
                                                >
                                                    <RatingIcon />
                                                </Button>
                                                <Button
                                                    variant="outlined"
                                                    color="primary"
                                                    size="small"
                                                    className={classes.button}
                                                >
                                                    <DeleteIcon />
                                                </Button>
                                            </TableCell>
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
                                    count={tableItems.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onChangePage={handleChangePage}
                                    onChangeRowsPerPage={
                                        handleChangeRowsPerPage
                                    }
                                    ActionsComponent={
                                        TablePaginationActionsWrapped
                                    }
                                />
                            </TableRow>
                        </TableFooter>
                    </Table>
                </div>
            </Paper>
        );
    }
}

CustomPaginationActionsTable.propTypes = {
    classes: PropTypes.object.isRequired
};

const consumerComponent = props => (
    <ProductsConsumer>
        {({
            products,
            searchProducts,
            selectedProduct,
            getFileNames,
            page,
            error,
            search,
            handleBack,
            handleSearch,
            rowsPerPage,
            getAllProducts,
            getAllCategories,
            handleDialogOpen,
            handleChangePage,
            handleChangeRowsPerPage
        }) => {
            let data = {
                products,
                searchProducts,
                selectedProduct,
                getFileNames,
                page,
                error,
                search,
                handleBack,
                handleSearch,
                getAllProducts,
                getAllCategories,
                handleDialogOpen,
                rowsPerPage,
                handleChangePage,
                handleChangeRowsPerPage
            };
            return <CustomPaginationActionsTable {...{ ...props, ...data }} />;
        }}
    </ProductsConsumer>
);

export default withStyles(ProductsTableStyles)(consumerComponent);
