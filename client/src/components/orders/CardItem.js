import React from "react";
import { withStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import Typography from "@material-ui/core/Typography";
import Collapse from "@material-ui/core/Collapse";

import { TableStyles } from "./Styles";
import { OrderConsumer } from "contexts/orderContext";

const CardItem = (props) => {
    const { classes, expanded, id, template } = props;
    return (
        <React.Fragment>
            <TableCell colSpan="1">
                <Collapse in={expanded[id]} timeout="auto" unmountOnExit>
                    <img
                        className={classes.img}
                        src={
                            template.designedPicture.search("images") > -1
                                ? template.designedPicture
                                : "images/" + template.designedPicture
                        }
                        alt={template.designedPicture}
                    />
                </Collapse>
            </TableCell>

            <TableCell colSpan="1">
                <Collapse in={expanded[id]} timeout="auto" unmountOnExit>
                    <b>{template.templateName}</b>
                    <Typography variant="caption" gutterBottom>
                        {template.quantity}
                    </Typography>
                </Collapse>
            </TableCell>
            <TableCell colSpan="1">
                <Collapse in={expanded[id]} timeout="auto" unmountOnExit>
                    <Typography variant="caption" gutterBottom>
                        {template.total}
                        <br />
                        {template.offerAvailable
                            ? template.offerPercentage + "%"
                            : null}
                    </Typography>
                </Collapse>
            </TableCell>
            <TableCell colSpan="1">
                <Collapse in={expanded[id]} timeout="auto" unmountOnExit>
                    {template.productName}
                </Collapse>
            </TableCell>
        </React.Fragment>
    );
};

const consumerComponent = (props) => (
    <OrderConsumer>
        {({ expanded }) => {
            let data = {
                ...props,
                expanded
            };
            return <CardItem {...data} />;
        }}
    </OrderConsumer>
);

export default withStyles(TableStyles, { withTheme: true })(consumerComponent);
