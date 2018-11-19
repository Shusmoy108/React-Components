import { fade } from "@material-ui/core/styles/colorManipulator";
import boxShadow from "assets/common";

const styles = theme => ({
    root: {
        width: "100%"
    },
    color: {
        backgroundColor: theme.palette.common.white
    },
    toolbar: {
        padding: "0px 7%",
        [theme.breakpoints.down("md")]: {
            padding: "0px 24px"
        },
        [theme.breakpoints.down("xs")]: {
            padding: "0px 0px",
            minHeight: 0
        }
    },
    icon: {
        borderRadius: "0", padding: "5px 16px",
        [theme.breakpoints.down("xs")]: {
            padding: "5px 8px"
        }
    },
    sectionDesktop: {
        display: "none",
        [theme.breakpoints.up("md")]: {
            display: "flex"
        }
    },
    searchIcon: {
        width: theme.spacing.unit * 9,
        height: "100%",
        position: "absolute",
        pointerEvents: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    imgShow: {
        transition: "opacity 0.3s ease-out",
        [theme.breakpoints.up('md')]:
        {
            display: 'none'

        },
    },
    searchInput: {
        width: '100%',
        maxWidth: 200,
        transition: 'all .4s linear',
        marginRight: '8px',
        // "&:focus-within": {
        //     "& $infoHeader": {
        //         display: "none",
        //         fontSize: 55
        //     },
        //     maxWidth: 200,

        // },
        [theme.breakpoints.down(1100)]:
        {
            maxWidth: 0,

        },

    },
    search: {
        [theme.breakpoints.down(1100)]:
        {
            display: 'none',

        },
    },

    info: {
        visibility: 'visible'
    },
    infoHeader: {
        display: "block",
        color: theme.palette.writing.main,
        marginLeft: 16
    },
    searchButton: {

        display: 'none',
        borderRadius: "0",
        [theme.breakpoints.down("xs")]: {
            padding: "12px 8px"
        },
        [theme.breakpoints.down(1100)]:
        {
            display: "flex",
            flexDirection: 'column',
            minHeight: 'inherit'
        }
    },
    grow: {
        flexGrow: 1
    },
    button: {
        display: "flex",
        flexDirection: 'column',
        minHeight: 'inherit',
        borderRadius: "0", padding: "5px 16px",
        [theme.breakpoints.down("xs")]: {
            padding: "12px 8px"
        }
    },
    button2: {
        display: "flex",
        flexDirection: 'column',
        minHeight: 'inherit',
        borderRadius: "0", padding: "5px 16px",
        [theme.breakpoints.down("xs")]: {
            display: 'none'
        }
    },
    buttonUser: {
        display: "flex",
        flexDirection: 'column',
        alignItems: 'center'
    },
    writing: {
        color: theme.palette.writing.main,
        fontSize: "12px",
        alignItems: "center",
        justifyContent: "center",
        display: "flex"
    },
    writingName: {
        color: theme.palette.writing.main,
        fontSize: "12px",
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        paddingTop: 4
    },
    avatarIcon: {
        borderRadius: "20px",
        height: 24,
        width: 24
    },
    avatar: {
        cursor: "pointer",
        padding: "10% 0%",
        display: "flex",
        flexDirection: "column",
        alignItems: 'center'
    },
    profile: {
        display: "flex",
        flexDirection: "column",

    },
    avatarButton: {
        textTransform: "capitalize",
        position: "relative",
        padding: "10% 5% 10% 10%",
        display: "flex",
        justifyContent: "flex-start",
        minWidth: "150px",

    },

});

export default styles;