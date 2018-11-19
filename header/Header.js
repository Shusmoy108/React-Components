import React, { Component } from "react";
import HeaderTop from "./HeaderTop";
import HeaderSticky from "./HeaderSticky";
import { withStyles } from "@material-ui/core/styles";
import SingleHeader from "./SingleHeader";

const styles = {};

class header extends Component {
    render() {
        return (
            <React.Fragment>
                {/* <div style={{ display: "flex" }}>
                    <HeaderTop />
                </div> */}
                <div style={{ display: "flex", position: 'fixed', zIndex: 300 }}>
                    <SingleHeader />
                </div>
                {/* <div style={{ position: "sticky", top: 0, zIndex: 300 }}>
                    <HeaderSticky />
                </div> */}
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(header);
