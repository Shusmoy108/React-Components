import React, { Component } from "react";
import Loading from "components/loading/Loading";
import { Redirect } from "react-router-dom";


import { AuthContext } from "contexts/authContext";

class DashboardPage extends Component {
	state = {
		status: undefined
	} 

	componentDidMount() {
		if(this.props.isAuthenticated) this.setState({status: true});
		else {
			this.props.checkAuth(isAuth => {
				if(isAuth) this.setState({status: true});
				else this.setState({status: false});
			})
		}
	}

	render() {
		const { status } = this.state;
		const { component } = this.props;
		if(status === true) return component;
		else if (status === false) return <Redirect to={'/login'} />; 
		else return <Loading />;

	}
}

const consumerComponent = props => (
	<AuthContext.Consumer>
		{({ isAuthenticated, checkAuth }) => (
			<DashboardPage
				{...props}
				isAuthenticated = {isAuthenticated}
				checkAuth = {checkAuth}
			/>
		)}
	</AuthContext.Consumer>
);

export default consumerComponent;
