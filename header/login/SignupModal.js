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
import Typography from "@material-ui/core/Typography";

import userValidator from "validators/userValidator";
import {signupEmail, signupPhone} from "axiosLib/userAuth";
import { UserContext } from "contexts/userContext";

import styles from "./modalBodyStyle";

class SignupModal extends React.Component {
	state = {
		name: "",
		email: "",
		password: "",
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

		const { name, email, password } = this.state;
		if (!email || isNaN(email)) {
			const { errors, isValid } = userValidator.signupEmail(this.state);
			// console.log(errors, isValid);
			if(isValid){
				signupEmail(name, email, password, (err, data) => {
					if(err) this.setState({errors: err})
					else {
						console.log(data);
						this.props.setLoggedIn(data.user);
						this.props.toggleModal();
					}
				})
			}
			else{
				this.setState({ errors });
			}
			
		} else {
			const { errors, isValid } = userValidator.signupPhone({
				name: name,
				phone: email,
				password: password
			});
			if(isValid){
				signupPhone(name, email, password, (err, data) => {
					if(err) this.setState({errors: err})
					else {
						console.log(data);
						this.props.setLoggedIn(data.user);
						this.props.toggleModal();
					}
				})
			}
			else{
				this.setState({ errors });
			}
		}
	};

	render() {
		const { classes, theme } = this.props;
		const { errors } = this.state;

		return (
			<form
				style={{ display: "flex", flexFlow: "column", width: "100%" }}
				onSubmit={this.handleSubmit}
			>
				<FormControl className={classes.margin}>
					<InputLabel htmlFor="name">Name</InputLabel>
					<Input
						id="name"
						name="name"
						value={this.state.name}
						onChange={this.handleChange}
					/>
				</FormControl>
				{errors.name && (
					<Typography
						variant="caption"
						style={{ color: theme.palette.ternary.main }}
					>
						{errors.name}
					</Typography>
				)}
				<FormControl className={classes.margin}>
					<InputLabel htmlFor="email">Email/Phone Number</InputLabel>
					<Input
						name="email"
						value={this.state.email}
						onChange={this.handleChange}
						className={classes.inputField}
					/>
				</FormControl>
				{errors.email && (
					<Typography
						variant="caption"
						style={{ color: theme.palette.ternary.main }}
					>
						{errors.email}
					</Typography>
				)}
				{!errors.email &&
					errors.phone && (
						<Typography
							variant="caption"
							style={{ color: theme.palette.ternary.main }}
						>
							{errors.phone}
						</Typography>
					)}
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
				{errors.password && (
					<Typography
						variant="caption"
						style={{ color: theme.palette.ternary.main }}
					>
						{errors.password}
					</Typography>
				)}
				<Button
					type="submit"
					variant="contained"
					className={classNames(classes.content)}
					onClick={this.setLogin}
					color="primary"
					style={{ borderRadius: 0, color: "#FFF", height: 50 }}
				>
					SIGNUP
				</Button>
				{errors.msg && (
					<Typography
						variant="caption"
						style={{ color: theme.palette.ternary.main, textAlign: 'center' }}
					>
						{errors.msg}
					</Typography>
				)}
			</form>
		);
	}
}

SignupModal.propTypes = {
	classes: PropTypes.object.isRequired,
	theme: PropTypes.object.isRequired,
	setLoggedIn: PropTypes.func.isRequired,
	toggleModal: PropTypes.func.isRequired
};

const consumerComponent = props => (
	<UserContext.Consumer>
		{({ setLoggedIn, toggleLogin }) => <SignupModal {...props} setLoggedIn={setLoggedIn} toggleModal={toggleLogin}/>}
	</UserContext.Consumer>
);

export default withStyles(styles, { withTheme: true })(consumerComponent);
