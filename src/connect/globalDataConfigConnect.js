module.exports = {
  mapStateToProps: state => {
    return {
      layoutData: state.libraryReducer.layoutData || false,
      layoutInfo: state.libraryReducer.layoutInfo,
      siteDisplay: state.libraryReducer.siteDisplay || {},
      datavGlobalData: state.libraryReducer.datavGlobalData || {}
    }
  }
}
