import React, { Component } from "react";
import NotFound from "./NotFound";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import DashboardPage from "./DashboardPage";
import CartsPage from "./CartsPage";
import OrdersPage from "./OrdersPage";
import ProductsPage from "./ProductsPage";
import PromotionsPage from "./PromotionsPage";
import TemplatesPage from "./TemplatesPage";
import PrivateComponent from './PrivateComponent';
import DashboardNav from "../components/dashboardNav/DashboardNav";

class DashboardLayout extends Component {
  render() {
    return (

      <Router>
          <React.Fragment>
              <div style={{ paddingLeft: 225 }}>
              <Switch>
                
              </Switch>
              <DashboardNav />
              </div>
          </React.Fragment>
      </Router>
    );
  }
}

export default DashboardLayout;
