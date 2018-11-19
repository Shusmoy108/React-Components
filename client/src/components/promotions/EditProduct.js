import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
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
import FormHelperText from "@material-ui/core/FormHelperText";
import PropTypes from "prop-types";

function Transition(props) {
    return <Slide direction="down" {...props} />;
}

class EditProduct extends React.Component {
    render() {
        let offerPercentage;
        if (this.props.offerAvailable) {
            offerPercentage = (
                <DialogContent>
                    <FormControl style={{ fullWidth: "true", maxWidth: "xs" }}>
                        <InputLabel
                            htmlFor="adornment-amount"
                            style={{ marginRight: 10 }}
                        >
                            Offer Percentage{" "}
                        </InputLabel>
                        <Input
                            id="adornment-amount"
                            value={this.props.offerPercentage}
                            type="number"
                            onChange={this.props.handleInputChange(
                                "offerPercentage"
                            )}
                            endAdornment={
                                <InputAdornment position="start">
                                    %
                                </InputAdornment>
                            }
                        />
                        <FormHelperText style={{ color: "red" }}>
                            {this.props.errors.offerPercentage}
                        </FormHelperText>
                    </FormControl>
                </DialogContent>
            );
        } else {
            offerPercentage = (
                <DialogContent>
                    <FormControl style={{ fullWidth: "true", maxWidth: "xs" }}>
                        <InputLabel
                            htmlFor="adornment-amount"
                            style={{ marginRight: 10 }}
                        >
                            Offer Percentage{" "}
                        </InputLabel>
                        <Input
                            id="adornment-amount"
                            disabled
                            value={this.props.offerPercentage}
                            type="number"
                            onChange={this.props.handleInputChange(
                                "offerPercentage"
                            )}
                            endAdornment={
                                <InputAdornment position="start">
                                    %
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                </DialogContent>
            );
        }
        return (
            <div style={{ width: "50%" }}>
                <Dialog
                    fullWidth={true}
                    maxWidth={"xs"}
                    open={this.props.open}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={this.props.handleClose}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle id="alert-dialog-slide-title">
                        {this.props.action + " Product"}
                        <FormHelperText style={{ color: "red" }}>
                            {this.props.errors.msg}
                        </FormHelperText>
                    </DialogTitle>

                    <DialogContent>
                        <FormControl
                            style={{ fullWidth: "true", maxWidth: "xs" }}
                        >
                            <InputLabel
                                htmlFor="adornment-amount"
                                style={{ marginRight: 10 }}
                            >
                                Product Name{" "}
                            </InputLabel>
                            <Input
                                id="standard-required"
                                value={this.props.name}
                                required={true}
                                disabled
                            />
                        </FormControl>
                    </DialogContent>
                    <DialogContent>
                        <FormControl
                            style={{ fullWidth: "true", maxWidth: "xs" }}
                        >
                            <InputLabel
                                htmlFor="adornment-amount"
                                style={{ marginRight: 10 }}
                            >
                                Profit Margin{" "}
                            </InputLabel>
                            <Input
                                id="adornment-amount"
                                label="ProfitMargin"
                                type="number"
                                value={this.props.profitMargin}
                                onChange={this.props.handleInputChange(
                                    "profitMargin"
                                )}
                                endAdornment={
                                    <InputAdornment position="start">
                                        %
                                    </InputAdornment>
                                }
                            />
                            <FormHelperText style={{ color: "red" }}>
                                {this.props.errors.profitMargin}
                            </FormHelperText>
                        </FormControl>
                    </DialogContent>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            <InputLabel
                                htmlFor="adornment-amount"
                                style={{ marginRight: 10 }}
                            >
                                Offer Available{" "}
                            </InputLabel>
                            <Checkbox
                                checked={this.props.offerAvailable}
                                onChange={this.props.handleOfferAvailable}
                            />
                        </DialogContentText>
                    </DialogContent>
                    {offerPercentage}
                    <DialogActions>
                        <Button
                            onClick={this.props.handleEditSubmit}
                            color="primary"
                        >
                            {this.props.action} Product
                        </Button>
                        <Button
                            onClick={this.props.handleClose}
                            color="primary"
                        >
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

EditProduct.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    action: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    errors: PropTypes.object.isRequired,
    profitMargin: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
    offerPercentage: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
    offerAvailable: PropTypes.bool.isRequired,
    handleEditSubmit: PropTypes.func.isRequired,
    handleInputChange: PropTypes.func.isRequired,
    handleOfferAvailable: PropTypes.func.isRequired,
    handleDeleteSubmit: PropTypes.func.isRequired
};

export default EditProduct;
