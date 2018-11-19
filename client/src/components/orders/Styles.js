const TableStyles = theme => ({
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
        minHeight: 0,
        maxWidth: 100,
        marginLeft: 8,
        padding: "3px 11px",
        border: "1px solid",
        borderRadius: 0,
        fontSize: 15,
        transition: "border-radius 0.35s ease-in",
        "&:hover": {
            border: "1px solid",
            borderRadius: "21px"
        }
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
    },
    option: {
        display: "flex",
        flexDirection: "column"
    },
    expand: {
        transform: "rotate(0deg)",
        transition: theme.transitions.create("transform", {
            duration: theme.transitions.duration.shortest
        }),
        marginLeft: "auto",
        [theme.breakpoints.up("sm")]: {
            marginRight: -8
        }
    },
    expandOpen: {
        transform: "rotate(180deg)"
    },
    items: {
        display: "flex"
    },
    flexOne: {
        flex: 1
    },
    img: {
        width: 75,
        height: 75
    },
    tableRow: {
        height: 0
    }
});

const PaginationStyles = theme => ({
    root: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    margin: {
        margin: "0 3%"
    }
});

const SearchStyles = theme => ({
    top: {
        minHeight: 500
    },
    root: {
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-end",
        flexWrap: "wrap"
    },
    Item: {
        display: "flex",
        alignItems: "flex-end"
    },
    margin: {
        margin: 8
    },
    date: {
        background: "inherit",
        fontFamily: "Arcon",
        fontSize: 15,
        paddingBottom: 5,
        borderBottom: "1px solid",
        borderTop: "none",
        borderRight: "none",
        borderLeft: "none",
        "&:hover": {
            borderBottom: "2px solid"
        },
        "&:focus": {
            outline: 0
        }
    },
    button: {
        margin: theme.spacing.unit,
        minWidth: 0,
        minHeight: 0,
        maxWidth: 100,
        marginLeft: 8,
        padding: 0,
        border: "1px solid",
        borderRadius: 0,
        fontSize: 15,
        transition: "border-radius 0.35s ease-in",
        "&:hover": {
            border: "1px solid",
            borderRadius: "5px"
        }
    }
});

export { TableStyles, PaginationStyles, SearchStyles };
