import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";


import Slider from "react-animated-slider";
import "react-animated-slider/build/horizontal.css";
import "normalize.css/normalize.css";
import "./slider-animations.css";
import "./styles.css";

const content = [
    {
        title: "Vulputate Mollis Ultricies Fermentum Parturient",
        rating: 3,
        description:
            "Aenean eu leo quam.treeeeeeeeeeeeeeee tret 4rt   t4rtrtretr45t  t4545wt",
        button: "View Details",
        image:
            "images/offer/1.jpg",
        userProfile: "https://i.imgur.com/JSW6mEk.png"
    },
    {
        title: "Tortor Dapibus Commodo Aenean Quam",
        description:
            "Nullam id dolor id nibh ultricies vehicula ut id elit. Cras mattis consectetur ",
        button: "View Details",
        image: "images/offer/2.jpg",
        user: "Erich Behrens",
        rating: 3,
        userProfile: "https://i.imgur.com/0Clfnu7.png"
    },
    {
        title: "Phasellus volutpat metus",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        button: "View Details",
        image: "images/offer/3.jpg",
        user: "Bruno Vizovskyy",
        rating: 4,
        userProfile: "https://i.imgur.com/4KeKvtH.png"
    },

    {
        title: "Phasellus volutpat metus",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        button: "View Details",
        image: "images/offer/4.jpg",
        user: "Bruno Vizovskyy",
        rating: 4,
        userProfile: "https://i.imgur.com/4KeKvtH.png"
    }
];

// class component

const styles = theme => ({
    appBar: {
        position: "relative"
    },
    icon: {
        marginRight: theme.spacing.unit * 2
    },
    heroUnit: {
        backgroundColor: theme.palette.background.paper
    },
    heroContent: {
        maxWidth: 600,
        margin: "0 auto",
        padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`
    },
    heroButtons: {
        marginTop: theme.spacing.unit * 4
    },
    responsive: {
        width: "60%",
        height: "auto"
    },
    padding: {
        //  padding: "50%"
    },
    layout: {
        width: "auto",
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
            width: 1100,
            marginLeft: "auto",
            marginRight: "auto"
        }
    },
    cardGrid: {
        padding: `${theme.spacing.unit * 8}px 0`
    },
    card: {
        height: "100%",
        display: "flex",
        flexDirection: "column"
    },
    cardMedia: {
        paddingTop: "56.25%" // 16:9
    },
    cardContent: {
        flexGrow: 1
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing.unit * 6
    },
    media1: {
        transform: "scale(1.1)",
        transition: "transform 0.5s"
        // paddingTop: "56.25%"
    },
    media2: {
        transform: "scale(1)",
        transition: "transform 0.5s"
        // paddingTop: "56.25%"
    },
    root: {
        flexGrow: 1
    },
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: "center",
        color: theme.palette.text.secondary
    },

    main: {
        display: "flex"
    },
    main2: {
        display: "flex",
        flexDirection: "row",

        justifyContent: "left"
    },
    main3: {
        marginLeft: "auto"
    },
    icon1: {
        color: "yellow",

    },
    iconn: {
        color: theme.palette.secondary.main,
        paddingTop: 4
    },
    icon2: {
        color: theme.palette.secondary.main,
        paddingTop: 4,
        display: "inline",
        fontSize: "18px"
    },
    icon3: {
        color: "black",
        paddingTop: 4,
        display: "inline"
    },
    zoom: {
        transform: "scale(1.5)"
    },
    opacity: {
        //   height: 400,
        [theme.breakpoints.up("lg")]: {
            height: "400px"
            // backgroundColor: green[500],
        },
        [theme.breakpoints.down("xs")]: {
            height: "80px",
            marginTop: "40%"
            // backgroundColor: green[500],
        }
    },
    shadow: {
        background: "rgba(0, 0, 0, 0.8)",
        width: "100%",
        height: "100%"
        // filter:"blur(8px)"
    }
});
class OfferCarousel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //   properties: data.properties,
            //   property: data.properties[0],
            //   open: false,
            //   hover: false,
            //   hover2: false
        };
    }

    handleClickOpen = () => {
        console.log("Clicked");
        // this.setState({ open: true });
    };

    handleHoverActive = () => {
        this.setState({ hover: true });
    };
    handleHoverIdle = () => {
        this.setState({ hover: false });
    };
    handleHoverActive2 = () => {
        this.setState({ hover2: true });
    };
    handleHoverIdle2 = () => {
        this.setState({ hover2: false });
    };

    nextProperty = () => {
        this.setState({
            //   property: data.properties[newIndex]
        });
    };

    prevProperty = () => {
        this.setState({
            //   property: data.properties[newIndex]
        });
    };

    loadCarousel = (content, classes) => {
        return content.map((item, index) => {
            return (
                <div
                    key={index}
                    className="slider-content"
                    style={{
                        background: `url('${item.image}') no-repeat center center`,
                        height: '50vh',

                    }}
                >

                </div>
            );
        });
    };

    render() {
        const { classes } = this.props;

        return (

            <div >
                <div className="wrapper" />
                <Slider className="slider-wrapper">
                    {this.loadCarousel(content, classes)}
                </Slider>
            </div>
        );
    }
}

OfferCarousel.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(OfferCarousel);

// export default App;
