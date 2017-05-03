module.exports = {
  mapStateToProps: state => {
    return {
      pagesListApi: state.windowReducer.defaultConfig && state.windowReducer.defaultConfig.api && state.windowReducer.defaultConfig.api.pageDataList || false,
      layoutData: state.libraryReducer.layoutData || false,
      layoutInfo: state.libraryReducer.layoutInfo,
      defaultConfig: state.windowReducer.defaultConfig || false
    }
  }
}
