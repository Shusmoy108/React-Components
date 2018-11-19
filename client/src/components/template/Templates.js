import React from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import TemplateTable from "./TemplateTable";

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
    const { classes } = this.props;
    const products = [
      "MUG",
      "KEY RING",
      "PEN",

      "GRETTINGS CARD",
      "POSTER",
      "PHOTO FRAME",
      "PENDRIVE",
      "WRISTBAND",
      "BUSSINESS CARD",
      "WALL CALENDER",
      "DESK CALENDER",
      "SEAL",
      "ENVELOPE",
      "LETTERHEAD PAD",
      "FOLDER",

      "INVITATION CARD",
      "CERTIFICATE",
      "CREST",
      "BADGE",
      "BANNER"
    ];
    return (
      <div style={{ margin: "1% 2%" }}>
        <div className={classes.searchItem}>
          <TemplateTable products={products} />
        </div>
      </div>
    );
  }
}
Templates.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(Templates);
