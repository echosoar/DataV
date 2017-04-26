module.exports = {
  mapStateToProps: state => {
    return {
      libraryOpen: state.libraryReducer.libraryOpen || false,
      layoutData: state.libraryReducer.layoutData || false,
      isUsePreView: state.windowReducer.isUsePreView || false
    }
  }
}
