import React from "react";
import Tagpage from "./TagPage";
import ProductPage from "./ProductPage";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

class Promotions extends React.Component {
    state = {
        value: 0
    };

    handleChange = (event, value) => {
        this.setState({ value });
        // console.log(value);
    };
    render() {
       
        return (
            <div style={{ paddingBottom: 0 }}>
                <Tabs
                    value={this.state.value}
                    onChange={this.handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    fullWidth
                >
                    <Tab label="Tags" />
                    <Tab label="Products" />
                </Tabs>
                {this.state.value === 0 && <Tagpage />}
                {this.state.value === 1 && <ProductPage />}

            </div>
        );
    }
}

export default Promotions;
