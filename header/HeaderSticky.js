import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { withStyles } from "@material-ui/core/styles";
import styles from "./headerStickyStyles";
import { UserContext } from "contexts/userContext";
import HeaderOptions from "./headeroption/HeaderOptions";
import { IconButton } from "@material-ui/core";
import Cart from "@material-ui/icons/ShoppingCartSharp";
import SearchIcon from "@material-ui/icons/Search";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';

class HeaderSticky extends React.Component {
	state = {
		search: true
	};

	handleProfileMenuOpen = event => {
		this.setState({ anchorEl: event.currentTarget });
	};

	handleMenuClose = () => {
		this.setState({ anchorEl: null });
		this.handleMobileMenuClose();
	};

	handleMobileMenuOpen = event => {
		this.setState({ mobileMoreAnchorEl: event.currentTarget });
	};

	handleMobileMenuClose = () => {
		this.setState({ mobileMoreAnchorEl: null });
	};
	handleSearch = () => {
		this.setState({ search: true });
	};
	render() {
		const { classes, toggleCart } = this.props;

		return (
			<div className={classes.root}>
				<AppBar id="main-nav" className={classes.color} position="static">
					<Toolbar className={classes.toolbar}>
						<HeaderOptions />
						<div className={classes.grow} />
						<Input
							placeholder="Search Bigprint"
							className={classes.searchInput}
							startAdornment={
								<InputAdornment position="start">
								  <SearchIcon color="primary" />
								</InputAdornment>
							  }
						/>
						{/* <IconButton
							style={{ borderRadius: "0", height: 64 }}
							color="primary"
							className={classes.buttonHide}
							onClick={this.handleSearch}
						>
							<SearchIcon />
						</IconButton> */}
						<IconButton
							style={{ borderRadius: "0", height: 64 }}
							color="primary"
							className={classes.button}
							onClick={toggleCart}
						>
							<Cart />
						</IconButton>
						<IconButton
							style={{ borderRadius: "0", height: 64 }}
							color="primary"
							className={classes.buttonHide}
							onClick={toggleCart}
						>
							<MoreVertIcon />
						</IconButton>
					</Toolbar>
				</AppBar>
			</div>
		);
	}
}

HeaderSticky.propTypes = {
	classes: PropTypes.object.isRequired
};

const consumerComponent = props => (
	<UserContext.Consumer>
		{({ toggleCart }) => <HeaderSticky {...props} toggleCart={toggleCart} />}
	</UserContext.Consumer>
);

export default withStyles(styles)(consumerComponent);
