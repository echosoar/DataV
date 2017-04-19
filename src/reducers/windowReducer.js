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

    default: return state;
  }
};

module.exports = windowReducer;
