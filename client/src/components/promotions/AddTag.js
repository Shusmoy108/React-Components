import React from "react";
import { addTag, updateTag } from "../../axiosLib/promotionsAxios";
import FormHelperText from "@material-ui/core/FormHelperText";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import PropTypes from "prop-types";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import InputLabel from "@material-ui/core/InputLabel";
import Checkbox from "@material-ui/core/Checkbox";
import FormControl from "@material-ui/core/FormControl";
const tagValidators = require("../../validators/tagValidator");

function Transition(props) {
    return <Slide direction="down" {...props} />;
}
class Addtag extends React.Component {
    constructor(props) {
        super(props);
        const {
            name,
            profitMargin,
            offerAvailable,
            offerPercentage
        } = this.props.tagToEdit;
        this.state = {
            name,
            profitMargin,
            offerAvailable,
            offerPercentage,
            globalError: "",
            errors: {}
        };
    }

    handleChange = prop => event => {
        this.setState({ [prop]: event.target.value });
    };

    handleClose = () => {
        this.props.close();
    };

    componentWillReceiveProps(props) {}

    handleAdd = () => {
        let {
            name,
            offerAvailable,
            offerPercentage,
            profitMargin
        } = this.state;

        let data = {
            name,
            offerAvailable,
            offerPercentage,
            profitMargin
        };

        let { errors, isValid } = tagValidators.tagInput(data);

        if (!isValid) {
            // console.log(errors);
            this.setState({ errors: errors });
        } else {
            this.setState({ errors: errors });
            if (this.props.action === "Add") {
                addTag(
                    name,
                    offerAvailable,
                    offerPercentage,
                    profitMargin,
                    (err, data) => {
                        if (!err) {
                            //console.log(data);
                            this.props.handleAddTag(data.tag);
                            this.props.close();
                        } else {
                            // console.log(err.msg);
                            this.setState({ globalError: err.msg });
                        }
                    }
                );
            } else if (this.props.action === "Edit") {
                updateTag(
                    this.props.id,
                    name,
                    offerAvailable,
                    offerPercentage,
                    profitMargin,
                    (err, data) => {
                        if (!err) {
                            this.props.handleEditTag(this.props.id, data.tag);
                            this.props.close();
                        } else {
                            //console.log(err.msg);
                            this.setState({ globalError: err.msg });
                        }
                    }
                );
            }
        }
    };

    isSelected = () => {
        this.setState({ offerAvailable: !this.state.offerAvailable });
    };

    render() {
        // let offerPercentage;

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
                        {this.props.action + " A Tag"}
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
                        {this.state.globalError}
                    </FormHelperText>

                    <DialogContent>
                        <FormControl
                            style={{ fullWidth: "true", width: "100%" }}
                        >
                            <InputLabel
                                htmlFor="adornment-amount"
                                style={{ marginRight: 10 }}
                            >
                                Tag Name{" "}
                            </InputLabel>
                            <Input
                                id="standard-required"
                                onChange={this.handleChange("name")}
                                value={this.state.name}
                            />
                        </FormControl>
                        <FormHelperText
                            id="component-error-text"
                            style={{ color: "red" }}
                        >
                            {this.state.errors.name}
                        </FormHelperText>
                    </DialogContent>
                    <DialogContent>
                        <FormControl
                            style={{ fullWidth: "true", width: "100%" }}
                        >
                            <InputLabel
                                htmlFor="adornment-amount"
                                style={{ marginRight: 10 }}
                            >
                                ProfitMargin{" "}
                            </InputLabel>
                            <Input
                                id="adornment-amount"
                                label="ProfitMargin"
                                value={this.state.profitMargin}
                                // type="number"
                                onChange={this.handleChange("profitMargin")}
                                endAdornment={
                                    <InputAdornment position="start">
                                        %
                                    </InputAdornment>
                                }
                            />
                            <FormHelperText
                                id="component-error-text"
                                style={{ color: "red" }}
                            >
                                {this.state.errors.profitMargin}
                            </FormHelperText>
                        </FormControl>
                    </DialogContent>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            <InputLabel
                                htmlFor="adornment-amount"
                                style={{ marginRight: 10 }}
                            >
                                OfferAvailable{" "}
                            </InputLabel>
                            <Checkbox
                                checked={this.state.offerAvailable}
                                onChange={this.isSelected}
                            />
                        </DialogContentText>
                    </DialogContent>

                    <DialogContent>
                        <FormControl
                            style={{ fullWidth: "true", width: "100%" }}
                        >
                            <InputLabel
                                htmlFor="adornment-amount"
                                style={{ marginRight: 10 }}
                            >
                                Offer Percentage{" "}
                            </InputLabel>
                            <Input
                                id="adornment-amount"
                                value={this.state.offerPercentage}
                                type="number"
                                disabled={!this.state.offerAvailable}
                                onChange={this.handleChange("offerPercentage")}
                                endAdornment={
                                    <InputAdornment position="start">
                                        %
                                    </InputAdornment>
                                }
                            />
                            <FormHelperText
                                id="component-error-text"
                                style={{ color: "red" }}
                            >
                                {this.state.errors.offerPercentage}
                            </FormHelperText>
                            {/* <p style={{ color: "red" }}>{this.state.errors.offerPercentage}</p> */}
                        </FormControl>
                    </DialogContent>

                    <DialogActions>
                        <Button onClick={this.handleAdd} color="primary">
                            {this.props.action} Tag
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
Addtag.propTypes = {
    //classes: PropTypes.object.isRequired,
    tagToEdit: PropTypes.object.isRequired,
    open: PropTypes.bool.isRequired
};

export default Addtag;
