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
    getTypes,
    getShapes,
    insertKeyRingStock,
    updateKeyRingStock, deleteKeyRingStock, getKeyRingStocks
} from "../../axiosLib/keyRingAxios";
import CrossIcon from "@material-ui/icons/Close";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import SearchIcon from "@material-ui/icons/Search";
import AddIcon from "@material-ui/icons/Add";
import AddKeyRingStock from "./AddKeyRingStock";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import FormHelperText from "@material-ui/core/FormHelperText";
import Modal from "../dialogs/Modal";

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
        alignItems: "center",
        margin: "0 5%",
        justifyContent: 'flex-end',
    },
    dropDown: {
        minWidth: "150px",
        paddingBottom: 6,
        marginRight: 15
    },
    dropWritting: {
        paddingTop: 6,
        paddingRight: 6,
        fontSize: 20
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

class KeyRingStockTable extends React.Component {
    state = {
        type: "",
        typeList: [],
        shape: "",
        shapeList: [],
        keyringStockList: [],
        searchLoading: "loaded",
        nextLoading: "loaded",
        prevLoading: "loaded",
        loading: "loading",
        deleteBool: false,
        editBool: false,
        glbErr: "",
        next: true,
        prev: true,
        page: 1,
        id: "",
        open: false,
        nxtErr: "",
        keyringStock: {
            type: "",
            shape: "",
            available: false,
            stock: 0,
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

    insertKeyRingStock = (type, shape, available, stock, costs) => {
        let that = this;
        //that.setState({ loading: "loaded" });
        insertKeyRingStock(type, shape, available, stock, costs, (err, data) => {
            if (!err) {
                let keyringStockList = that.state.keyringStockList;
                keyringStockList.push(data.keyringstock);
                let typeList = that.state.typeList;
                typeList.push(type);
                let shapeList = that.state.shapeList;
                shapeList.push(shape);

                that.setState({
                    keyringStockList: keyringStockList,
                    typeList: typeList,
                    shapeList: shapeList,
                    glbErr: "",
                    open: false,
                    //loading: "loaded"
                });
            } else {
                that.setState({ glbErr: err.msg, loading: "loaded" });
            }
        });
    };
    handleSearch = () => {
        this.setState({ loading: "loading", page: 1 }, () => {
            let that = this;
            getKeyRingStocks(this.state.page, this.state.type, this.state.shape, (err, data) => {
                if (!err) {
                    //console.log(data.admins, "data");
                    that.setState(
                        {
                            keyringStockList: data.keyringStocks
                        },
                        () => {
                            if (that.state.keyringStockList.length > 0) {
                                that.setState({ loading: "loaded" });
                            } else {
                                that.setState({ loading: "No data" });
                            }
                        }
                    );
                }
            });
        });
    };
    handlePrev = () => {
        let page = this.state.page;
        if (page > 1) {
            page--;
        }
        if (page === 1) {
            this.setState({ prev: true });
        }
        this.setState({ prevLoading: "loading" }, () => {
            let that = this;

            getKeyRingStocks(
                page,
                this.state.type, this.state.shape,
                (err, data) => {
                    if (!err) {
                        //console.log(data.admins, "data");
                        that.setState({
                            keyringStockList: data.keyringStocks,
                            prevLoading: "loaded",
                            page: page,
                            next: false,
                            nxtErr: ""
                        });
                    }
                }
            );
        });
    };
    handleNext = () => {
        let page = this.state.page;
        page++;
        this.setState({ nextLoading: "loading" }, () => {
            let that = this;
            getKeyRingStocks(
                page,
                this.state.type, this.state.shape,
                (err, data) => {
                    if (!err) {
                        //console.log(data.admins, "data");
                        if (data.keyringStocks.length > 29) {
                            that.setState({
                                keyringStockList: data.keyringStocks,
                                page: page,
                                nextLoading: "loaded",
                                prev: false,
                                nxtErr: ""
                            });
                        } else {
                            that.setState({
                                nextLoading: "loaded",
                                nxtErr: "No more Data",
                                next: true
                            });
                        }
                    }
                }
            );
        });
    };
    handleEditBool = keyringStock => {
        if (!this.state.editBool) {
            this.setState({ id: keyringStock._id, keyringStock: keyringStock }, () => {
                this.setState({
                    editBool: !this.state.editBool,
                    glbErr: "",
                    loading: "loaded"
                });
            });
        } else {
            let keyringStock = {
                type: "",
                shape: "",
                available: false,
                stock: 0,
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
                keyringStock: keyringStock,
                loading: "loaded"
            });
        }
    };
    handleEdit = (type, shape, available, stock, costs) => {
        let that = this;
        //that.setState({ loading: "loading" });
        updateKeyRingStock(
            that.state.id,
            type,
            shape,
            available,
            stock,
            costs,
            (err, data) => {
                if (!err) {
                    let keyringStockList = that.state.keyringStockList;
                    let y = keyringStockList.findIndex(
                        keyringStock => keyringStock._id === that.state.id
                    );
                    keyringStockList[y] = data.keyringstock;
                    that.setState({
                        keyringStockList: keyringStockList,
                        glbErr: "",
                        editBool: false,
                        //loading: "loaded"
                    });
                } else {
                    that.setState({ glbErr: err.msg, loading: "loaded" });
                }
            }
        );
    };
    componentDidMount() {
        let that = this;
        that.setState({ loading: "loading" });
        getShapes((err, data) => {
            if (!err) {
                //console.log(data, "data");
                that.setState({ shapeList: data.shapes });
            }
        });
        getTypes((err, data) => {
            if (!err) {
                //console.log(data.types, "data");
                that.setState({ typeList: data.types });
            }
        });
        getKeyRingStocks(this.state.page, this.state.type, this.state.color, (err, data) => {
            if (!err) {
                // console.log(data.keyringStocks);
                that.setState({
                    keyringStockList: data.keyringStocks,
                    loading: "loaded"
                });
            }
        });
    }
    handleDeleteBool = id => {
        this.setState({ deleteBool: !this.state.deleteBool }, () => {
            if (this.state.deleteBool) {
                this.setState({ id: id });
            }
        });
    };
    handleDelete = () => {
        let that = this;
        this.setState({ loading: "loading", deleteBool: false });
        deleteKeyRingStock(this.state.id, (err, data) => {
            //console.log(data);
            if (data.success) {
                let keyringStockList = that.state.keyringStockList;
                let y = keyringStockList.findIndex(
                    keyringStock => keyringStock._id === that.state.id
                );
                keyringStockList.splice(y, 1);
                that.setState({
                    keyringStockList: keyringStockList,
                    loading: "loaded"
                });
            }
        });
    };
    handleOpen = () => {
        let keyringStock = {
            type: "",
            shape: "",
            available: false,
            stock: 0,
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
            keyringStock: keyringStock
        });
    };
    render() {
        const { classes } = this.props;

        return (
            <div>
                {this.state.deleteBool && (
                    <Modal
                        handleYes={this.handleDelete}
                        name={"Stock Item"}
                        handleNo={this.handleDeleteBool}
                        action={"delete"}
                        open={this.state.deleteBool}
                    />
                )}
                {this.state.open && (
                    <AddKeyRingStock
                        open={this.state.open}
                        close={this.handleOpen}
                        add={this.insertKeyRingStock}
                        glbErr={this.state.glbErr}
                        keyringStock={this.state.keyringStock}
                        action={"Add"}
                    />
                )}
                {this.state.editBool && (
                    <AddKeyRingStock
                        open={this.state.editBool}
                        close={this.handleEditBool}
                        add={this.handleEdit}
                        glbErr={this.state.glbErr}
                        keyringStock={this.state.keyringStock}
                        action={"Edit"}
                    />
                )}
                <div className={classes.search}>
                    <div className={classes.searchItem}>
                        <div style={{ display: 'flex' }}>
                            <div className={classes.dropWritting}>

                                Type :
                            </div>
                            <Select
                                value={this.state.type}
                                onChange={this.handleChange}
                                displayEmpty
                                name="type"
                                className={classes.dropDown}
                            >
                                {this.state.typeList.map((type, i) => {
                                    return (
                                        <MenuItem key={i} value={type}>
                                            {type}
                                        </MenuItem>
                                    );
                                })}
                            </Select>
                            <Button
                                variant='outlined'
                                color='primary'
                                className={classes.button}
                                onClick={() => {
                                    this.clear("type");
                                }}
                            >
                                <CrossIcon />
                            </Button>
                        </div>
                    </div>
                    <div className={classes.searchItem}>
                        <div style={{ display: 'flex' }}>
                            <div className={classes.dropWritting}>
                                Shape :
                            </div>
                            <Select
                                value={this.state.shape}
                                className={classes.dropDown}
                                onChange={this.handleChange}
                                displayEmpty
                                name="shape"
                            >
                                {this.state.shapeList.map((shape, i) => {
                                    return (
                                        <MenuItem key={i} value={shape}>
                                            {shape}
                                        </MenuItem>
                                    );
                                })}
                            </Select>
                            <Button
                                variant='outlined'
                                color='primary'
                                className={classes.button}
                                onClick={() => {
                                    this.clear("shape");
                                }}
                            >
                                <CrossIcon />
                            </Button>
                        </div>
                    </div>
                    <div className={classes.searchItem}>
                        <Button
                            variant='outlined'
                            color='primary'
                            className={classes.button}
                            onClick={this.handleSearch}
                        >
                            <SearchIcon />
                        </Button>
                    </div>
                    <Button onClick={this.handleOpen} variant='outlined'
                        color='primary'>
                        Add a Stock
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
                                        Type
                                    </CustomTableCell>
                                    <CustomTableCell
                                        style={{ textAlign: "center", fontSize: 20 }}
                                    >
                                        Shape
                                    </CustomTableCell>
                                    <CustomTableCell
                                        style={{ textAlign: "center", fontSize: 20 }}
                                    >
                                        Stock
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
                                {this.state.keyringStockList.map((keyringStock, i) => {
                                    return (
                                        <TableRow key={i}>
                                            <CustomTableCell
                                                style={{ textAlign: "center", fontSize: 20 }}
                                            >
                                                {keyringStock.type}
                                            </CustomTableCell>
                                            <CustomTableCell
                                                style={{ textAlign: "center", fontSize: 20 }}
                                            >
                                                {keyringStock.shape}
                                            </CustomTableCell>
                                            <CustomTableCell
                                                style={{ textAlign: "center", fontSize: 20 }}
                                            >
                                                {keyringStock.stock}
                                            </CustomTableCell>
                                            <CustomTableCell>
                                                {keyringStock.costs.map(
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
                                                            keyringStock
                                                        );
                                                    }}
                                                >
                                                    <EditIcon />
                                                </Button>
                                                <Button variant="outlined" color="primary"
                                                    onClick={() => {
                                                        this.handleDeleteBool(
                                                            keyringStock._id
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
                <div className={classes.pagination}>
                    {this.state.prevLoading === "loading" && (
                        <div className={classes.SearchIcon}>
                            <CircularProgress color="primary" />
                        </div>
                    )}
                    <Button
                        className={classes.arrowButton}
                        onClick={this.handlePrev}
                        disabled={this.state.prev}
                    >
                        <KeyboardArrowLeft />
                        Previous
                        </Button>
                    <FormHelperText
                        id="component-error-text"
                        style={{
                            color: "primary",
                            marginTop: 8,
                            fontSize: 20
                        }}
                    >
                        {this.state.page}
                    </FormHelperText>
                    <Button
                        className={classes.arrowButton}
                        onClick={this.handleNext}
                        disabled={this.state.next}
                    >
                        Next
                            <KeyboardArrowRight />
                    </Button>
                    {this.state.nextLoading === "loading" && (
                        <div className={classes.SearchIcon}>
                            <CircularProgress color="primary" />
                        </div>
                    )}
                    <FormHelperText
                        id="component-error-text"
                        style={{ color: "red", marginTop: 8, fontSize: 20 }}
                    >
                        {this.state.nxtErr}
                    </FormHelperText>
                </div>

            </div >
        );
    }
}

KeyRingStockTable.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(KeyRingStockTable);
