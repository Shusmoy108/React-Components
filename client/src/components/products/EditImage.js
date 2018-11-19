import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { withStyles } from "@material-ui/core/styles";
import Slide from "@material-ui/core/Slide";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import UploadIcon from "@material-ui/icons/CloudUploadTwoTone";
import ShowIcon from "@material-ui/icons/SlideshowTwoTone";

import UploadImage from "./UploadImage";
import ShowAllImages from "./ShowAllImages";
import { ProductsConsumer } from "../../contexts/ProductsContext";

function Transition(props) {
    return <Slide direction="down" {...props} />;
}

const styles = {
    root: {
        width: "100%"
    },
    dialog: {
        height: 555
    }
};

const EditImage = props => {
    let {
        dialogOpen,
        dialogValue,
        handleDialogClose,
        handleDialogValueChange,
        classes
    } = props;

    return (
        <div>
            <Dialog
                open={dialogOpen}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleDialogClose}
                maxWidth="md"
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">
                    <BottomNavigation
                        value={dialogValue}
                        onChange={handleDialogValueChange}
                        showLabels
                        className={classes.root}
                    >
                        <BottomNavigationAction
                            label="Upload New"
                            icon={<UploadIcon />}
                        />
                        <BottomNavigationAction
                            label="Select From Existing"
                            icon={<ShowIcon />}
                        />
                    </BottomNavigation>
                </DialogTitle>

                <DialogContent className={classes.dialog}>
                    {dialogValue ? <ShowAllImages /> : <UploadImage />}
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
            dialogOpen,
            dialogValue,
            handleDialogClose,
            handleDialogValueChange
        }) => {
            let data = {
                dialogValue,
                dialogOpen,
                handleDialogClose,
                handleDialogValueChange
            };
            return <EditImage {...{ ...props, ...data }} />;
        }}
    </ProductsConsumer>
);

export default withStyles(styles)(consumerComponent);
