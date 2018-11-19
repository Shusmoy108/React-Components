import React from "react";
import { withStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import Typography from "@material-ui/core/Typography";

import { TableStyles } from "./Styles";
import { OrderConsumer } from "contexts/orderContext";

const Card = props => {
    const { row } = props;
    let total = 0;
    let temp = row.items.map((template, j) => {
        total += template.total;
        return (
            <div key={j}>
                <b>{template.templateName} </b>
                <Typography variant="caption" gutterBottom>
                    {template.quantity}
                </Typography>
            </div>
        );
    });
    return (
        <React.Fragment>
            <TableCell>
                <b>{row.orderId}</b>
                <p>{row.userId}</p>
                <p>{row.delivery.name}</p>
                <p>{row.delivery.phone}</p>
                <p>{row.createdAt.slice(0, 10)}</p>
            </TableCell>
            <TableCell>{temp}</TableCell>
            <TableCell>{total}</TableCell>
            <TableCell>
                <b>{row.delivery.name}</b>
                <p>{row.delivery.phone}</p>
                <div>
                    <span>{row.delivery.region}, </span>
                    <span>{row.delivery.area}, </span>
                    <span>{row.delivery.city}</span>
                </div>
                <p>{row.delivery.address}</p>
            </TableCell>
        </React.Fragment>
    );
};

const consumerComponent = props => (
    <OrderConsumer>
        {({ handleLockClick }) => {
            let data = {
                ...props,
                handleLockClick
            };
            return <Card {...data} />;
        }}
    </OrderConsumer>
);

export default withStyles(TableStyles, { withTheme: true })(consumerComponent);
