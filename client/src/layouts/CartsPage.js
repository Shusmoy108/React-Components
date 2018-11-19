import React, { Component } from "react";
import DashboardNav from "../components/dashboardNav/DashboardNav";
import Cart from "../components/carts/CartPage";

export default class CartsPage extends Component {
    render() {
        return (
            <React.Fragment>
                <div style={{ paddingLeft: 225 }}>
                    <Cart />
                </div>
                <DashboardNav />
            </React.Fragment>
        );
    }
}
