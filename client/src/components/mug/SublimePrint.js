import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import CircularProgress from "@material-ui/core/CircularProgress";
import Paper from "@material-ui/core/Paper";
import {
    getProducts,
    getSublimeprintCost,
    insertSublimeprintCost,
    updateSublimeprintCost,
    deleteSublimeprintCost
} from "../../axiosLib/costAxios";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Tooltip from '@material-ui/core/Tooltip'
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

import Modal from "../dialogs/Modal";
import AddSublimationPrint from "./AddSublimeprintCost";

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
        margin: "0 5%"
    },
    search: {
        display: "flex",
        justifyContent: "flex-end",
        margin: "2% 5%"
    },
    dropDown: {
        minWidth: "150px"
    },
    table: {},
    pagination: {
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        marginBottom: "5%"
    },
    row: {
        "&:nth-of-type(odd)": {
            //backgroundColor: theme.palette.background.default
        }
    },
    searchItem: {
        display: "flex",
        margin: "2% 2%"
    },
    loading: {
        display: "flex",
        alignContent: "center",
        justifyContent: "center",
        margin: "20% 0"
    },
    arrowButton: {
        margin: "0 3%"
    }
});

class SublimeprintCostTable extends React.Component {
    state = {
        product: "",
        productList: [],
        sublimePrintList: [],
        filteredMugStocks: [],
        searchLoading: "loaded",
        nextLoading: "loaded",
        prevLoading: "loaded",
        loading: "loading",
        deleteBool: false,
        editBool: false,
        glbErr: "",
        addErr: "",
        next: true,
        prev: true,
        page: 1,
        id: "",
        open: false,
        sublimePrint: {
            product: "",
            costs: [
                {
                    value: 5,
                    price: 10
                }
            ]
        }
    };
    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };
    clear = prop => {
        this.setState({ [prop]: "" });
    };
    handleDeleteBool = id => {
        this.setState({ deleteBool: !this.state.deleteBool }, () => {
            if (this.state.deleteBool) {
                this.setState({ id: id });
            }
        });
    };
    insertSublimeprint = (product, costs) => {
        let that = this;
        that.setState({ loading: "loading" });
        insertSublimeprintCost(product, costs, (err, data) => {
            if (!err) {
                let sublimePrintList = that.state.sublimePrintList;
                sublimePrintList.push(data.sublimationPrint);
                let productList = that.state.productList;
                productList.push(product);

                that.setState({
                    sublimePrintList: sublimePrintList,
                    productList: productList,
                    addErr: "",
                    open: false,
                    loading: "loaded"
                });
            } else {
                that.setState({ addErr: err.msg, loading: "loaded" });
            }
        });
    };
    handleEditBool = sublimePrint => {
        if (!this.state.editBool) {
            this.setState({ id: sublimePrint._id, sublimePrint: sublimePrint }, () => {
                this.setState({
                    editBool: !this.state.editBool,
                    glbErr: "",
                    loading: "loaded"
                });
            });
        } else {
            let sublimePrint = {
                product: "",
                costs: [
                    {
                        value: 5,
                        price: 10
                    }
                ]
            };
            this.setState({
                editBool: !this.state.editBool,
                glbErr: "",
                sublimePrint: sublimePrint,
                loading: "loaded"
            });
        }

    };
    handleEdit = (product, costs) => {
        let that = this;
        that.setState({ loading: "loading" });
        updateSublimeprintCost(
            that.state.id,
            product,
            costs,
            (err, data) => {
                if (!err) {
                    let sublimePrintList = that.state.sublimePrintList;
                    let y = sublimePrintList.findIndex(
                        sublimePrint => sublimePrint._id === that.state.id
                    );
                    sublimePrintList[y] = data.sublimationPrint;
                    that.setState({
                        sublimePrintList: sublimePrintList,
                        addErr: "",
                        editBool: false,
                        loading: "loaded"
                    });
                } else {
                    that.setState({ addErr: err.msg, loading: "loaded" });
                }
            }
        );

    };
    componentDidMount() {
        let that = this;
        that.setState({ loading: "loading" });
        getProducts((err, data) => {
            if (!err) {
                //console.log(data, "data");
                that.setState({ productList: data.products, loading: 'loaded' });
            }
        });
        getSublimeprintCost((err, data) => {
            if (!err) {
                //console.log(data, "data");
                that.setState({ sublimePrintList: data.sublimationPrintcosts, loading: 'loaded' });
            }
        });
    }
    handleDelete = () => {
        let that = this;
        this.setState({ loading: "loading", deleteBool: false });
        deleteSublimeprintCost(this.state.id, (err, data) => {
            if (data.success) {
                let sublimePrintList = that.state.sublimePrintList;
                let y = sublimePrintList.findIndex(
                    sublimePrint => sublimePrint._id === that.state.id
                );
                sublimePrintList.splice(y, 1);
                that.setState({
                    sublimationPrint: sublimePrintList,
                    loading: "loaded",

                });
            }
        });

    };
    handleOpen = () => {
        let sublimePrint = {
            product: "",
            costs: [
                {
                    value: 5,
                    price: 10
                }
            ]
        };
        this.setState({
            open: !this.state.open,
            glbErr: "",
            sublimePrint: sublimePrint
        });
    };
    render() {
        const { classes } = this.props;

        return (
            <div>
                {this.state.deleteBool && (
                    <Modal
                        handleYes={this.handleDelete}
                        name={"Sublimation Print"}
                        handleNo={this.handleDeleteBool}
                        action={"delete"}
                        open={this.state.deleteBool}
                    />
                )}
                {this.state.open && (
                    <AddSublimationPrint
                        open={this.state.open}
                        close={this.handleOpen}
                        add={this.insertSublimeprint}
                        glbErr={this.state.addErr}
                        sublimePrint={this.state.sublimePrint}
                        action={"Add"}
                    />
                )}
                {this.state.editBool && (
                    <AddSublimationPrint
                        open={this.state.editBool}
                        close={this.handleEditBool}
                        add={this.handleEdit}
                        glbErr={this.state.addErr}
                        sublimePrint={this.state.sublimePrint}
                        action={"Edit"}
                    />
                )}
                <div className={classes.search}>
                    <Tooltip title='Add SublimePrint'>
                        <Button variant='outlined' color='primary' onClick={this.handleOpen}>
                            Add Sublimation Print
                        </Button>
                    </Tooltip>
                </div>
                {this.state.loading === "loading" && (
                    <div className={classes.loading}>
                        <CircularProgress color="primary" size={200} />
                    </div>
                )}
                {this.state.loading === "loaded" && (
                    <Paper className={classes.root}>
                        <Table className={classes.table}>
                            <TableHead>
                                <TableRow>
                                    <CustomTableCell
                                        style={{ textAlign: "center", fontSize: 20 }}
                                    >
                                        Product
                                    </CustomTableCell>
                                    <CustomTableCell>
                                        <Grid container>
                                            <Grid
                                                item
                                                sm={12}
                                                style={{
                                                    display: "flex",
                                                    alignContent: "center",
                                                    justifyContent: "center"
                                                }}
                                            >
                                                <div style={{ fontSize: 20 }}>Costs</div>
                                            </Grid>
                                            <Grid
                                                item
                                                sm={6}
                                                style={{
                                                    display: "flex",
                                                    placeContent: "flex-end"
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        marginRight: "5%", fontSize: 20
                                                    }}
                                                >
                                                    Value
                                                </div>
                                            </Grid>
                                            <Grid
                                                item
                                                sm={6}
                                                style={{
                                                    display: "flex",
                                                    placeContent: "flex-start"
                                                    //marginLeft: "1%"
                                                }}
                                            >
                                                <div
                                                    style={{ marginLeft: "5%", fontSize: 20 }}
                                                >
                                                    Cost
                                                </div>
                                            </Grid>
                                        </Grid>
                                    </CustomTableCell>
                                    <CustomTableCell />
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.sublimePrintList.map((sublimePrint, i) => {
                                    return (
                                        <TableRow key={i}>
                                            <CustomTableCell
                                                style={{ textAlign: "center", fontSize: 20 }}
                                            >
                                                {sublimePrint.product}
                                            </CustomTableCell>
                                            <CustomTableCell>
                                                {sublimePrint.costs.map(
                                                    (cost, j) => {
                                                        return (
                                                            <Grid
                                                                container
                                                                key={j}
                                                            >
                                                                <Grid
                                                                    item
                                                                    sm={6}
                                                                    style={{
                                                                        display:
                                                                            "flex",
                                                                        placeContent:
                                                                            "flex-end"
                                                                    }}
                                                                >
                                                                    <div
                                                                        style={{
                                                                            marginRight:
                                                                                "10%",
                                                                            fontSize: 20
                                                                        }}
                                                                    >
                                                                        {"<"}
                                                                        {
                                                                            cost.value
                                                                        }
                                                                    </div>
                                                                </Grid>
                                                                <Grid
                                                                    item
                                                                    sm={6}
                                                                    style={{
                                                                        display:
                                                                            "flex",
                                                                        placeContent:
                                                                            "flex-start"
                                                                    }}
                                                                >
                                                                    <div
                                                                        style={{
                                                                            marginRight:
                                                                                "10%",
                                                                            fontSize: 20
                                                                        }}
                                                                    >
                                                                        {"@BDT "}
                                                                        {
                                                                            cost.price
                                                                        }
                                                                    </div>
                                                                </Grid>
                                                            </Grid>
                                                        );
                                                    }
                                                )}
                                            </CustomTableCell>

                                            <CustomTableCell>
                                                <Button variant="outlined" color="primary" style={{ marginRight: "10px" }}
                                                    onClick={() => {
                                                        this.handleEditBool(
                                                            sublimePrint
                                                        );
                                                    }}
                                                >
                                                    <EditIcon />
                                                </Button>
                                                <Button variant="outlined" color="primary"
                                                    onClick={() => {
                                                        this.handleDeleteBool(
                                                            sublimePrint._id
                                                        );
                                                    }}
                                                >
                                                    <DeleteIcon />
                                                </Button>
                                            </CustomTableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </Paper>
                )}
                {this.state.loading === "No data" && <div>No Stock Found</div>}

            </div >
        );
    }
}

SublimeprintCostTable.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SublimeprintCostTable);
