import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import DeletIcon from "@material-ui/icons/Cancel";
import Input from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";

export default class FoodSize extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            price: 0
        };
    }

    handleValueChange = e => {
        this.props.changeValue(this.props.index, e.target.value);
    };

    handlePriceChange = e => {
        this.props.changePrice(this.props.index, e.target.value);
    };

    deleteCost = () => {
        this.props.deleteCost(this.props.index);
    };

    render() {
        return (
            <div>
                <div style={{ marginRight: 10 }}>Value </div>
                <Input
                    type="number"
                    onChange={this.handleValueChange}
                    value={this.props.value}
                />
                <div style={{ marginRight: 10 }}>Price </div>
                <Input

                    onChange={this.handlePriceChange}
                    value={this.props.price}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">৳</InputAdornment>
                    }}
                />
                <Button disabled={this.props.deleteBool} onClick={this.deleteCost}>
                    <DeletIcon />
                </Button>
            </div>
        );
    }
}
