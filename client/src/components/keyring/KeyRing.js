import React from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import KeyRingNav from "./KeyRingNav";

const styles = theme => ({
    searchItem: {
        display: "flex",
        margin: "2% 2%"
    }
});
class Templates extends React.Component {
    state = {
        value: 0,
        product: "MUG"
    };
    handleChange = e => {
        this.setState({ product: e.target.value });
    };
    render() {
        return (
            <div style={{ margin: "1% 2%" }}>
                <KeyRingNav />
            </div>
        );
    }
}
Templates.propTypes = {
    classes: PropTypes.object.isRequired
};
export default withStyles(styles)(Templates);
