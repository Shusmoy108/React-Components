import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
const styles = theme => ({
    mapouter: {
        textAlign: "right",
        height: "80%",
        width: "90%",
        overflow: "hidden",
        [theme.breakpoints.between("xs", "md")]: {
            height: "80%",
            width: "90%"
        },
        [theme.breakpoints.down("xs")]: {
            height: theme.spacing.unit * 20,
            width: "100%"
        }
    },
    gmap_canvas: {
        overflow: "hidden",
        background: "none",
        height: "80%",
        width: "90%",
        [theme.breakpoints.between("xs", "md")]: {
            height: "80%",
            width: "90%"
        },

        [theme.breakpoints.down("xs")]: {
            height: theme.spacing.unit * 20,
            width: "100%"
        }
    },
    image: {
        height: "80%",
        width: "90%",
        // paddingBottom: 30,
        // paddingTop: 10,
        [theme.breakpoints.between("xs", "md")]: {
            height: "80%",
            width: "90%"
        },
        [theme.breakpoints.down("xs")]: {
            height: theme.spacing.unit * 20,
            width: "100%"
        }
    }
});
class Map extends Component {
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.mapouter}>
                <div className={classes.gmap_canvas}>
                    <iframe
                        title="location"
                        className={classes.image}
                        id="gmap_canvas"
                        src="https://maps.google.com/maps?q=al%20razi%20complex&t=&z=13&ie=UTF8&iwloc=&output=embed"
                        frameBorder="0"
                        scrolling="no"
                        marginHeight="0"
                        marginWidth="0"
                    />
                </div>
            </div>
        );
    }
}
export default withStyles(styles)(Map);
