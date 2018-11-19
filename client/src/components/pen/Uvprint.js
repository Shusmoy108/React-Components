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
import Tooltip from '@material-ui/core/Tooltip'
import {
    getUvprintCost,
    updateUvprintCost,
    insertUvprintCost,
    deleteUvprintCost,
} from "../../axiosLib/costAxios";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

import Modal from "../dialogs/Modal";
import AddUvPrint from "./AddUvprintCost";

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

class UVprintCostTable extends React.Component {
    state = {
        product: "",
        productList: [],
        uvPrintList: [],
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
        uvPrint: {
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
    insertUvprint = (product, costs) => {
        let that = this;
        that.setState({ loading: "loading" });
        insertUvprintCost(product, costs, (err, data) => {
            if (!err) {
                let uvPrintList = that.state.uvPrintList;
                uvPrintList.push(data.uvPrint);


                that.setState({
                    uvPrintList: uvPrintList,
                    addErr: "",
                    open: false,
                    loading: "loaded"
                });
            } else {
                console.log(err.msg);
                that.setState({ addErr: err.msg, loading: "loaded" });
            }
        });
    };
    handleEditBool = uvPrint => {
        if (!this.state.editBool) {
            this.setState({ id: uvPrint._id, uvPrint: uvPrint }, () => {
                this.setState({
                    editBool: !this.state.editBool,
                    addErr: "",
                    loading: "loaded"
                });
            });
        } else {
            let uvPrint = {
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
                addErr: "",
                uvPrint: uvPrint,
                loading: "loaded"
            });
        }

    };
    handleEdit = (product, costs) => {

        let that = this;
        that.setState({ loading: "loading" });
        updateUvprintCost(
            that.state.id,
            product,
            costs,
            (err, data) => {
                if (!err) {
                    let uvPrintList = that.state.uvPrintList;
                    let y = uvPrintList.findIndex(
                        uvPrint => uvPrint._id === that.state.id
                    );
                    uvPrintList[y] = data.uvPrint;
                    that.setState({
                        uvPrintList: uvPrintList,
                        glbErr: "",
                        editBool: false,
                        loading: "loaded"
                    });
                } else {
                    // console.log(err.msg);
                    that.setState({ addErr: err.msg, loading: "loaded" });
                }
            }
        );
    };
    componentDidMount() {
        let that = this;
        that.setState({ loading: "loading" });
        getUvprintCost((err, data) => {
            if (!err) {
                //console.log(data, "data");
                that.setState({ uvPrintList: data.uvPrintcosts, loading: 'loaded' });
            }
        });
    }
    handleDelete = () => {
        let that = this;
        this.setState({ loading: "loading", deleteBool: false });
        deleteUvprintCost(this.state.id, (err, data) => {
            if (data.success) {
                let uvPrintList = that.state.uvPrintList;
                let y = uvPrintList.findIndex(
                    uvPrint => uvPrint._id === that.state.id
                );
                uvPrintList.splice(y, 1);
                that.setState({
                    uvPrintList: uvPrintList,
                    loading: "loaded",

                });
            }
        });

    };
    handleOpen = () => {
        let uvPrint = {
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
            uvPrint: uvPrint
        });
    };
    render() {
        const { classes } = this.props;

        return (
            <div>
                {this.state.deleteBool && (
                    <Modal
                        handleYes={this.handleDelete}
                        name={"UV Print"}
                        handleNo={this.handleDeleteBool}
                        action={"delete"}
                        open={this.state.deleteBool}
                    />
                )}
                {this.state.open && (
                    <AddUvPrint
                        open={this.state.open}
                        close={this.handleOpen}
                        add={this.insertUvprint}
                        glbErr={this.state.addErr}
                        uvPrint={this.state.uvPrint}
                        action={"Add"}
                    />
                )}
                {this.state.editBool && (
                    <AddUvPrint
                        open={this.state.editBool}
                        close={this.handleEditBool}
                        add={this.handleEdit}
                        glbErr={this.state.addErr}
                        uvPrint={this.state.uvPrint}
                        action={"Edit"}
                    />
                )}

                <div className={classes.search}>

                    <Button variant='outlined' color='primary' onClick={this.handleOpen}>
                        Add UVPrint Cost
                        </Button>

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
                                                    justifyContent: "center",

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
                                {this.state.uvPrintList.map((uvPrint, i) => {
                                    return (
                                        <TableRow key={i}>
                                            <CustomTableCell
                                                style={{ textAlign: "center", fontSize: 20 }}
                                            >
                                                {uvPrint.product}
                                            </CustomTableCell>
                                            <CustomTableCell>
                                                {uvPrint.costs.map(
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
                                                                        {"@BDT"}
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
                                                            uvPrint
                                                        );
                                                    }}
                                                >
                                                    <EditIcon />
                                                </Button>
                                                <Button variant="outlined" color="primary"
                                                    onClick={() => {
                                                        this.handleDeleteBool(
                                                            uvPrint._id
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
                {this.state.loading === "No data" && <div>No UV Print Cost Found</div>}

            </div >
        );
    }
}

UVprintCostTable.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(UVprintCostTable);
