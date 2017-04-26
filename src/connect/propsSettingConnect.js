module.exports = {
  mapStateToProps: state => {
    return {
      propsSettingOpen: state.propsSettingReducer.propsSettingOpen || false,
      propsData: state.propsSettingReducer.propsData || {},
      propsPath: state.propsSettingReducer.propsPath || false
    }
  }
}
