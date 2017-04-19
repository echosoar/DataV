module.exports = {
  mapStateToProps: state => {
    return {
      styleOpen: state.styleReducer.styleOpen || false
    }
  }
}
