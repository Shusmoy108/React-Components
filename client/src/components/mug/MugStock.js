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
    getColors,
    getMugStocks,
    insertMugStock,
    deleteMugStock,
    updateMugStock
} from "../../axiosLib/mugAxios";
import CrossIcon from "@material-ui/icons/Close";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import SearchIcon from "@material-ui/icons/Search";
import AddIcon from "@material-ui/icons/Add";
import AddMugStock from "./AddMugStock";
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
        justifyContent: 'flex-end',
        margin: "0 5%"
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

class MugStockTable extends React.Component {
    state = {
        type: "",
        typeList: [],
        color: "",
        colorList: [],
        mugStockList: [],
        filteredMugStocks: [],
        searchLoading: "loaded",
        nextLoading: "loaded",
        prevLoading: "loaded",
        loading: "loading",
        deleteBool: false,
        editBool: false,
        nxtErr: "",
        glbErr: "",
        next: true,
        prev: true,
        page: 1,
        id: "",
        open: false,
        mugStock: {
            type: "",
            color: "",
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
    handleDeleteBool = id => {
        this.setState({ deleteBool: !this.state.deleteBool }, () => {
            if (this.state.deleteBool) {
                this.setState({ id: id });
            }
        });
    };
    insertMugStock = (type, color, available, stock, costs) => {
        let that = this;
        //that.setState({ loading: "loaded" });
        insertMugStock(type, color, available, stock, costs, (err, data) => {
            if (!err) {
                let mugStockList = that.state.mugStockList;
                mugStockList.push(data.mugStock);
                let typeList = that.state.typeList;
                typeList.push(type);
                let colorList = that.state.colorList;
                colorList.push(color);

                that.setState({
                    mugStockList: mugStockList,
                    typeList: typeList,
                    colorList: colorList,
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
            getMugStocks(this.state.page, this.state.type, this.state.color, (err, data) => {
                if (!err) {
                    //console.log(data.admins, "data");
                    that.setState(
                        {
                            mugStockList: data.mugStocks
                        },
                        () => {
                            if (that.state.mugStockList.length > 0) {
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

            getMugStocks(
                page,
                this.state.type, this.state.color,
                (err, data) => {
                    if (!err) {
                        //console.log(data.admins, "data");
                        that.setState({
                            mugStockList: data.mugStocks,
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
            getMugStocks(
                page,
                this.state.type, this.state.color,
                (err, data) => {
                    if (!err) {
                        //console.log(data.admins, "data");
                        if (data.mugStocks.length > 29) {
                            that.setState({
                                mugStockList: data.mugStocks,
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
    handleEditBool = mugStock => {
        if (!this.state.editBool) {
            this.setState({ id: mugStock._id, mugStock: mugStock }, () => {
                this.setState({
                    editBool: !this.state.editBool,
                    glbErr: "",
                    loading: "loaded"
                });
            });
        } else {
            let mugStock = {
                type: "",
                color: "",
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
                mugStock: mugStock,
                loading: "loaded"
            });
        }
    };
    handleEdit = (type, color, available, stock, costs) => {
        let that = this;
        //that.setState({ loading: "loading" });
        updateMugStock(
            that.state.id,
            type,
            color,
            available,
            stock,
            costs,
            (err, data) => {
                if (!err) {
                    let mugStockList = that.state.mugStockList;
                    let y = mugStockList.findIndex(
                        mugStock => mugStock._id === that.state.id
                    );
                    mugStockList[y] = data.mugStock;
                    that.setState({
                        mugStockList: mugStockList,
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
        getColors((err, data) => {
            if (!err) {
                //console.log(data, "data");
                that.setState({ colorList: data.colors });
            }
        });
        getTypes((err, data) => {
            if (!err) {
                //console.log(data.types, "data");
                that.setState({ typeList: data.types });
            }
        });
        getMugStocks(this.state.page, this.state.type, this.state.color, (err, data) => {
            if (!err) {
                // console.log(data.mugStocks);
                that.setState({
                    mugStockList: data.mugStocks,
                    loading: "loaded"
                });
            }
        });
    }
    handleDelete = () => {
        let that = this;
        this.setState({ loading: "loading", deleteBool: false });
        deleteMugStock(this.state.id, (err, data) => {
            if (data.success) {
                let mugStockList = that.state.mugStockList;
                let y = mugStockList.findIndex(
                    mugStock => mugStock._id === that.state.id
                );
                mugStockList.splice(y, 1);
                that.setState({
                    mugStockList: mugStockList,
                    loading: "loaded"
                });
            }
        });
    };
    handleOpen = () => {
        let mugStock = {
            type: "",
            color: "",
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
            mugStock: mugStock
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
                    <AddMugStock
                        open={this.state.open}
                        close={this.handleOpen}
                        add={this.insertMugStock}
                        glbErr={this.state.glbErr}
                        mugStock={this.state.mugStock}
                        action={"Add"}
                    />
                )}
                {this.state.editBool && (
                    <AddMugStock
                        open={this.state.editBool}
                        close={this.handleEditBool}
                        add={this.handleEdit}
                        glbErr={this.state.glbErr}
                        mugStock={this.state.mugStock}
                        action={"Edit"}
                    />
                )}
                <div className={classes.search}>
                    <div className={classes.searchItem}>
                        <div style={{ display: "flex" }}>
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
                            <Button variant='outlined' color='primary'
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

                                Color :
</div>
                            <Select
                                value={this.state.color}
                                className={classes.dropDown}
                                onChange={this.handleChange}
                                displayEmpty
                                name="color"
                            >
                                {this.state.colorList.map((color, i) => {
                                    return (
                                        <MenuItem key={i} value={color}>
                                            {color}
                                        </MenuItem>
                                    );
                                })}
                            </Select>
                            <Button variant='outlined' color='primary'
                                className={classes.button}
                                onClick={() => {
                                    this.clear("color");
                                }}
                            >
                                <CrossIcon />
                            </Button>
                        </div>
                    </div>
                    <div className={classes.searchItem}>
                        <Button variant='outlined' color='primary'
                            className={classes.button}
                            onClick={this.handleSearch}
                        >
                            <SearchIcon />
                        </Button>
                    </div>
                    <Button variant='outlined' color='primary' onClick={this.handleOpen}>
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
                                        Color
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
                                {this.state.mugStockList.map((mugStock, i) => {
                                    return (
                                        <TableRow key={i}>
                                            <CustomTableCell
                                                style={{ textAlign: "center", fontSize: 20 }}
                                            >
                                                {mugStock.type}
                                            </CustomTableCell>
                                            <CustomTableCell
                                                style={{ textAlign: "center", fontSize: 20 }}
                                            >
                                                {mugStock.color}
                                            </CustomTableCell>
                                            <CustomTableCell
                                                style={{ textAlign: "center", fontSize: 20 }}
                                            >
                                                {mugStock.stock}
                                            </CustomTableCell>
                                            <CustomTableCell>
                                                {mugStock.costs.map(
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
                                                            mugStock
                                                        );
                                                    }}
                                                >
                                                    <EditIcon />
                                                </Button>
                                                <Button variant="outlined" color="primary"
                                                    onClick={() => {
                                                        this.handleDeleteBool(
                                                            mugStock._id
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

MugStockTable.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MugStockTable);
