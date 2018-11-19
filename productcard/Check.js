import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import Card from "./Card";

const styles = theme => ({
  layout: {
    width: "auto",
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1300 + theme.spacing.unit * 3 * 2)]: {
      width: 1300,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  cardGrid: {
    padding: `${theme.spacing.unit * 8}px 0`
  }
});

class Album extends Component {
  state = {};

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
      <React.Fragment>
        <main>
          <div className={classNames(classes.layout, classes.cardGrid)}>
            <Grid container spacing={24}>
              {products.map((card, i) => (
                <Grid item key={i} sm={4} md={4} lg={3} xs={6}>
                  <Card details={card} />
                </Grid>
              ))}
            </Grid>
          </div>
        </main>
      </React.Fragment>
    );
  }
}

Album.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Album);
