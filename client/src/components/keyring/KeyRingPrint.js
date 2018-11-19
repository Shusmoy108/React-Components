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

    getKeyringprintCost,
    deleteKeyringprintCost,

    insertKeyringprintCost,
    updateKeyringprintCost
} from "../../axiosLib/costAxios";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Tooltip from '@material-ui/core/Tooltip';
import Modal from "../dialogs/Modal";
import AddKeyRingprintCost from "./AddKeyRingprintCost";

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

class KeyRingPrint extends React.Component {
    state = {
        product: "",
        productList: [],
        keyringPrintList: [],
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
        keyringPrint: {
            product: "",
            type: "",
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
    insertKeyringprintCost = (product, type, costs) => {
        let that = this;
        that.setState({ loading: "loading" });
        insertKeyringprintCost(product, type, costs, (err, data) => {
            if (!err) {
                let keyringPrintList = that.state.keyringPrintList;
                keyringPrintList.push(data.keyringprintcost);


                that.setState({
                    keyringPrintList: keyringPrintList,
                    addErr: "",
                    open: false,
                    loading: "loaded"
                });
            } else {
                that.setState({ addErr: err.msg, loading: "loaded" });
            }
        });
    };
    handleEditBool = keyringPrint => {
        if (!this.state.editBool) {
            this.setState({ id: keyringPrint._id, keyringPrint: keyringPrint }, () => {
                this.setState({
                    editBool: !this.state.editBool,
                    glbErr: "",
                    loading: "loaded"
                });
            });
        } else {
            let keyringPrint = {
                product: "",
                type: "",
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
                keyringPrint: keyringPrint,
                loading: "loaded"
            });
        }

    };
    handleEdit = (product, type, costs) => {
        let that = this;
        that.setState({ loading: "loading" });
        updateKeyringprintCost(
            that.state.id,
            product,
            type,
            costs,
            (err, data) => {
                if (!err) {
                    let keyringPrintList = that.state.keyringPrintList;
                    let y = keyringPrintList.findIndex(
                        keyringPrint => keyringPrint._id === that.state.id
                    );
                    keyringPrintList[y] = data.keyringprintcost;
                    that.setState({
                        keyringPrintList: keyringPrintList,
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
        getKeyringprintCost((err, data) => {
            if (!err) {
                //console.log(data, "data");
                that.setState({ keyringPrintList: data.keyringPrintCosts, loading: 'loaded' });
            }
        });
    }
    handleDelete = () => {
        let that = this;
        this.setState({ loading: "loading", deleteBool: false });
        deleteKeyringprintCost(this.state.id, (err, data) => {
            if (data.success) {
                let keyringPrintList = that.state.keyringPrintList;
                let y = keyringPrintList.findIndex(
                    keyringPrint => keyringPrint._id === that.state.id
                );
                keyringPrintList.splice(y, 1);
                that.setState({
                    keyringPrintList: keyringPrintList,
                    loading: "loaded",

                });
            }
        });

    };
    handleOpen = () => {
        let keyringPrint = {
            product: "",
            type: "",
            costs: [
                {
                    value: 5,
                    price: 10
                }
            ]
        };
        this.setState({
            open: !this.state.open,
            addErr: "",
            keyringPrint: keyringPrint
        });
    };
    render() {
        const { classes } = this.props;

        return (
            <div>
                {this.state.deleteBool && (
                    <Modal
                        handleYes={this.handleDelete}
                        name={"Keyring Print"}
                        handleNo={this.handleDeleteBool}
                        action={"delete"}
                        open={this.state.deleteBool}
                    />
                )}
                {this.state.open && (
                    <AddKeyRingprintCost
                        open={this.state.open}
                        close={this.handleOpen}
                        add={this.insertKeyringprintCost}
                        glbErr={this.state.addErr}
                        keyringPrint={this.state.keyringPrint}
                        action={"Add"}
                    />
                )}
                {this.state.editBool && (
                    <AddKeyRingprintCost
                        open={this.state.editBool}
                        close={this.handleEditBool}
                        add={this.handleEdit}
                        glbErr={this.state.addErr}
                        keyringPrint={this.state.keyringPrint}
                        action={"Edit"}
                    />
                )}
                <div className={classes.search}>
                    <Tooltip title='Add Keyring Print'>
                        <Button variant='outlined' color='primary' onClick={this.handleOpen}>
                            Add a Keyring Print
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
                                    <CustomTableCell
                                        style={{ textAlign: "center", fontSize: 20 }}
                                    >
                                        Type
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
                                {this.state.keyringPrintList.map((keyRingPrint, i) => {
                                    return (
                                        <TableRow key={i}>
                                            <CustomTableCell
                                                style={{ textAlign: "center", fontSize: 20 }}
                                            >
                                                {keyRingPrint.product}
                                            </CustomTableCell>
                                            <CustomTableCell
                                                style={{ textAlign: "center", fontSize: 20 }}
                                            >
                                                {keyRingPrint.type}
                                            </CustomTableCell>
                                            <CustomTableCell>
                                                {keyRingPrint.costs.map(
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
                                                            keyRingPrint
                                                        );
                                                    }}
                                                >
                                                    <EditIcon />
                                                </Button>
                                                <Button variant="outlined" color="primary"
                                                    onClick={() => {
                                                        this.handleDeleteBool(
                                                            keyRingPrint._id
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

KeyRingPrint.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(KeyRingPrint);
