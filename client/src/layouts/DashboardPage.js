import React, { Component } from "react";
import DashboardNav from "../components/dashboardNav/DashboardNav";

export default class DashboardPage extends Component {
	render() {
		return (
			<React.Fragment>
				<div style={{ paddingLeft: 225 }} >
					Dashboard
				</div>
				<DashboardNav />
			</React.Fragment>
		);
	}
}
