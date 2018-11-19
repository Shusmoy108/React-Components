
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
import { UserContext } from "contexts/userContext";
import {loginEmail, loginPhone} from "axiosLib/userAuth";

import styles from "./modalBodyStyle";

class LoginModal extends React.Component {
	state = {
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

		const { email, password } = this.state;
		if (!email || isNaN(email)) {
			const { errors, isValid } = userValidator.loginEmail(this.state);
			console.log(errors, isValid);
			if (isValid) {
				loginEmail(email, password, (err, data) => {
					if (err) this.setState({ errors: err });
					else {
						console.log(data);
						this.props.setLoggedIn(data.user);
						this.props.toggleModal();
					}
				});
			} else {
				this.setState({ errors });
			}
		} else {
			const { errors, isValid } = userValidator.loginPhone({
				phone: email,
				password: password
			});
			if (isValid) {
				loginPhone(email, password, (err, data) => {
					if (err) this.setState({ errors: err });
					else {
						// console.log(data);
						this.props.setLoggedIn(data.user);
						this.props.toggleModal();
					}
				});
			} else {
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
					// 	<FormHelperText
					// 	id="component-error-text"
					// 	style={{ color: "red" }}
					// >
					// 	{this.state.errors.offerPercentage}
					// </FormHelperText>
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
					LOGIN
				</Button>
				{errors.msg && (
					<Typography
						variant="caption"
						style={{ color: theme.palette.ternary.main, textAlign: "center" }}
					>
						{errors.msg}
					</Typography>
				)}
			</form>
		);
	}
}

LoginModal.propTypes = {
	classes: PropTypes.object.isRequired,
	theme: PropTypes.object.isRequired,
	setLoggedIn: PropTypes.func.isRequired,
	toggleModal: PropTypes.func.isRequired
};

const consumerComponent = props => (
	<UserContext.Consumer>
		{({ setLoggedIn, toggleLogin }) => <LoginModal {...props} setLoggedIn={setLoggedIn} toggleModal={toggleLogin}/>}
	</UserContext.Consumer>
);

export default withStyles(styles, { withTheme: true })(consumerComponent);
