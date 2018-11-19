import React, { Component } from "react";
import PropTypes from "prop-types";
import Card from "../productcard/Card";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Hidden } from "@material-ui/core";

const styles = theme => ({
});

class box extends Component {
    state = {
        images: []
    };
    render() {
        //const { classes } = this.props;
        const products = this.props.cards;

        return (
            <Grid container spacing={24}>
                {products.map((card, i) => {
                    if ((i % 5) === 0)
                        return (
                            <React.Fragment key={i}>
                                <Hidden mdDown>
                                    <Grid item lg={1} />
                                </Hidden>
                                <Grid item xs={6} sm={4} md={3} lg={2}>
                                    <Card details={card} />
                                </Grid>
                            </React.Fragment>)
                    else if ((i % 5) === 4) return (
                        <React.Fragment key={i}>
                            <Grid item xs={6} sm={4} md={3} lg={2}>
                                <Card details={card} />
                            </Grid>
                            <Hidden mdDown>
                                <Grid item lg={1} />
                            </Hidden>
                        </React.Fragment>)
                    else
                        return (<Grid item key={i} xs={6} sm={4} md={3} lg={2}>
                            <Card details={card} />
                        </Grid>)
                }
                )}
            </Grid>
        );
    }
}
box.propTypes = {
    classes: PropTypes.object.isRequired
};
export default withStyles(styles)(box);
