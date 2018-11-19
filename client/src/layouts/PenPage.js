import React, { Component } from "react";
import DashboardNav from "../components/dashboardNav/DashboardNav";
import Pens from "../components/pen/Pens";

export default class TemplatesPage extends Component {
    render() {
        return (
            <React.Fragment>
                <div style={{ paddingLeft: 225 }}>
                    <Pens />
                </div>
                <DashboardNav />
            </React.Fragment>
        );
    }
}
