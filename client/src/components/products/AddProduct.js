import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { withStyles } from "@material-ui/core/styles";
import Slide from "@material-ui/core/Slide";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Category from "./AutoSuggestCategory";

import { ProductsConsumer } from "../../contexts/ProductsContext";

function Transition(props) {
    return <Slide direction="down" {...props} />;
}

const styles = theme => ({
    dialog: {
        padding: "0 150px"
    },
    container: {
        display: "flex",
        flexDirection: "column",
        width: 375
    },
    error: {
        color: "red"
    },
    editButton: {
        marginTop: "3%"
    },
    upload: {
        display: "none"
    },
    title: {
        textAlign: "center"
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: "95%"
    },
    image: {
        height: 355,
        margin: "3% 0"
    },
    offer: {
        display: "flex"
    }
});

const AddProduct = props => {
    let {
        addDialogOpen,
        handleDialogClose,
        handleFileChange,
        file,
        pname,
        ptype,
        ppage,
        poffer,
        ppercentage,
        pprofit,
        pcosting,
        phit,
        prating,
        error,
        handleChange,
        handleAddSubmit,
        classes
    } = props;

    return (
        <div>
            <Dialog
                open={addDialogOpen}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleDialogClose}
                maxWidth="md"
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle
                    id="alert-dialog-slide-title"
                    className={classes.title}
                >
                    Add a Product
                </DialogTitle>
                <DialogContent className={classes.dialog}>
                    <form
                        className={classes.container}
                        onSubmit={handleAddSubmit}
                    >
                        <TextField
                            required
                            id="outlined-name"
                            label="Name"
                            className={classes.textField}
                            value={pname}
                            onChange={handleChange("pname")}
                            margin="normal"
                        />
                        <Category />
                        <TextField
                            id="outlined-name"
                            label="Type (Comma separated)"
                            className={classes.textField}
                            value={ptype}
                            onChange={handleChange("ptype")}
                            margin="normal"
                        />
                        <TextField
                            required
                            id="outlined-name"
                            label="Product Page"
                            className={classes.textField}
                            value={ppage}
                            onChange={handleChange("ppage")}
                            margin="normal"
                        />
                        <div className={classes.offer}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={poffer}
                                        onChange={handleChange("poffer")}
                                        color="primary"
                                    />
                                }
                            />
                            {poffer ? (
                                <TextField
                                    required
                                    id="outlined-name"
                                    label="Offer Percentage"
                                    type="number"
                                    className={classes.textField}
                                    value={ppercentage}
                                    onChange={handleChange("ppercentage")}
                                    margin="normal"
                                />
                            ) : (
                                <TextField
                                    disabled
                                    id="outlined-name"
                                    label="Offer Percentage"
                                    type="number"
                                    className={classes.textField}
                                    value={ppercentage}
                                    onChange={handleChange("ppercentage")}
                                    margin="normal"
                                />
                            )}
                        </div>
                        <TextField
                            required
                            id="outlined-name"
                            label="Profit Margin"
                            type="number"
                            className={classes.textField}
                            value={pprofit}
                            onChange={handleChange("pprofit")}
                            margin="normal"
                        />
                        <TextField
                            required
                            id="outlined-name"
                            label="Costing"
                            type="number"
                            className={classes.textField}
                            value={pcosting}
                            onChange={handleChange("pcosting")}
                            margin="normal"
                        />
                        <TextField
                            id="outlined-name"
                            label="Hit Count"
                            type="number"
                            className={classes.textField}
                            value={phit}
                            onChange={handleChange("phit")}
                            margin="normal"
                        />
                        <TextField
                            id="outlined-name"
                            label="Rating"
                            type="number"
                            className={classes.textField}
                            value={prating}
                            onChange={handleChange("prating")}
                            margin="normal"
                        />
                        <img
                            className={classes.image}
                            src={
                                file
                                    ? URL.createObjectURL(file)
                                    : "https://thumb.ibb.co/knzgQq/no-logo.png"
                            }
                            alt={
                                file
                                    ? URL.createObjectURL(file)
                                    : "https://thumb.ibb.co/knzgQq/no-logo.png"
                            }
                        />
                        <input
                            accept="image/*"
                            className={classes.upload}
                            id="raised-button-file"
                            name="image"
                            type="file"
                            onChange={handleFileChange}
                        />
                        <label htmlFor="raised-button-file">
                            <Button
                                variant="outlined"
                                color="primary"
                                component="span"
                            >
                                Choose Image
                            </Button>
                        </label>
                        {Object.values(error).map((item, i) => (
                            <FormHelperText
                                id="component-error-text"
                                className={classes.error}
                                key={i}
                            >
                                {item}
                            </FormHelperText>
                        ))}
                        <Button
                            type="submit"
                            color="primary"
                            variant="outlined"
                            className={classes.editButton}
                        >
                            Add
                        </Button>
                    </form>
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleDialogClose} color="primary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};
// }

const consumerComponent = props => (
    <ProductsConsumer>
        {({
            addDialogOpen,
            handleDialogClose,
            handleFileChange,
            file,
            pname,
            ptype,
            ppage,
            poffer,
            ppercentage,
            pprofit,
            pcosting,
            phit,
            prating,
            error,
            handleAddSubmit,
            handleChange
        }) => {
            let data = {
                addDialogOpen,
                handleFileChange,
                handleDialogClose,
                file,
                pname,
                ptype,
                ppage,
                poffer,
                ppercentage,
                pprofit,
                pcosting,
                phit,
                prating,
                error,
                handleAddSubmit,
                handleChange
            };
            return <AddProduct {...{ ...props, ...data }} />;
        }}
    </ProductsConsumer>
);

export default withStyles(styles)(consumerComponent);
