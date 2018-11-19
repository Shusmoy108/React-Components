import React, { Component } from "react";
import Promotions from "../components/promotions/Promotions";
import DashboardNav from "../components/dashboardNav/DashboardNav";

export default class PromotionsPage extends Component {
  render() {
    return (
      <React.Fragment>
				<div style={{ paddingLeft: 225 }} >
					<Promotions/>
				</div>
				<DashboardNav />
			</React.Fragment>
    )
  }
}
