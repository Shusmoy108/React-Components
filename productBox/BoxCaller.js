import React, { Component } from "react";
import PropTypes from "prop-types";
import Box from "./Box";
import { withStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import classNames from "classnames";
import Typography from "@material-ui/core/Typography";
import { Hidden } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

const styles = theme => ({
    layout: {
        margin: "0 7%",
        [theme.breakpoints.down("sm")]: {
            margin: "0px 5%"
        }
    },
    cardGrid: {
        padding: `${theme.spacing.unit * 4}px 0`
    },
    Button: {
        margin: theme.spacing.unit,
        display: "flex",
        justifyContent: "center",
        alignItems: "middle"
    }
});

class cardCaller extends Component {
    state = {
        images: [],
        itemNum: 8
    };
    itemNumChange = () => {
        this.setState(prevState => ({ itemNum: prevState.itemNum + 4 }));
    };
    render() {
        const { classes } = this.props;

        let products = [
            {
                productName: "Mug",
                category: "Strange",
                Rating: 4.0,
                startingAt: 200,
                offerAvailable: false,
                offerPercentage: 0,
                link: "http://localhost:8000/images/1.jpg"
            },
            {
                productName: "T-shirt",
                category: "Strange",
                Rating: 4.1,
                startingAt: 300,
                offerAvailable: true,
                offerPercentage: 30,
                link: "http://localhost:8000/images/2.jpg"
            },
            {
                productName: "Anniversary Card",
                category: "Strange",
                Rating: 4.2,
                startingAt: 100,
                offerAvailable: false,
                offerPercentage: 0,
                link: "http://localhost:8000/images/3.jpg"
            },
            {
                productName: "Banner",
                category: "Strange",
                Rating: 4.3,
                startingAt: 500,
                offerAvailable: true,
                offerPercentage: 40,
                link: "http://localhost:8000/images/4.jpg"
            },
            {
                productName: "Pen",
                category: "Strange",
                Rating: 4.4,
                startingAt: 150,
                offerAvailable: false,
                offerPercentage: 0,
                link: "http://localhost:8000/images/5.jpg"
            },
            {
                productName: "Key Ring",
                category: "Strange",
                Rating: 4.5,
                startingAt: 100,
                offerAvailable: false,
                link: "http://localhost:8000/images/6.jpg"
            },
            {
                productName: "Envelope",
                category: "Strange",
                Rating: 4.6,
                startingAt: 50,
                offerAvailable: false,
                offerPercentage: 0,
                link: "http://localhost:8000/images/7.jpg"
            },
            {
                productName: "Business Card",
                category: "Strange",
                Rating: 4.7,
                startingAt: 500,
                offerAvailable: false,
                offerPercentage: 0,
                link: "http://localhost:8000/images/8.jpg"
            },
            {
                productName: "File Holder",
                category: "Strange",
                Rating: 4.8,
                startingAt: 200,
                offerAvailable: false,
                offerPercentage: 0,
                link: "http://localhost:8000/images/9.jpg"
            },
            {
                productName: "Envelope",
                category: "Strange",
                Rating: 4.9,
                startingAt: 150,
                offerAvailable: false,
                offerPercentage: 0,
                link: "http://localhost:8000/images/10.jpg"
            }
        ];

        return (
            <div className={classNames(classes.layout, classes.cardGrid)}>
                <Grid container >
                    <Hidden mdDown>
                        <Grid item lg={1} />
                    </Hidden>
                    <Grid item xs={12} sm={12} md={12} lg={10} >
                        <Typography variant="h4" gutterBottom>
                            Gift Items
                </Typography>
                        <hr />
                    </Grid>
                    <Hidden mdDown>
                        <Grid item lg={1} />
                    </Hidden>
                </Grid>
                <Box cards={products.slice(0, this.state.itemNum)} />
                <div className={classes.Button}>
                    <Button
                        onClick={this.itemNumChange}
                        variant="outlined"
                        color="primary"
                        className={classes.Button}
                    >
                        Show More
          </Button>
                </div>
            </div>
        );
    }
}
cardCaller.propTypes = {
    classes: PropTypes.object.isRequired
};
export default withStyles(styles)(cardCaller);
