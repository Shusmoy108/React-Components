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

import { ProductsConsumer } from "../../contexts/ProductsContext";

function Transition(props) {
    return <Slide direction="down" {...props} />;
}

const styles = theme => ({
    dialog: {
        padding: "0 150px"
    },
    error: {
        color: "red"
    },
    editButton: {
        marginTop: "3%"
    },
    title: {
        textAlign: "center"
    },
    container: {
        display: "flex",
        flexDirection: "column",
        width: 375
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: "95%"
    }
});

const EditProduct = props => {
    let {
        ratingDialogOpen,
        handleDialogClose,
        handleRatingSubmit,
        prating,
        error,
        handleChange,
        classes
    } = props;

    return (
        <div>
            <Dialog
                open={ratingDialogOpen}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleDialogClose}
                className={classes.dialog}
                maxWidth="md"
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle
                    id="alert-dialog-slide-title"
                    className={classes.title}
                >
                    Edit a Product
                </DialogTitle>
                <DialogContent className={classes.dialog}>
                    <form
                        className={classes.container}
                        onSubmit={handleRatingSubmit}
                        autoComplete="on"
                    >
                        <TextField
                            id="outlined-name"
                            label="Rating"
                            className={classes.textField}
                            value={prating}
                            type="number"
                            onChange={handleChange("prating")}
                            margin="normal"
                        />
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
                            Edit
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
            ratingDialogOpen,
            handleDialogClose,
            handleRatingSubmit,
            prating,
            error,
            handleChange
        }) => {
            let data = {
                ratingDialogOpen,
                handleDialogClose,
                handleRatingSubmit,
                prating,
                error,
                handleChange
            };
            return <EditProduct {...{ ...props, ...data }} />;
        }}
    </ProductsConsumer>
);

export default withStyles(styles)(consumerComponent);
