const styles = theme => ({
    container: {
      display: 'flex',
      flexFlow: 'column',
      flexWrap: 'wrap',
      paddingTop: 12,
      paddingBottom: 24,
      paddingLeft: 24,
      paddingRight: 24,
      padding: 12,
      overFlow: 'auto'
    },
    content: {
      marginTop: 16,
    },
    inputField: {
      fontSize: "1.2rem"
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: 200,
    },
    menu: {
      width: 200,
    },
    margin: {
      marginBottom: 4,
      marginTop: 12
    },
    paperOverride: {
        display: 'flex',
        flexDirection: 'column',
        margin: 12,
        position: 'relative',
        overflowY: 'auto',
        // Fix IE11 issue, to remove at some point.
        // We disable the focus ring for mouse, touch and keyboard users.
        outline: 'none'
      }
  });
  
  export default styles;