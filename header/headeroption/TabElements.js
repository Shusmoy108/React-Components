import React from "react";
import { withStyles } from "@material-ui/core/styles";
const styles = theme => ({
    root: {
        padding: "15px"
    },
    itemName: {
        cursor: "pointer",
        color: theme.palette.writing.main,
        display: "inline-block",
        paddingRight: "2px",
        paddingBottom: "0",
        marginBottom: "0",
        fontSize: "18px",

        "&:hover": {
            color: theme.palette.primary.main
            //borderBottom: "2px solid " + theme.palette.primary.main
        }
    }
});
class TabContainer extends React.Component {
    state = {};
    render() {
        const { classes, theme, data } = this.props;
        const offer = {
            display: "inline-block",
            fontSize: "12px",
            color: theme.palette.secondary.main
        };
        return (
            <div>
                {data.map((item, contentIndex) => {
                    return (
                        <div className={classes.root} key={contentIndex}>
                            <a href={item.name} className={classes.itemName}>{item.name}</a>
                            {item.offerAvailable && (
                                <div style={offer}>
                                    {item.offerPercentage} % off
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        );
    }
}
TabContainer.propTypes = {};
export default withStyles(styles, { withTheme: true })(TabContainer);
