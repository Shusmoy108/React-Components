const modalStyle= theme => ({
  modal: {
    borderRadius: "0px"
  },
  modalHeader: {
    borderBottom: "none",
    paddingTop: "12px",
    paddingRight: "0px",
    paddingBottom: "0",
    paddingLeft: "12px",
    minHeight: "16.43px",
    marginBottom: 12,
    display: 'flex'
  },
  modalTitle: {
    margin: "0",
    flex: 1
  },
  modalCloseButton: {
    color: "#000",
    marginRight: 12,
    WebkitAppearance: "none",
    padding: "0",
    cursor: "pointer",
    fontSize: "inherit",
    textShadow: "none",
    fontWeight: "700",
    lineHeight: "1",
    float: "right"
  },
  modalClose: {
    width: "16px",
    height: "16px"
  },
  modalBody: {
    paddingTop: "24px",
    paddingRight: "24px",
    paddingBottom: "16px",
    paddingLeft: "24px",
    position: "relative"
  },
  modalFooter: {
    padding: "15px",
    textAlign: "right",
    paddingTop: "16",
    margin: "0",
    display: 'flex',
    alignItems: 'center'
  },
  socialLine: {
  	marginLeft: 12,
  	marginRight: 12,
  	display: 'flex',
    flexFlow: 'column',
    width: '100%'
  },
  paperOverride: {
    margin: 12,
    position: 'fixed',
    top: 50,
    width: "100%",
    maxWidth: 350,
    [theme.breakpoints.down("sm")]: {
      top: 0,
      margin: 0
    }
  }
});

export default modalStyle;
