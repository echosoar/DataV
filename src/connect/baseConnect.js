module.exports = {
  mapStateToProps: state => {
    return {
      libraryOpen: state.libraryReducer.libraryOpen || false,
      layoutData: state.libraryReducer.layoutData || false,
      windowDefaultConfigChange: state.windowReducer.defaultConfigChange || false
    }
  }
}
