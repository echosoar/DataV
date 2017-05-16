module.exports = {
  mapStateToProps: state => {
    return {
      libraryOpen: state.libraryReducer.libraryOpen || false,
      layoutData: state.libraryReducer.layoutData || false,
      doing: state.libraryReducer.doing || [],
      layoutInfo: state.libraryReducer.layoutInfo,
      windowDefaultConfigChange: state.windowReducer.defaultConfigChange || false,
      isUsePreView: state.windowReducer.isUsePreView || false,
      defaultConfig: state.windowReducer.defaultConfig || false,
      isDisplayGlobalDataConfigPage: state.windowReducer.isDisplayGlobalDataConfigPage || false
    }
  }
}
