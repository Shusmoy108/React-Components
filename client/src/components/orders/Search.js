import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import moment from "moment";
import DatePicker from "react-datepicker";
import CrossIcon from "@material-ui/icons/Close";
import Button from "@material-ui/core/Button";
import SearchIcon from "@material-ui/icons/Search";

import { SearchStyles } from "./Styles";
import { OrderConsumer } from "contexts/orderContext";
import AutoSuggest from "./AutoSuggest";

let date = moment();
class Search extends Component {
    state = {
        user: "",
        order: "",
        product: "",
        date: date
    };

    handleUserIdChange = value => {
        this.setState({ user: value });
    };

    handleDateChange = d => {
        // console.log(this.state.date, "date");
        this.setState({ date: d });
    };

    clear = value => {
        if (value === "date") this.setState({ date: null });
        if (value === "order") this.setState({ order: "" });
        if (value === "product") this.setState({ product: "" });
        if (value === "user") this.setState({ user: "" });
    };

    render() {
        let suggestions = [
            { label: "AAA", id: "1" },
            { label: "AAB", id: "2" },
            { label: "ABB", id: "3" }
        ];
        const { classes } = this.props;
        return (
            <div className={classes.top}>
                <form className={classes.root}>
                    <div className={classes.Item}>
                        <div className={classes.margin}>
                            <span>Date</span>
                            <DatePicker
                                className={classes.date}
                                selected={this.state.date}
                                dateFormat="DD/MM/YYYY"
                                onChange={this.handleDateChange}
                            />
                        </div>
                        <div>
                            <Button
                                className={classes.button}
                                onClick={() => this.clear("date")}
                                color="primary"
                            >
                                <CrossIcon />
                            </Button>
                        </div>
                    </div>

                    <div>
                        <div className={classes.Item}>
                            <AutoSuggest
                                suggest={this.state.user}
                                suggestions={suggestions}
                                field={"User"}
                                handleSuggestChange={this.handleUserIdChange}
                            />
                            <Button
                                className={classes.button}
                                onClick={() => this.clear("user")}
                                color="primary"
                            >
                                <CrossIcon />
                            </Button>
                        </div>
                    </div>

                    <div>
                        <div className={classes.Item}>
                            <AutoSuggest
                                suggest={this.state.user}
                                suggestions={suggestions}
                                field={"Product"}
                                handleSuggestChange={this.handleUserIdChange}
                            />
                            <Button
                                className={classes.button}
                                onClick={() => this.clear("product")}
                                color="primary"
                            >
                                <CrossIcon />
                            </Button>
                        </div>
                    </div>

                    <div>
                        <div className={classes.Item}>
                            <AutoSuggest
                                suggest={this.state.user}
                                suggestions={suggestions}
                                field={"Order"}
                                handleSuggestChange={this.handleUserIdChange}
                            />
                            <Button
                                className={classes.button}
                                onClick={() => this.clear("order")}
                                color="primary"
                            >
                                <CrossIcon />
                            </Button>
                        </div>
                    </div>

                    <div>
                        <Button className={classes.button} color="primary">
                            <SearchIcon />
                        </Button>
                    </div>
                </form>
            </div>
        );
    }
}

const consumerComponent = props => (
    <OrderConsumer>
        {({ handleLockClick }) => {
            let data = {
                ...props
            };
            return <Search {...data} />;
        }}
    </OrderConsumer>
);

export default withStyles(SearchStyles, { withTheme: true })(consumerComponent);
