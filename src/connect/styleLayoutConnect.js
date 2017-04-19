module.exports = {
  mapStateToProps: state => {
    return {
      styleData: state.styleReducer.styleData || [],
      elementPath: state.styleReducer.elementPath || false
    }
  }
}
