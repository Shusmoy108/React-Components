import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import FormHelperText from "@material-ui/core/FormHelperText";


import adminValidator from "validators/adminValidators";
import { AuthContext } from "contexts/authContext";
import adminAuth from "axiosLib/adminAuth";
import { Redirect } from "react-router-dom";
import logo from "../../assets/logo.png";

import styles from "./loginStyles";

class Login extends React.Component {
	state = {
		username: "",
		password: "",
		redirectToReferrer: false,
		errors: {}
	};

	handleChange = e => {
		this.setState({ [e.target.name]: e.target.value });
	};

	handleClickShowPassword = () => {
		this.setState(state => ({ showPassword: !state.showPassword }));
	};

	handleSubmit = e => {
		e.preventDefault();
		// console.log(this.state);

		const { username, password } = this.state;
		const { errors, isValid } = adminValidator.loginUsername({
			username: username,
			password: password
		});
		let that = this;
		if (isValid) {
			adminAuth.loginUsername(username, password, (err, data) => {
				if (err) this.setState({ errors: err });
				else {
					that.props.setLoggedIn(data.admin, () => {
						that.setState({
							redirectToReferrer: true
						});
					});
				}
			});
		} else {
			this.setState({ errors });
		}
	};

	render() {
		const { classes} = this.props;
		const { errors, redirectToReferrer } = this.state;
		// const { from } = this.props.location.state || { from: { pathname: '/' } }

		const { from } = { from: { pathname: "/" } };

		if (redirectToReferrer === true) {
			return <Redirect to={from} />;
		}

		return (
			<form
				style={{
					display: "flex",
					flexFlow: "column",
					width: 400,
					margin: "auto"
				}}
				onSubmit={this.handleSubmit}
			>
				<img
					style={{ width: 200, margin: "auto" }}
					src={logo}
					alt="Logo not available"
				/>
				<FormControl className={classes.margin}>
					<InputLabel htmlFor="username">Username</InputLabel>
					<Input
						name="username"
						value={this.state.username}
						onChange={this.handleChange}
						className={classes.inputField}
					/>
				</FormControl>
				<FormHelperText
					id="component-error-text"
					style={{
						fontSize: 20,
						color: "red",
						marginLeft: 15,
						marginBottom: 2
					}}
				>
					{errors.username}
				</FormHelperText>
				<FormControl className={classNames(classes.margin)}>
					<InputLabel htmlFor="password">Password</InputLabel>
					<Input
						id="password"
						type={this.state.showPassword ? "text" : "password"}
						value={this.state.password}
						name="password"
						onChange={this.handleChange}
						endAdornment={
							<InputAdornment position="end">
								<IconButton
									aria-label="Toggle password visibility"
									onClick={this.handleClickShowPassword}
									onMouseDown={this.handleMouseDownPassword}
								>
									{this.state.showPassword ? <VisibilityOff /> : <Visibility />}
								</IconButton>
							</InputAdornment>
						}
					/>
				</FormControl>
				<FormHelperText
					id="component-error-text"
					style={{
						fontSize: 20,
						color: "red",
						marginLeft: 15,
						marginBottom: 2
					}}
				>
					{errors.password}
				</FormHelperText>
				<Button
					type="submit"
					variant="contained"
					className={classNames(classes.content)}
					onClick={this.setLogin}
					color="primary"
					style={{ borderRadius: 0, color: "#FFF", height: 50 }}
				>
					LOGIN
				</Button>
				<FormHelperText
					id="component-error-text"
					style={{
						fontSize: 20,
						color: "red",
						marginLeft: 15,
						marginBottom: 2
					}}
				>
					{errors.msg}
				</FormHelperText>
			</form>
		);
	}
}

Login.propTypes = {
	classes: PropTypes.object.isRequired,
	theme: PropTypes.object.isRequired,
	setLoggedIn: PropTypes.func.isRequired
};

const consumerComponent = props => (
	<AuthContext.Consumer>
		{({ setLoggedIn }) => <Login {...props} setLoggedIn={setLoggedIn} />}
	</AuthContext.Consumer>
);

export default withStyles(styles, { withTheme: true })(consumerComponent);
