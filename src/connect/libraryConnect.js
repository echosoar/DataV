module.exports = {
  mapStateToProps: state => {
    return {
      libraryOpen: state.libraryReducer.libraryOpen || false,
      onlyLayout: state.libraryReducer.onlyLayout || false
    }
  }
}
