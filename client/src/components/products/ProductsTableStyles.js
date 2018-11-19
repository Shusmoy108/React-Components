const ProductsTableStyles = theme => ({
    root: {
        width: "96%",
        margin: "2%"
    },
    table: {
        minWidth: 500
    },
    row: {
        "&:nth-of-type(odd)": {
            backgroundColor: theme.palette.background.default
        }
    },
    tableWrapper: {
        overflowX: "auto"
    },
    paragraph: {
        margin: 0
    },
    button: {
        margin: theme.spacing.unit,
        minWidth: 0,
        padding: "4px 8px"
    },
    top: {
        display: "flex",
        justifyContent: "flex-end"
    },
    top_search: {
        display: "flex",
        justifyContent: "space-between"
    },
    image: {
        display: "flex",
        alignItems: "center"
    },
    error: {
        color: "red",
        margin: 18
    }
});

export default ProductsTableStyles;
