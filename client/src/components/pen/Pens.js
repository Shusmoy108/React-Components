import React from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import PenNav from "./PenNav";

const styles = theme => ({
    searchItem: {
        display: "flex",
        margin: "2% 2%"
    }
});
class Templates extends React.Component {
    state = {
        value: 0
    };
    render() {
        return (
            <div style={{ margin: "1% 2%" }}>
                <PenNav />
            </div>
        );
    }
}
Templates.propTypes = {
    classes: PropTypes.object.isRequired
};
export default withStyles(styles)(Templates);
