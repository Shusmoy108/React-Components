import React from "react";
import adminAuth from "axiosLib/adminAuth";

export const AuthContext = React.createContext();

export class AuthProvider extends React.Component {
    state = {
        isAuthenticated: false,
        admin: {}
    };

    componentDidMount() {}

    checkAuth = cb => {
        // console.log("checking auth");
        adminAuth.getProfile((err, data) => {
            // console.log("here");
            if (!err) {
                console.log("in checkauth", data);
                this.setState({
                    isAuthenticated: true,
                    admin: data.admin
                });
                cb(true);
            } else {
                console.log("not auth chackAuth");
                this.setState({
                    isAuthenticated: false,
                    admin: {}
                });
                cb(false);
            }
        });
    };

    changeIsAuthenticated = () => {
        // console.log("here");
        this.setState(prevState => {
            return { isAuthenticated: !prevState.isAuthenticated };
        });
    };

    setLoggedIn = async (admin, cb) => {
        // console.log("in auth login");
        await this.setState({
            isAuthenticated: true,
            admin
        });
        cb();
    };

    setLogOut = cb => {
        adminAuth.logout(() => {
            this.setState({
                isAuthenticated: false,
                admin: {}
            });
            cb();
        });
    };

    render() {
        // console.log(this.state);
        return (
            <AuthContext.Provider
                value={{
                    ...this.state,
                    changeIsAuthenticated: this.changeIsAuthenticated,
                    setLogOut: this.setLogOut,
                    setLoggedIn: this.setLoggedIn,
                    checkAuth: this.checkAuth
                }}
            >
                {this.props.children}
            </AuthContext.Provider>
        );
    }
}

export const AuthConsumer = AuthContext.Consumer;
