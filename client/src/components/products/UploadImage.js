import React from "react";
import Button from "@material-ui/core/Button";
import FormHelperText from "@material-ui/core/FormHelperText";

import { ProductsConsumer } from "../../contexts/ProductsContext";

const css = {
    form: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        height: "100%",
        margin: "auto"
    },
    upload: {
        display: "none"
    },
    uploadButton: {
        marginTop: "3%"
    },
    error: {
        color: "red"
    },
    image: {
        height: 355,
        margin: "3% 0"
    }
};

const UploadImage = props => {
    let { handleFileChange, handleImageSubmit, file, error } = props;
    return (
        <form id="imageForm" onSubmit={handleImageSubmit} style={css.form}>
            <img
                style={css.image}
                src={
                    file
                        ? URL.createObjectURL(file)
                        : "https://thumb.ibb.co/knzgQq/no-logo.png"
                }
                alt={
                    file
                        ? URL.createObjectURL(file)
                        : "https://thumb.ibb.co/knzgQq/no-logo.png"
                }
            />
            <input
                accept="image/*"
                style={css.upload}
                id="raised-button-file"
                name="image"
                type="file"
                onChange={handleFileChange}
            />
            <label htmlFor="raised-button-file">
                <Button variant="outlined" color="primary" component="span">
                    Choose Image
                </Button>
            </label>
            <Button
                type="submit"
                color="primary"
                variant="outlined"
                style={css.uploadButton}
            >
                Upload
            </Button>
            {Object.values(error).map((item, i) => (
                <FormHelperText
                    id="component-error-text"
                    key={i}
                    style={css.error}
                >
                    {item}
                </FormHelperText>
            ))}
        </form>
    );
};

const consumerComponent = props => (
    <ProductsConsumer>
        {({
            selectedImage,
            error,
            file,
            setError,
            handleFileChange,
            handleImageSubmit
        }) => {
            let data = {
                selectedImage,
                file,
                error,
                setError,
                handleFileChange,
                handleImageSubmit
            };
            return <UploadImage {...{ ...props, ...data }} />;
        }}
    </ProductsConsumer>
);

export default consumerComponent;
