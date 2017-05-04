'use strict';
import { Modal } from 'antd';
const defaultState = {};
const deepClone = require('deepclone');


const windowReducer = (preState = defaultState, action = {}) => {
  const { type } = action;
  let state = deepClone(preState);
  switch (type) {
    case 'WINDOW_CLOSE':
      if(window.ipcRenderer){
        Modal.confirm({
          title: '真的要退出DataV页面编辑器吗?',
          content: '退出后所有未保存的内容都将会被清空',
          onOk: () => {
            window.ipcRenderer.send("exitConfig");
          },
          onCancel() {}
        });
      }
      return state;
      break;
    case 'WINDOW_RETUEN_INDEX':
      location.href = '#index';
      return state;
    case 'WINDOW_SETTING':
      location.href = '#setting';
      return state;
    case 'UPDATE_SYSTEM_CONFIG':
      state.defaultConfig = action.data;
      state.defaultConfigChange = false;
      return state;
    case 'UPDATE_SYSTEM_CONFIG_API':
      state.defaultConfig.api = Object.assign({}, state.defaultConfig.api, action.data);
      state.defaultConfigChange = true;
      if(window.ipcRenderer){
        window.ipcRenderer.send('UPDATE_SYSTEM_CONFIG', JSON.stringify(state.defaultConfig));
      }
      return state;
    case 'PAGE_EDITING_PREVIEW':
      state.isUsePreView = true;
      return state;
    case 'PAGE_EDITING_EDIT':
      state.isUsePreView = false;
      return state;
    case 'GLOBAL_DATA_CONFIG_OPEN':
      state.isDisplayGlobalDataConfigPage = true;
      return state;
    case 'GLOBAL_DATA_CONFIG_CLOSE':
      state.isDisplayGlobalDataConfigPage = false;
      return state;
    default: return state;
  }
};

module.exports = windowReducer;
