import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import { ProductsConsumer } from "../../contexts/ProductsContext";

const styles = {
    root: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center"
    },
    card: {
        width: 150,
        margin: 10
    },
    media: {
        height: 150
    }
};

const MediaCard = props => {
    const { classes, fileNames, handleImageReplace } = props;
    return (
        <div className={classes.root}>
            {fileNames.map((item, i) => (
                <Card
                    className={classes.card}
                    key={i}
                    onClick={() => handleImageReplace(item)}
                >
                    <CardActionArea>
                        <CardMedia
                            className={classes.media}
                            image={"images/products/" + item}
                            title="Contemplative Reptile"
                        />
                    </CardActionArea>
                </Card>
            ))}
        </div>
    );
};

MediaCard.propTypes = {
    classes: PropTypes.object.isRequired
};

const consumerComponent = props => (
    <ProductsConsumer>
        {({ fileNames, handleImageReplace }) => {
            let data = {
                fileNames,
                handleImageReplace
            };
            return <MediaCard {...{ ...props, ...data }} />;
        }}
    </ProductsConsumer>
);

export default withStyles(styles)(consumerComponent);
