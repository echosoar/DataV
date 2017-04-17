module.exports = {
  mapStateToProps: state => {
    console.log("state", state)
    return {
      libraryOpen: state.libraryReducer.libraryOpen || false,
      layoutData: state.libraryReducer.layoutData || false
    }
  }
}
