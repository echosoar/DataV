'use strict';


const deepClone = require('deepclone');

const defaultState = {
  libraryOpen: false
}


let fun_changeTemplate = (template, path, data) => {
  if(path.length==1) {
    if(data) {
      template.childs[path.shift()].template.childs.push(data);
    } else {
      template.childs.splice(path.shift(), 1);
    }

    return template
  }

  let nowIndex = path.shift();

  let newTemplate = Object.assign({}, template.childs[nowIndex].template);

  template.childs[nowIndex].template = fun_changeTemplate(newTemplate, path, data);
  return template;
}

const libraryReducer = (preState = defaultState, action = {}) => {
  const { type } = action;
  let state = deepClone(preState);
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
      let data =action.data;
      let path = state.nowLayoutPath;
      if(!path) {
        state.layoutData = data;
      }else{
        let pathArr = path.split('-');
        pathArr.shift();
        let temObj = state.layoutData.template;
        state.layoutData.template = fun_changeTemplate(temObj, pathArr, data);
      }
      return Object.assign({}, state);
      break;
    case 'LAYOUT_CHANGE_PATH':
      return Object.assign({}, state, {
        nowLayoutPath: action.path
      });
      break;
    case 'INDEX_DELETE_MODULE':
      if(action.path == '0') {
        state.layoutData = false;
      }else{
        let pathArr = action.path.split('-');
        console.clear();
        console.log(action.path);
        pathArr.shift();
        let temObj = state.layoutData.template;
        state.layoutData.template = fun_changeTemplate(temObj, pathArr, false);
      }
      console.log(state)
      return Object.assign({}, state, {
        date: new Date()
      });
      break;
    default: return state;
  }
};

module.exports = libraryReducer;
