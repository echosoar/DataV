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
      return Object.assign({}, state, {
        addLibararyData:action.data
      });
      break;
    default: return state;
  }
};

module.exports = libraryReducer;
