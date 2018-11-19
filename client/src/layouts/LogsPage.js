import React, { Component } from "react";
import Logs from "../components/logs/Logs";
import DashboardNav from "../components/dashboardNav/DashboardNav";


export default class LogsPage extends Component {
    render() {
        return (
            <React.Fragment>
                <div style={{ paddingLeft: 225 }}>
                    <Logs />
                </div>
                <DashboardNav />
            </React.Fragment>
        );
    }
}
