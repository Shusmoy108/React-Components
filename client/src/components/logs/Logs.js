import React from "react";
import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import CrossIcon from "@material-ui/icons/Close";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import SearchIcon from "@material-ui/icons/Search";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import { getAdminList, getTypes, getLogs } from "../../axiosLib/logsAxios";
import FormHelperText from "@material-ui/core/FormHelperText";
import CircularProgress from "@material-ui/core/CircularProgress";
import LogTable from "./LogTable";
const styles = theme => ({
    root: {
        display: "flex",
        // alignItems: "center",
        margin: "2% 5%",
        alignItems: "flex-end",
        flexWrap: "wrap"
    },
    searchItem: {
        display: "flex",
        margin: "2% 2%"
    },
    dropDown: {
        minWidth: "150px",
        paddingBottom: 6,
        marginRight: 15
    },
    dropWritting: {
        paddingTop: 6,
        paddingRight: 10,
        fontSize: 20
    },
    button: {
        padding: "0 0",
        margin: "0 0"
        // minHeight: 0,
        //minWidth: 0
    },
    search: {
        display: "flex",
        alignItems: "center",
        justifyContent: 'flex-end',
        margin: "0 5%"
    },
    pagination: {
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        marginBottom: "5%"
    },
    loading: {
        display: "flex",
        alignContent: "center",
        justifyContent: "center",
        margin: "20% 0"
    },

    Item: {
        display: "flex",
        alignItems: "flex-end"
    },
    margin: {
        margin: 20
    },
    date: {
        background: "inherit",
        fontFamily: "Arcon",
        fontSize: 15,
        paddingTop: 13,
        marginRight: 15,
        borderBottom: "1px solid",
        borderTop: "none",
        borderRight: "none",
        borderLeft: "none",
        "&:hover": {
            borderBottom: "2px solid"
        },
        "&:focus": {
            outline: 0
        }
    },
    arrowButton: {
        margin: "0 3%"
    }
});
class Logs extends React.Component {
    constructor(props) {
        super(props);
        let date = moment();
        this.state = {
            date: date,
            adminIdList: [],
            typeList: [],
            adminId: "",
            searchLoading: "loaded",
            nextLoading: "loaded",
            prevLoading: "loaded",
            loading: "loading",
            type: "",
            page: 1,
            logList: [],
            glbErr: "",
            next: true,
            prev: true
        };
    }
    clear = prop => {
        this.setState({ [prop]: "" });
    };
    cleardate = () => {
        this.setState({ date: null });
    };
    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };
    handleSearch = () => {
        this.setState({ searchLoading: "loading", page: 1 }, () => {
            let that = this;
            getLogs(
                this.state.page,
                this.state.date,
                this.state.adminId,
                this.state.type,
                (err, data) => {
                    if (!err) {
                        //console.log(data.admins, "data");
                        that.setState({
                            logList: data.logs,
                            searchLoading: "loaded",
                            next: false,
                            glbErr: ""
                        });
                        if (data.logs.length < 29) {
                            that.setState({ next: true });
                        }
                    }
                }
            );
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

            getLogs(
                page,
                this.state.date,
                this.state.adminId,
                this.state.type,
                (err, data) => {
                    if (!err) {
                        //console.log(data.admins, "data");
                        that.setState({
                            logList: data.logs,
                            prevLoading: "loaded",
                            page: page,
                            next: false,
                            glbErr: ""
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
            getLogs(
                page,
                this.state.date,
                this.state.adminId,
                this.state.type,
                (err, data) => {
                    if (!err) {
                        //console.log(data.admins, "data");
                        if (data.logs.length > 29) {
                            that.setState({
                                logList: data.logs,
                                page: page,
                                nextLoading: "loaded",
                                prev: false,
                                glbErr: ""
                            });
                        } else {
                            that.setState({
                                nextLoading: "loaded",
                                glbErr: "No more Data",
                                next: true
                            });
                        }
                    }
                }
            );
        });
    };
    handleDateChange = d => {
        //console.log(d, "date");
        this.setState({ date: d });
    };
    componentDidMount = () => {
        let that = this;
        getAdminList((err, data) => {
            if (!err) {
                //console.log(data, "data");
                that.setState({ adminIdList: data.admins });
            }
        });
        getTypes((err, data) => {
            if (!err) {
                //console.log(data.types, "data");
                that.setState({ typeList: data.types });
            }
        });
        getLogs(
            this.state.page,
            this.state.date,
            this.state.adminId,
            this.state.type,
            (err, data) => {
                if (!err) {
                    //console.log(data.admins, "data");
                    that.setState({
                        logList: data.logs,
                        prev: true,
                        glbErr: "",
                        next: false,
                        loading: "loaded"
                    });
                    if (data.logs.length < 29) {
                        that.setState({ next: true });
                    }
                }
            }
        );
    };
    render() {
        //const { date, time } = this.state;
        const { classes } = this.props;
        // console.log(this.state.date);
        return (
            <div>
                <div className={classes.search}>
                    <div className={classes.searchItem}>
                        <div style={{ display: "flex" }}>
                            <div className={classes.dropWritting}>

                                Date
                        </div>
                            <DatePicker
                                className={classes.date}
                                selected={this.state.date}
                                dateFormat="DD/MM/YYYY"
                                onChange={this.handleDateChange}
                            />
                            <Button
                                className={classes.button}
                                onClick={() => this.clear("date")}
                                color="primary"
                                variant='outlined'
                            >
                                <CrossIcon />
                            </Button>
                        </div>
                    </div>





                    <div className={classes.searchItem}>
                        <div style={{ display: "flex" }}>
                            <div className={classes.dropWritting}>

                                Admin
                        </div>
                            <Select
                                value={this.state.adminId}
                                onChange={this.handleChange}
                                displayEmpty
                                name="adminId"
                                className={classes.dropDown}

                            >
                                {this.state.adminIdList.map((admin, i) => {
                                    return (
                                        <MenuItem key={i} value={admin._id}>
                                            {admin.username}
                                        </MenuItem>
                                    );
                                })}
                            </Select>
                            <Button
                                variant='outlined'
                                color='primary'
                                className={classes.button}
                                onClick={() => {
                                    this.clear("adminId");
                                }}
                            >
                                <CrossIcon />
                            </Button>
                        </div>
                    </div>


                    <div className={classes.searchItem}>
                        <div style={{ display: "flex" }}>
                            <div className={classes.dropWritting}>

                                Type
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
                    <Button className={classes.button} onClick={this.handleSearch} variant='outlined'
                        color='primary'>
                        <SearchIcon />
                    </Button>

                </div>

                {this.state.searchLoading === "loading" && (
                    <div className={classes.SearchIcon}>
                        <CircularProgress color="primary" />
                    </div>
                )}


                <div>
                    {this.state.loading === "loading" && (
                        <div className={classes.loading}>
                            <CircularProgress color="primary" size={200} />
                        </div>
                    )}
                    {this.state.loading === "loaded" && (
                        <div className={classes.searchItem}>
                            <LogTable logs={this.state.logList} />
                        </div>
                    )}
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
                            {this.state.glbErr}
                        </FormHelperText>
                    </div>
                </div>
            </div >
        );
    }
}
Logs.propTypes = {
    classes: PropTypes.object.isRequired
};
export default withStyles(styles)(Logs);
