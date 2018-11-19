import React from "react";
import FormHelperText from "@material-ui/core/FormHelperText";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import PropTypes from "prop-types";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import CostAdder from "./CostAdder";
import FormControl from "@material-ui/core/FormControl";
import AddIcon from "@material-ui/icons/Add";
const keyringPrintValidator = require("../../validators/keyRing/keyRingPrintCostValidator");

function Transition(props) {
    return <Slide direction="down" {...props} />;
}
class AddKeyRingprintCost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            product: "",
            type: "",
            costs: [
                {
                    value: 5,
                    price: 10
                }
            ],
            globalError: "",
            errors: {},
            deleteBool: true,
            printBool: true
        };
    }
    isSelected = () => {
        this.setState({ available: !this.state.available });
    };
    handleChange = prop => event => {
        this.setState({ [prop]: event.target.value });
    };

    handleClose = () => {
        this.props.close();
    };
    handleAdd = () => {
        let { costs, product, type } = this.state;

        let data = {
            product,
            costs,
            type
        };

        let { errors, isValid } = keyringPrintValidator.keyRingPrintCostInput(data);

        if (!isValid) {
            this.setState({ errors: errors });
        } else {
            this.setState({ errors: {} });
            this.props.add(product, type, costs);
        }
    };

    handleCostValueChange = (i, val) => {

        let costs = this.state.costs;
        costs[i].value = val;
        this.setState({ costs: costs });
    };

    handleCostPriceChange = (i, val) => {

        let costs = this.state.costs;
        costs[i].price = val;
        this.setState({ costs: costs });
    };
    deleteCost = i => {
        let costs = this.state.costs;
        costs.splice(i, 1);
        this.setState({ costs: costs }, () => {
            if (this.state.costs.length === 1) {
                this.setState({ deleteBool: true });
            } else {
                this.setState({ deleteBool: false });
            }
        });
    };

    addCostFields = () => {
        let costs = this.state.costs;
        let newCosts = costs.concat([
            {
                value: 0,
                price: 0
            }
        ]);
        this.setState({ costs: newCosts }, () => {
            if (this.state.costs.length === 1) {
                this.setState({ deleteBool: true });
            } else {
                this.setState({ deleteBool: false });
            }
        });
    };
    componentDidMount() {
        this.setState({
            product: this.props.keyringPrint.product,
            type: this.props.keyringPrint.type,
            costs: this.props.keyringPrint.costs
        }, () => {

            if (this.state.costs.length > 1) {
                this.setState({ deleteBool: false })
            }
        });
    }
    render() {
        // let offerPercentage;
        let that = this;

        let costs = this.state.costs.map((cost, i) => {
            return (
                <CostAdder
                    key={i}
                    value={that.state.costs[i].value}
                    price={that.state.costs[i].price}
                    changeValue={that.handleCostValueChange}
                    changePrice={that.handleCostPriceChange}
                    index={i}
                    deleteCost={that.deleteCost}
                    deleteBool={this.state.deleteBool}
                />
            );
        });
        return (
            <div style={{ width: "50%" }}>
                <Dialog
                    fullWidth={true}
                    maxWidth={"xs"}
                    open={this.props.open}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle id="alert-dialog-slide-title">
                        {this.props.action + " Keyring Print Cost"}
                    </DialogTitle>
                    <FormHelperText
                        id="component-error-text"
                        style={{
                            fontSize: 20,
                            color: "red",
                            marginLeft: 15,
                            marginBottom: 2
                        }}
                    >
                        {this.props.glbErr}
                    </FormHelperText>

                    <DialogContent>
                        <InputLabel
                            htmlFor="adornment-amount"
                            style={{ marginRight: 10 }}
                        >
                            Product{" "}
                        </InputLabel>
                        <Input
                            id="standard-required"
                            onChange={this.handleChange("product")}
                            value={this.state.product}
                        />

                        <FormHelperText
                            id="component-error-text"
                            style={{ color: "red" }}
                        >
                            {this.state.errors.product}
                        </FormHelperText>
                        <InputLabel
                            htmlFor="adornment-amount"
                            style={{ marginRight: 10 }}
                        >
                            Type{" "}
                        </InputLabel>
                        <Input
                            id="standard-required"
                            onChange={this.handleChange("type")}
                            value={this.state.type}
                        />

                        <FormHelperText
                            id="component-error-text"
                            style={{ color: "red" }}
                        >
                            {this.state.errors.type}
                        </FormHelperText>
                        <div
                            htmlFor="adornment-amount"
                            style={{ marginRight: 10 }}
                        >
                            Costs :{" "}
                            <Button onClick={this.addCostFields}>
                                <AddIcon />
                            </Button>
                            <FormHelperText
                                id="component-error-text"
                                style={{ color: "red" }}
                            >
                                {this.state.errors.costs}
                            </FormHelperText>
                            <FormControl
                                style={{ fullWidth: "true", width: "100%" }}
                            >
                                {costs}
                            </FormControl>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleAdd} color="primary">
                            {this.props.action + ""}
                        </Button>
                        <Button onClick={this.handleClose} color="primary">
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}
AddKeyRingprintCost.propTypes = {
    //classes: PropTypes.object.isRequired
    open: PropTypes.bool.isRequired
};

export default AddKeyRingprintCost;
