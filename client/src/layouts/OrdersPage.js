import React, { Component } from "react";
import DashboardNav from "../components/dashboardNav/DashboardNav";
import Orders from "../components/orders/Orders";
import { OrderProvider } from "contexts/orderContext";

export default class OrdersPage extends Component {
    render() {
        return (
            <OrderProvider>
                <div style={{ paddingLeft: 225 }}>
                    <Orders />
                </div>
                <DashboardNav />
            </OrderProvider>
        );
    }
}
