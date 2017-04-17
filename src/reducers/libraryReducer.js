'use strict';

const defaultState = {
  libraryOpen: false
}

const libraryReducer = (state = defaultState, action = {}) => {
  const { type } = action;
  switch (type) {
    case 'LIBRARY_OPEN_LAYOUT':
      return Object.assign({}, state, {
        libraryOpen: 'layout',
        onlyLayout: action.onlyLayout || false
      });
      break;
    case 'LIBRARY_OPEN_MODULE':
      return Object.assign({}, state, {
        libraryOpen: 'module'
      });
      break;
    case 'LIBRARY_OPEN_VIEWMODULE':
      return Object.assign({}, state, {
        libraryOpen: 'viewmodule'
      });
      break;
    case 'LIBRARY_CLOSE':
      return Object.assign({}, state, {
        libraryOpen: false
      });
      break;
    case 'ADD_LIBRARY':
      console.log('ADD_LIBRARY', state, action);
      let path = state.nowLayoutPath;
      if(!path) {
        state.layoutData = action.data;
      }
      return Object.assign({}, state);
      break;
    case 'LAYOUT_CHANGE_PATH':
      return Object.assign({}, state, {
        nowLayoutPath: action.path
      });
    default: return state;
  }
};

module.exports = libraryReducer;
