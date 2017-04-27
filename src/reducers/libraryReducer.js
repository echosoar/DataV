'use strict';


const deepClone = require('deepclone');

const defaultState = {
  libraryOpen: false
}

/*
index的错用代表添加到指定index后
*/
let fun_changeTemplate = (template, path, data, index) => {
  if(path.length==0) {
    if(data) template.childs.push(data);
    else return false;
    return template;
  }
  if(path.length==1) {
    if(data) {
      let childsIndex = path.shift();
      let childsLength = template.childs[childsIndex].template.childs.length;
      if(data===true) {
        data = deepClone(template.childs[childsIndex]);
        data.template.childs = [];
      }
      if(index == null) {
        template.childs[childsIndex].template.childs.push(data);
      }else{
        if(index< 0) {
          template.childs.unshift(data);
        }else{
          template.childs.splice(index, 0, data);
        }
      }
    } else {
      template.childs.splice(path.shift(), 1);
    }

    return template
  }

  let nowIndex = path.shift();

  let newTemplate = Object.assign({}, template.childs[nowIndex].template);

  template.childs[nowIndex].template = fun_changeTemplate(newTemplate, path, data, index);
  return template;
}

/*修改模板样式*/

let fun_changeTemplateStyle = (template, path, newStyle) => {
  if(path.length==0) {
    let preStyle = template.props.style;
    newStyle.map( styleItem => {
      preStyle[styleItem.key] = styleItem.value;
    });
    template.props.style = preStyle;
    return template;
  }

  if(path.length==1) {
    let childsIndex = path.shift();
    let preStyle = template.childs[childsIndex].template.props.style;
    newStyle.map( styleItem => {
      preStyle[styleItem.key] = styleItem.value;
    });
    template.childs[childsIndex].template.props.style = preStyle;

    return template;
  }
  let nowIndex = path.shift();

  let newTemplate = Object.assign({}, template.childs[nowIndex].template);

  template.childs[nowIndex].template = fun_changeTemplateStyle(newTemplate, path, newStyle);
  return template;
}

/*修改数据*/

let fun_changeData = (template, path, data) => {
  if(path.length==0) {
    return data;
  }
  if(path.length==1) {
    let childsIndex = path.shift();
    template.childs[childsIndex] = data;
    return template;
  }
  let nowIndex = path.shift();

  let newTemplate = Object.assign({}, template.childs[nowIndex].template);

  template.childs[nowIndex].template = fun_changeData(newTemplate, path, data);
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
    case 'INDEX_DELETE_MODULE':
      if(action.path == '0') {
        state.layoutData = false;
      }else{
        let pathArr = action.path.split('-');
        pathArr.shift();
        let temObj = state.layoutData.template;
        state.layoutData.template = fun_changeTemplate(temObj, pathArr, false);
      }
      return state;
    case 'ADD_SAME_MODULE':
      let pathArr = action.path.split('-');
      pathArr.shift();
      let index = pathArr[pathArr.length-1];
      if(!action.isPre) index++;
      let temObj = state.layoutData.template;
      state.layoutData.template = fun_changeTemplate(temObj, pathArr, true, index);
      return state;
    case 'LIBRARY_LAYOUT_STYLE_CHANGE':
      let pathStyleArr = action.path.split('-');
      pathStyleArr.shift();
      state.layoutData.template = fun_changeTemplateStyle(state.layoutData.template, pathStyleArr, action.newStyle);
      return state;
    case 'LIBRARY_MANAGE_OPEN':
      location.href = '#librartManage';
      return state;
    case 'MODULE_PROPS_CHANGE':
      if(action.path == '0') {
        state.layoutData = action.data;
      }else {
        let pathPropsArr = action.path.split('-');
        pathPropsArr.shift();
        state.layoutData.template = fun_changeData(state.layoutData.template, pathPropsArr, action.data);
      }
      return state;
    case 'SITE_DISPLAY_CHANGE':
      if(state.siteDisplay==null) state.siteDisplay = {};
      action.data && action.data.map(item=>{
        state.siteDisplay[item.name] = item.value;
      });
      return state;
    default: return state;
  }
};

module.exports = libraryReducer;
