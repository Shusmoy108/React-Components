import React, { Component } from "react";
import DashboardNav from "../components/dashboardNav/DashboardNav";
import Templates from "../components/template/Templates";

export default class TemplatesPage extends Component {
    render() {
        return (
            <React.Fragment>
                <div style={{ paddingLeft: 225 }}>
                    <Templates />
                </div>
                <DashboardNav />
            </React.Fragment>
        );
    }
}
