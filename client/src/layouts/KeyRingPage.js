import React, { Component } from "react";
import DashboardNav from "../components/dashboardNav/DashboardNav";
import KeyRing from "../components/keyring/KeyRing";

export default class TemplatesPage extends Component {
    render() {
        return (
            <React.Fragment>
                <div style={{ paddingLeft: 225 }}>
                    <KeyRing />
                </div>
                <DashboardNav />
            </React.Fragment>
        );
    }
}
