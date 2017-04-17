'use strict';

const defaultState = {
  libraryOpen: false
}

const libraryReducer = (state = defaultState, action = {}) => {
  const { type } = action;
  switch (type) {
    case 'LIBRARY_OPEN_LAYOUT':
      return Object.assign({}, state, {
        libraryOpen: 'layout'
      });
      break;
    case 'LIBRARY_OPEN_MODULE':
      return Object.assign({}, state, {
        libraryOpen: 'module'
      });
      break;
    case 'LIBRARY_CLOSE':
      return Object.assign({}, state, {
        libraryOpen: false
      });
      break;
    default: return state;
  }
};

module.exports = libraryReducer;
