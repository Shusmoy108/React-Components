import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Popper from "@material-ui/core/Popper";
import Typography from "@material-ui/core/Typography";
import Fade from "@material-ui/core/Fade";
import Paper from "@material-ui/core/Paper";

const styles = theme => ({
    typography: {},
    divider: {
        padding: "18px 0",
        fontSize: "16px",
        color: theme.palette.writing.main
    },
    container: {
        padding: "18px",
        fontSize: "18px",
        color: theme.palette.writing.main
    },
    itemName: {
        color: theme.palette.writing.main,
        display: "inline-block",
        paddingRight: "2px",
        paddingBottom: "0",
        marginBottom: "0",
        fontSize: "18px",
        "&:hover": {
            color: theme.palette.primary.main
        }
    },
    root: {
        cursor: "pointer",
        marginRight: 16
    },
    imageStyle: {}
});

class HeaderOption extends React.Component {
    state = {
        anchorEl: null,
        open: false,
        placement: null,
        categoryName: "Gift Items",
        data: [],
        image: null
    };

    handleClick = placement => event => {
        const { currentTarget } = event;
        this.setState(state => ({
            anchorEl: currentTarget,
            open: state.placement !== placement || !state.open,
            placement
        }));
    };

    handleClose = () => {
        this.setState(state => ({
            open: !state.open
        }));
    };

    handleImage = name => {
        let imageLinkHover = "/images/products/" + name;
        this.setState({ image: imageLinkHover });
    };

    handleDoNothing = () => { };

    render() {
        const { classes, theme, data } = this.props;

        const { anchorEl, open, placement } = this.state;
        const id = open ? "simple-popper" : null;
        const onMouse = open
            ? {
                borderBottom: "2px solid " + theme.palette.primary.main
            }
            : {
                borderBottom: "2px solid " + theme.palette.common.white
            };

        const offer = {
            display: "inline-block",
            fontSize: "12px",
            color: theme.palette.secondary.main
        };

        let dataArray = [];
        let arr = [];
        for (let i = 0; i < data.length; i += 5) {
            for (let j = 0; j < 5; j++) {
                if (i + j === data.length) break;
                arr.push(data[i + j]);
            }
            dataArray.push(arr);
            arr = [];
        }

        let box = (
            <div>
                <div style={{ display: "flex" }} className={classes.container}>
                    {dataArray.map((subBox, i) => {
                        return (
                            <div key={i} style={{ display: "flex", flexFlow: "column" }}>
                                {subBox.map(item => {
                                    return (
                                        <div key={item._id} style={{ width: 200, height: 45 }}>
                                            <a
                                                href={item.name}
                                                className={classes.itemName}
                                                onMouseEnter={() =>
                                                    this.handleImage(item.imageLinkHover)
                                                }
                                            >
                                                {item.name}
                                            </a>
                                            {item.offerAvailable && (
                                                <div style={offer}>{item.offerPercentage} % off</div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        );
                    })}
                    <div>
                        <img
                            src={
                                this.state.image
                                    ? this.state.image
                                    : "images/products/" + dataArray[0][0].imageLinkHover
                            }
                            alt="Product"
                            style={{
                                maxWidth: "220px",
                                maxHeight: "220px",
                                width: "auto",
                                height: "auto",
                                overflow: "hidden"
                            }}
                        />
                    </div>
                </div>
            </div>
        );

        return (
            <div
                onMouseLeave={this.handleClose}
                onMouseEnter={this.handleClick("bottom-start")}
                className={classes.root}
            >
                <Typography className={classes.divider} style={onMouse}>
                    {this.props.categoryName}
                </Typography>

                <Popper
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    placement={placement}
                    transition
                    style={{ zIndex: 400 }}
                >
                    {({ TransitionProps }) => (
                        <Fade {...TransitionProps} timeout={100}>
                            <Paper>{box}</Paper>
                        </Fade>
                    )}
                </Popper>
            </div>
        );
    }
}

HeaderOption.propTypes = {
    classes: PropTypes.object.isRequired
};
export default withStyles(styles, { withTheme: true })(HeaderOption);
