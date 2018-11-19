import { fade } from "@material-ui/core/styles/colorManipulator";
import boxShadow from "assets/common";

const styles = theme => ({
	root: {
		width: "100%",
	},
	grow: {
		flexGrow: 1
	},
	menuButton: {
		marginLeft: -12,
		marginRight: 20
	},
	title: {
		display: "flex"
	},
	color: {
		backgroundColor: theme.palette.common.white,
		boxShadow: boxShadow,
	},
	toolbar: {
		//display: "flex",
		padding: "0px 10%",
		[theme.breakpoints.down("xs")]: {
			padding: "0px 0px"
		}
	},
	search: {
		position: "relative",
		borderRadius: theme.shape.borderRadius,
		backgroundColor: fade(theme.palette.common.white, 0.15),
		"&:hover": {
			backgroundColor: fade(theme.palette.common.white, 0.25)
		},
		marginRight: theme.spacing.unit * 2,
		marginLeft: 0,
		width: "100%",
		[theme.breakpoints.up("sm")]: {
			marginLeft: theme.spacing.unit * 3,
			width: "auto"
		}
	},
	searchIcon: {
		width: theme.spacing.unit * 9,
		height: "100%",
		position: "absolute",
		pointerEvents: "none",
		display: "flex",
		alignItems: "center",
		justifyContent: "center"
	},
	inputRoot: {
		color: "inherit",
		width: "100%"
	},
	inputInput: {
		paddingTop: theme.spacing.unit,
		paddingRight: theme.spacing.unit,
		paddingBottom: theme.spacing.unit,
		paddingLeft: theme.spacing.unit * 10,
		transition: theme.transitions.create("width"),
		width: "100%",
		[theme.breakpoints.up("md")]: {
			width: 200
		}
	},
	sectionDesktop: {
		display: "none",
		[theme.breakpoints.up("md")]: {
			display: "flex"
		}
	},
	sectionMobile: {
		display: "flex",
		[theme.breakpoints.up("md")]: {
			display: "none"
		}
	},
	buttonHide: {
		display: "none",
		[theme.breakpoints.down("sm")]: {
			display: "flex"
		}
	},
	button: {
		display: "flex"
  },
  searchInput: {
    width: '100%',
    maxWidth:  400
  }
});

export default styles;
