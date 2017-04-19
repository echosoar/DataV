'use strict';
import { Modal } from 'antd';
const defaultState = {};
const deepClone = require('deepclone');


const styleReducer = (preState = defaultState, action = {}) => {
  const { type } = action;
  let state = deepClone(preState);
  switch (type) {
    case 'STYLE_LAYOUT_OPEN':
      return Object.assign({}, state, {
        styleOpen: 'layout',
        styleData: action.style,
        elementPath: action.path
      });
      break;
    case 'LAYOUT_STYLE_CLOSE':
      return Object.assign({}, state, {
        styleOpen: false,
        styleData: [],
        elementPath: false
      });
      break;
    default: return state;
  }
};

module.exports = styleReducer;
