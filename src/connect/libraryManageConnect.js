module.exports = {
  mapStateToProps: state => {
    return {
      defaultConfig: state.windowReducer.defaultConfig || false
    }
  }
}
