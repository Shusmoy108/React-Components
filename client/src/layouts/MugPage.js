import React, { Component } from "react";
import DashboardNav from "../components/dashboardNav/DashboardNav";
import Mugs from "../components/mug/Mugs";

export default class TemplatesPage extends Component {
    render() {
        return (
            <React.Fragment>
                <div style={{ paddingLeft: 225 }}>
                    <Mugs />
                </div>
                <DashboardNav />
            </React.Fragment>
        );
    }
}
