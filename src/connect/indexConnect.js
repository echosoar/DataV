module.exports = {
  mapStateToProps: state => {
    console.log("state", state)
    return {
      libraryOpen: state.libraryReducer.libraryOpen || false,
      addLibararyData: state.libraryReducer.addLibararyData || false
    }
  }
}
