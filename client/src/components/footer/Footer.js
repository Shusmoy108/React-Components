import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
	marginClass: {
		marginTop: theme.spacing.unit * 150
	}
});

class Footer extends Component {
	render() {
		const { classes } = this.props;

		return <div className={classes.marginClass}>made by BIGGO</div>;
	}
}

Footer.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Footer);
