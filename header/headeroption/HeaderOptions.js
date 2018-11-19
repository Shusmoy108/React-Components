import React from "react";
import HeaderOption from "./HeaderOption";
import {
    CategorizedProductsConsumer,
    CategorizedProductsProvider
} from "contexts/productContext";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import HeaderDrawer from "./HeaderDrawer";

const styles = theme => ({
    root: {
        flexGrow: 1,
        width: "100%",
        backgroundColor: theme.palette.background.paper
    },
    grow: {
        flexGrow: 1
    },
    smShow: {
        display: "none",
        [theme.breakpoints.down("sm")]: {
            display: "flex"
        }
    },
    smHide: {
        display: "flex",
        [theme.breakpoints.down("sm")]: {
            display: "none"
        }
    }
});

class HeaderOptions extends React.Component {
    render() {
        const { classes, state } = this.props;
        return (
            <React.Fragment>
                <div className={classes.smShow}>
                    <HeaderDrawer categorizedProducts={state.categorizedProducts} />
                    <div className={classes.grow} />
                </div>
                {this.props.searchField && (

                    <div className={classes.smHide}>
                        {state.categorizedProducts.map((item, contentIndex) => {
                            return (
                                <HeaderOption
                                    categoryName={item._id}
                                    data={item.products}
                                    key={contentIndex}
                                />
                            );
                        })}
                    </div>
                )}


            </React.Fragment>
        );
    }
}
HeaderOptions.propTypes = {
    classes: PropTypes.object.isRequired
};
const consumerComponent = props => (
    <CategorizedProductsProvider>
        <CategorizedProductsConsumer>
            {({ state }) => <HeaderOptions {...props} state={state} />}
        </CategorizedProductsConsumer>
    </CategorizedProductsProvider>
);
export default withStyles(styles, { withTheme: true })(consumerComponent);
