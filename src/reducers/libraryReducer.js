'use strict';

const defaultState = {
  libraryOpen: false
}

const libraryReducer = (state = defaultState, action = {}) => {
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
