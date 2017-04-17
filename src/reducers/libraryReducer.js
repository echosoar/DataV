'use strict';
const libraryReducer = (state = {}, action = {}) => {
  const { type } = action;
  switch (type) {
    case 'OPEN_LAYOUT':
      return Object.assign({}, state, {
        libraryOpen: 'layout'
      });
    default: return state;
  }
};

module.exports = libraryReducer;
