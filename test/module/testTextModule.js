if(window.datavModule && !window.datavModule.testTextModule) {
  window.datavModule.testTextModule = {
    click: (e, that, hashName, modulepath) => {
      let newState = that.deepClone( that.state );
      if( !newState[modulepath].count ) newState[modulepath].count = 0;
      newState[modulepath].count ++;
      that.setState(newState);
    }
  }
}
