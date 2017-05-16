'use strict';


const deepClone = require('deepclone');

const defaultState = {
  libraryOpen: false,
  layoutData: null,
  layoutInfo: null,
  datavGlobalData: {
    datav: {
      name: 'DataV',
      version: '1.0.0'
    },
    arrTest:{
      name: 'xxx',
      value: "aaa"
    }
  },
  globalInterface: [],
  doingPath: []
}


let fun_changeDoing = (doing, action) => {
  if(!doing) doing =[];
  if(doing.length>5){
    doing.shift();
  }
  doing.push(action);
  return doing;
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


let fun_changeGlobalPathByPath = ( globalData, value , path) => {
  if(path.length==0) {
    return value;
  }
  let index = path.shift();
  globalData[index] = fun_changeGlobalPathByPath(globalData[index], value, path);
  return globalData;
}


let fun_updateModule = (layoutData, path, mhashName, newVersion, scriptAddr) => {

  if(!layoutData) return null;
  let { template } = layoutData;
  if(template) { // 存在template即为模板
    template.childs = template.childs.map((item, itemIndex) => fun_updateModule(item, path + '-' + itemIndex, mhashName, newVersion, scriptAddr));
    layoutData.template = template;
  } else {
    let { hashName, version } = layoutData;

    if(mhashName == hashName) {
      if(window.datavModule[hashName + '_element']){
        window.datavModule[hashName + '_element'].remove();
        window.datavModule[hashName] = null;
        window.datavModule[hashName + '_element'] = null;
      }
      layoutData.version = newVersion;
      layoutData.scriptAddr = scriptAddr;
    }
  }
  return layoutData;
}

const libraryReducer = (preState = defaultState, action = {}) => {
  const { type } = action;
  let state = deepClone(preState);
  switch (type) {
    case 'LIBRARY_OPEN_LAYOUT':
      state.libraryOpen = 'layout';
      state.onlyLayout = action.onlyLayout || false;
      return state;
    case 'LIBRARY_OPEN_MODULE':
      state.libraryOpen = 'module';
      return state;
    case 'LIBRARY_OPEN_VIEWMODULE':
      state.libraryOpen = 'viewmodule';
      return state;
    case 'LIBRARY_CLOSE':
      state.libraryOpen = false;
      return state;
    case 'ADD_LIBRARY':
      let data = deepClone(action.data);
      if(data.previewImg) {
        delete data.previewImg;
      }
      let path = state.nowLayoutPath;
      if(!path) {
        state.layoutData = data;
      }else{
        let pathArr = path.split('-');
        pathArr.shift();
        let temObj = state.layoutData.template;
        state.layoutData.template = fun_changeTemplate(temObj, pathArr, data);
      }
      state.doing = fun_changeDoing(state.doing, action);
      return state;
    case 'LAYOUT_CHANGE_PATH':
      return Object.assign({}, state, {
        nowLayoutPath: action.path
      });
    case 'INDEX_DELETE_MODULE':
      if(action.path == '0') {
        state.layoutData = null;
        state.layoutInfo = null;
      }else{
        let pathArr = action.path.split('-');
        pathArr.shift();
        let temObj = state.layoutData.template;
        state.layoutData.template = fun_changeTemplate(temObj, pathArr, false);
      }
      state.doing = fun_changeDoing(state.doing, action);
      return state;
    case 'ADD_SAME_MODULE':
      let pathArr = action.path.split('-');
      pathArr.shift();
      let index = pathArr[pathArr.length-1];
      if(!action.isPre) index++;
      let temObj = state.layoutData.template;
      state.layoutData.template = fun_changeTemplate(temObj, pathArr, true, index);
      state.doing = fun_changeDoing(state.doing, action);
      return state;
    case 'LIBRARY_LAYOUT_STYLE_CHANGE':
      let pathStyleArr = action.path.split('-');
      pathStyleArr.shift();
      state.layoutData.template = fun_changeTemplateStyle(state.layoutData.template, pathStyleArr, action.newStyle);
      state.doing = fun_changeDoing(state.doing, action);
      return state;
    case 'LIBRARY_MANAGE_OPEN':
      location.href = '#librartManage';
      return state;
    case 'OPEN_SAVED':
      location.href = '#pagesList';
      return state;
    case 'MODULE_PROPS_CHANGE':
      if(action.path == '0') {
        state.layoutData = action.data;
      }else {
        let pathPropsArr = action.path.split('-');
        pathPropsArr.shift();
        state.layoutData.template = fun_changeData(state.layoutData.template, pathPropsArr, action.data);
      }
      state.doing = fun_changeDoing(state.doing, action);
      return state;
    case 'SITE_DISPLAY_CHANGE':
      if(state.siteDisplay==null) state.siteDisplay = {};
      action.data && action.data.map(item=>{
        state.siteDisplay[item.name] = item.value;
      });
      return state;
    case 'SAVE_THIS_PAGE':
      state.layoutInfo = action.data;
      state.doing = [];
      return state;
    case 'REEDIT_LAYOUT_DATA':
      state.layoutData = action.layoutData;
      state.layoutInfo = action.layoutInfo;
      state.doing = [];
      return state;
    case 'CHANGE_GLOBAL_DATA':
      if(!state.datavGlobalData[action.name]) state.datavGlobalData[action.name] ={};
      action.data && Object.keys(action.data).map(key=>{
        state.datavGlobalData[action.name][key] = action.data[key];
      })
      return state;
    case 'CHANGE_GLOBAL_DATA_BY_PATH':
      state.datavGlobalData = fun_changeGlobalPathByPath(state.datavGlobalData, action.value, action.path.split('.'));
      return state;
    case 'UPDATE_MODULE_VERSION':
      state.layoutData = fun_updateModule(state.layoutData, '0', action.hashName, action.newVersion, action.scriptAddr);
      state.doing = fun_changeDoing(state.doing, action);
      return state;
    default: return state;
  }
};

module.exports = libraryReducer;
