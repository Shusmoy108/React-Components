import React, { Component } from "react";
import ProductsTable from "../components/products/ProductsTable";
import DashboardNav from "../components/dashboardNav/DashboardNav";

import { ProductsProvider } from "../contexts/ProductsContext";

export default class ProductsPage extends Component {
	render() {
		return (
			<ProductsProvider>
				<div style={{ paddingLeft: 225 }}>
					<ProductsTable />
				</div>
				<DashboardNav />
			</ProductsProvider>
		);
	}
}
