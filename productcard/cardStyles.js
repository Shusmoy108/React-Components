const styles = theme => ({
  root: {
    [theme.breakpoints.down("xs")]: {
      fontSize: "0.688em"
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "0.875em"
    },
    [theme.breakpoints.up("lg")]: {
      fontSize: "1.0em"
    }
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    position: "relative"
  },
  offer: {
    height: "5%",
    width: "40%",
    position: "absolute",

    zIndex: 200,
    top: "5%",
    left: "-8%",
    transform: "rotate(315deg)"
  },
  offerText: {
    //paddingLeft: "10%",
    [theme.breakpoints.down("xs")]: {
      fontSize: "0.625em"
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "0.875em"
    },
    [theme.breakpoints.up("lg")]: {
      fontSize: "0.875em"
    },
    display: "block",
    color: "#ffffff"
  },

  media: {
    paddingTop: "100%",
    position: "relative",
    "&:hover": {
      transform: "scale(1.05)",
      cursor: "pointer"
    },
    // transition: theme.transitions.create("scale"),
    transition: "transform 0.5s",
    zIndex: 100
  },
  CardContent: {
    padding: "0% 3%",
    display: "flex",
    flexDirection: "row"
  },
  title: {
    "&:hover": {
      color: theme.palette.primary.main,
      cursor: "pointer"
    },
    transition: "color 0.8s",
    textDecoration: 'none'
  },
  star: {
    display: "inline-block",
    verticalAlign: "middle",
    paddingBottom: "29px"
  },
  rating: {
    color: theme.palette.secondary.main
  },
  price: {
    display: "block",
    marginLeft: "auto",
    paddingTop: 6,
    [theme.breakpoints.up("sm")]: {
      marginRight: "2%"
    },
    [theme.breakpoints.down("xs")]: {
      paddingTop: "3%"
    }
  }
});

export default styles;
