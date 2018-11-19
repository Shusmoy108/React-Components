import React from "react";
import PropTypes from "prop-types";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
import styles from "./cardStyles";
import withWidth from "@material-ui/core/withWidth";
import { Link } from "react-router-dom";
import StarIcon from "@material-ui/icons/Star";
const ProductCard = props => ({
  render() {
    const { classes, details } = this.props;
    const width = this.props.width;
    // console.log(this.props.details, "card");
    let link1 = "img/14.svg";

    return (
      <div className={classes.root}>
        <Card className={classes.card}>
          {details.offerAvailable ? (
            <CardMedia className={classes.offer} image={link1}>
              <div align="center" className={classes.offerText}>
                {details.offerPercentage}% OFF
              </div>
            </CardMedia>
          ) : (
            ""
          )}

          <CardMedia
            className={classes.media}
            image={details.link}
            component={Link}
            to="/productPage"
          />

          <div className={classes.CardContent}>
            <Typography
              noWrap
              style={
                width === "xs" ? { paddingTop: "6%" } : { paddingTop: "3%" }
              }
              variant={width === "xs" ? "subtitle1" : "h6"}
              className={classes.title}
              component={Link}
              to="/productPage"
            >
              {details.productName}
            </Typography>
          </div>

          <div className={classes.CardContent}>
            <div className={classes.rating}>
              <Icon
                fontSize={width === "xs" ? "small" : "default"}
                className={classes.star}
              >
                <StarIcon />
              </Icon>
              <div style={{ display: "inline-block" }}>{details.Rating}</div>
            </div>

            <div className={classes.price}>
              {details.offerAvailable ? (
                <div>
                  @BDT <del>{details.startingAt}</del>{" "}
                  {details.startingAt -
                    (details.startingAt * details.offerPercentage) / 100}
                </div>
              ) : (
                <div>@BDT {details.startingAt}</div>
              )}
            </div>
          </div>
        </Card>
      </div>
    );
  }
});

ProductCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withWidth()(withStyles(styles)(ProductCard));
