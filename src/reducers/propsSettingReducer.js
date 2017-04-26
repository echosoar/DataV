'use strict';

import { Modal } from 'antd';
const defaultState = {};
const deepClone = require('deepclone');


const propsSettingReducer = (preState = defaultState, action = {}) => {
  const { type } = action;
  let state = deepClone(preState);
  switch (type) {
    case 'MODULE_PROPS_OPEN':
      return Object.assign({}, state, {
        propsSettingOpen: true,
        propsData: action.props,
        propsPath: action.path
      });
      break;
    case 'MODULE_PROPS_CLOSE':
      return  Object.assign({}, state, {
        propsSettingOpen: false
      });
      break;
    default: return state;
  }
};

module.exports = propsSettingReducer;
