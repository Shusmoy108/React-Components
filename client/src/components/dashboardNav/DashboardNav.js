import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import { mainListItems, secondaryListItems } from "./listItems";

import styles from "./dashboardNavStyles";

const DashboardNav = (props => {
	// console.log("render nav");
	return (
		<React.Fragment>
			<CssBaseline />
			<Drawer variant="permanent" open={true}>
				<List>{mainListItems}</List>
				<Divider />
				<List>{secondaryListItems}</List>
			</Drawer>
		</React.Fragment>
	);
});

DashboardNav.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DashboardNav);
