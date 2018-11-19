import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoginPage from "./LoginPage";
import NotFound from "./NotFound";
import DashboardPage from "./DashboardPage";
import CartsPage from "./CartsPage";
import OrdersPage from "./OrdersPage";
import ProductsPage from "./ProductsPage";
import PromotionsPage from "./PromotionsPage";
import TemplatesPage from "./TemplatesPage";
import LogsPage from "./LogsPage";
import PenPage from "./PenPage";
import PrivateComponent from "./PrivateComponent";
import MugPage from "./MugPage";
import KeyRingPage from "./KeyRingPage";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { AuthProvider } from "contexts/authContext";

const theme = createMuiTheme({
    typography: {
        useNextVariants: true,
        fontFamily: "Arcon"
    },
    palette: {
        primary: {
            main: "#66bb6a"
        },
        secondary: {
            main: "#fcb316"
        },
        ternary: {
            main: "#ef3836"
        },
        writing: {
            main: "#757575"
        },
        solid: {
            main: "#e0e0e0"
        }
    }
});

class MasterLayout extends Component {
    render() {
        return (
            <Router>
                <AuthProvider>
                    <MuiThemeProvider theme={theme}>
                        <Switch>
                            <Route exact path="/login" component={LoginPage} />
                            <Route
                                exact
                                path="/"
                                render={props => (
                                    <PrivateComponent {...props} component={<DashboardPage />} />
                                )}
                            />
                            <Route
                                exact
                                path="/MUG"
                                render={props => (
                                    <PrivateComponent {...props} component={<MugPage />} />
                                )}
                            />
                            <Route
                                exact
                                path="/PEN"
                                render={props => (
                                    <PrivateComponent {...props} component={<PenPage />} />
                                )}
                            />
                            <Route
                                exact
                                path="/KEY RING"
                                render={props => (
                                    <PrivateComponent {...props} component={<KeyRingPage />} />
                                )}
                            />
                            <Route
                                exact
                                path="/orders"
                                render={props => (
                                    <PrivateComponent {...props} component={<OrdersPage />} />
                                )}
                            />
                            <Route
                                exact
                                path="/carts"
                                render={props => (
                                    <PrivateComponent {...props} component={<CartsPage />} />
                                )}
                            />
                            <Route
                                exact
                                path="/products"
                                render={props => (
                                    <PrivateComponent {...props} component={<ProductsPage />} />
                                )}
                            />
                            <Route
                                exact
                                path="/templates"
                                render={props => (
                                    <PrivateComponent {...props} component={<TemplatesPage />} />
                                )}
                            />
                            <Route
                                exact
                                path="/logs"
                                render={props => (
                                    <PrivateComponent {...props} component={<LogsPage />} />
                                )}
                            />
                            <Route
                                exact
                                path="/promotions"
                                render={props => (
                                    <PrivateComponent {...props} component={<PromotionsPage />} />
                                )}
                            />
                            <Route path="*" component={NotFound} />
                        </Switch>
                    </MuiThemeProvider>
                </AuthProvider>
            </Router>
        );
    }
}

export default MasterLayout;
