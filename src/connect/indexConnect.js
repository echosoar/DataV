module.exports = {
  mapStateToProps: state => {
    return {
      libraryOpen: state.libraryReducer.libraryOpen || false,
      layoutData: state.libraryReducer.layoutData || false,
      datavGlobalData: state.libraryReducer.datavGlobalData || {},
      isUsePreView: state.windowReducer.isUsePreView || false,
      siteDisplay: state.libraryReducer.siteDisplay || {}
    }
  }
}
