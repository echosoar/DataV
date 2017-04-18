'use strict';


const deepClone = require('deepclone');

const defaultState = {
  libraryOpen: false
}


let fun_changeTemplate = (template, path, data) => {
  if(path.length==1) {
    template.childs[path.shift()].template.childs.push(data);
    return template
  }

  let nowIndex = path.shift();
  console.log("new data", data)


  let newTemplate = Object.assign({}, template.childs[nowIndex].template);

  template.childs[nowIndex].template = fun_changeTemplate(newTemplate, path, data);
  return template;
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
      //console.log('ADD_LIBRARY', state, action);
      let data = deepClone(action.data);
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
    default: return state;
  }
};

module.exports = libraryReducer;
