import { fade } from "@material-ui/core/styles/colorManipulator";

const styles = theme => ({
  root: {
    width: "100%"
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    display: "none",
    [theme.breakpoints.down("xs")]: {
      display: "flex"
    }
  },
  title: {
    display: "flex"
  },
  color: {
    backgroundColor: theme.palette.common.white
  },
  toolbar: {
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
  avatarIcon: {
    borderRadius: "20px"
  },
  avatar: {
    cursor: "pointer",
    padding: "10% 0%",
    display: "flex",
    flexDirection: "column"
  },
  profile: {
    display: "flex",
    flexDirection: "column",
    
  },
  avatarButton: {
    textTransform: "capitalize",
    position: "relative",
    padding: "10% 5% 10% 10%",
    display: "flex",
    justifyContent: "flex-start",
    minWidth: "150px",
    
  },
  info: {
    color: theme.palette.writing.main,
    marginLeft: 16
  },
  itemName: {
		color: theme.palette.writing.main,
		display: "inline-block",
		paddingRight: "2px",
		paddingBottom: "0",
		marginBottom: "0",
		fontSize: "14px",
		"&:hover": {
			color: theme.palette.primary.main
    },
    margin: '0px 16px',
    textDecoration: 'none'
	}
});

export default styles;
