'use strict';
import { Component } from 'react';
import ReactDOM from 'react-dom';

import { fun_changeData } from './fun.js'

const deepClone = require('deepclone');

const globalDataReg = /\$\{\s*([a-zA-Z][\_a-zA-Z0-9\.]*)\s*\}/g;


require('./index.less');

let pagesDataGlobal = null;
try{

  window.datavGlobalData =window.datavGlobalData.replace(/_DATAV_SIG_Y_/g,"'");
  window.datavGlobalData = window.datavGlobalData.replace(/_DataVSlashFormat_/g,'\\');
  pagesDataGlobal = JSON.parse(window.datavGlobalData);
}catch(e){}

class DataV extends Component {
	constructor(props) {
		super(props);

    this.state = {
      pagesData: pagesDataGlobal,
      datavGlobalDataS: {},
      siteDisplay: {},
      isUsePreView: true,
      needLoadModule: {},
			timeoutReRender: null
    }

	}

  componentDidMount() {
      //

      let { needLoadModule } = this.state;
      let needLoadModuleHashNames = Object.keys(needLoadModule);
      let newNeedLoadModule = {};
      needLoadModuleHashNames.map(hashName=>{
        if(!window.datavModule[hashName]) {
          newNeedLoadModule[hashName] = needLoadModule[hashName];
        }
      });

      if(Object.keys(newNeedLoadModule).length) {
        this.state.timeoutReRender = setTimeout(()=>{
          this.setState({
            needLoadModule: newNeedLoadModule
          })
        }, 500);
      }
  }

  componentDidUpdate() {
		let { needLoadModule } = this.state;

		let needLoadModuleHashNames = Object.keys(needLoadModule);
		let newNeedLoadModule = {};
		needLoadModuleHashNames.map(hashName=>{
			if(!window.datavModule[hashName]) {
				newNeedLoadModule[hashName] = needLoadModule[hashName];
			}
		});

		if(Object.keys(newNeedLoadModule).length) {
			this.state.timeoutReRender = setTimeout(()=>{
				this.setState({
					needLoadModule: newNeedLoadModule
				})
			}, 500);
		}
	}

  isType(ele, type) {
    return ({}).toString.call(ele).slice(8, -1).toLowerCase() == type.toLowerCase();
  }

  transformGlobalVar( varArr, globalObject ) { // 全局接口取过来的变量替换
		if(!varArr || !varArr.length || !globalObject) return null;
		let nowIndex = varArr.shift();
		let nowGlobalData = globalObject[nowIndex];
		if(!varArr.length) return nowGlobalData;
		return this.transformGlobalVar( varArr, nowGlobalData);
	}

  displayRenderCheck(display) {

		if(display == null || !display) return false;

		let displayArr = display.split(',');
		let isNotDisplay = displayArr? false: true;

		displayArr.map(displayItem=>{
			let isNeg = /!/.test(displayItem);

			displayItem = displayItem.replace(/[!\s]/g,'');

			let displayItemRes = '';

			if(globalDataReg.test(displayItem)) { // 全局数据

				displayItemRes = displayItem.replace(globalDataReg, (regMatch, name)=>{
					let transformRes = this.transformGlobalVar(name.split('.'), this.state.datavGlobalDataS);
					if(transformRes!=null) return transformRes;
					return '';
				});

			} else { // 显示控制对象数据
				displayItemRes = this.state.siteDisplay[displayItem];
			}

			if(displayItemRes=='false') displayItemRes=false;

			if(isNeg){
				displayItemRes = !displayItemRes;
			}

			if(!displayItemRes ) {
				isNotDisplay = true;
			}
		});

		if(isNotDisplay) return true;
		return false;

	}



  transformGlobalData(preData) {
    if( this.isType(preData, 'array') ) {
      return preData.map(item => {
        return this.transformGlobalData( item );
      });
    }else if( this.isType(preData, 'object') ) {
      let newData = {};
      Object.keys(preData).map(key => {
        newData[key] = this.transformGlobalData( preData[key] );
      });
      return newData;
    }else if( this.isType(preData, 'string') ) {
      if(globalDataReg.test(preData)) {
        preData = preData.replace(globalDataReg, (regMatch, name)=>{
          let transformRes = this.transformGlobalVar(name.split('.'), this.state.datavGlobalDataS);
          if(transformRes!=null) return transformRes;
          return regMatch;
        })
      }
      return preData;
    }else{
      return preData;
    }
  }


	renderModule(mainModuleConfig, modulepath) { // 需要处理

		let { hashName } = mainModuleConfig;


		if(!window.datavModule) window.datavModule = {};
		if( !window.datavModule[hashName]) {

      if(!window.datavModule[hashName + '_element']) {
        let scriptElement = document.createElement('script');
  	    scriptElement.setAttribute('src', mainModuleConfig.scriptAddr);
  	    document.head.appendChild(scriptElement);
  	    window.datavModule[hashName + '_element'] = scriptElement;
      }

			this.state.needLoadModule[hashName] = modulepath;

			return '';
	  }else {
			mainModuleConfig.props.siteDisplay = this.state.siteDisplay;
			mainModuleConfig.props.siteDisplayChange = this.siteDisplayChange.bind(this);
			mainModuleConfig.props.isDataVPreView = this.state.isUsePreView;
			mainModuleConfig.props.changeProps = this.changeModuleProps.bind(this, modulepath, mainModuleConfig);
			mainModuleConfig.props.changeGlobalData = this.changeGlobalData.bind(this);

			// Bug Repair@170504 转换全局数据对象（方法：transformGlobalData）的时候本来在Index的render中，但是导致修改数据的时候查看到的是转换后的数据，所以把全局数据对象的匹配放到了每个模块和模板的处理中
			return React.createElement( window.datavModule[hashName], this.transformGlobalData.call( this, mainModuleConfig.props ) );
		}
	}


  changePagesData(action) {
    const { type } = action;

    let state = deepClone(this.state);
    switch (type) {
      case 'MODULE_PROPS_CHANGE':
        if(action.path == '0') {
          state.pagesData = action.data;
        }else {
          let pathPropsArr = action.path.split('-');
          pathPropsArr.shift();
          state.pagesData.template = fun_changeData(state.pagesData.template, pathPropsArr, action.data);
        }
        break;
      case 'CHANGE_GLOBAL_DATA':
        if(!state.datavGlobalDataS[action.name]) state.datavGlobalDataS[action.name] ={};
        action.data && Object.keys(action.data).map(key=>{
          state.datavGlobalDataS[action.name][key] = action.data[key];
        });
        break;
      case 'SITE_DISPLAY_CHANGE':
        if(state.siteDisplay==null) state.siteDisplay = {};
        action.data && action.data.map(item=>{
          state.siteDisplay[item.name] = item.value;
        });
        break;
      default:
        return;
        break;
    }

    this.state = state;
    this.setState({
      updateTime: new Date()
    });
  }

  siteDisplayChange(data) {
    this.changePagesData.call(this, {type: 'SITE_DISPLAY_CHANGE', data});
  }
  changeGlobalData(api, data, index) {
    let apiIndex = index;

    if(!index) {
      let apiList = api && api.value && api.value.split('/') || [];
      let apiKey = '';
      if(apiList.length>0) {
        while(apiKey = apiList.pop()) {
          apiIndex = apiKey;
          break;
        }
        apiIndex = apiIndex.replace(/[^a-z]/ig, '_');
      }
    }

    if(!apiIndex) apiIndex = 'default';

    this.changePagesData.call(this, {type: 'CHANGE_GLOBAL_DATA', name: apiIndex, data});
  }

  changeModuleProps( path, mainModuleConfig, props) {
		let newModuleCOnfigData = deepClone(mainModuleConfig);
		newModuleCOnfigData.props = props;
		this.changePagesData.call(this, {type: 'MODULE_PROPS_CHANGE', path, data: newModuleCOnfigData});
	}


  renderComponent(layoutData, path, preLayout) {
    if(!layoutData) return null;

    let layout = Object.assign({}, layoutData),
        child = layout.childs || [],
        { component, props, template, display } = layout,
        doingButton = [];

    if( this.displayRenderCheck.call(this, display) ) {
      return '';
    }

    let doingButtonContainTitle = '';

    if(template) { // 存在template即为模板
      component = template.component;
      props = template.props;
      display = template.display;

      if( this.displayRenderCheck.call(this, display) ) {
        return '';
      }

      if(this.state.isUsePreView && props.className.indexOf('datavEditPreviewOpen')==-1) {
        props.className += ' datavEditPreviewOpen';
      }


      child = template.childs && template.childs.map((item, itemIndex) => this.renderComponent.call(this, item, path + '-' + itemIndex, layoutData)) || [];

    } else {
      return this.renderModule.call( this, layoutData,  path );
    }

    props['data-path'] = path;

    // Bug Repair@170504 转换全局数据对象（方法：transformGlobalData）的时候本来在Index的render中，但是导致修改数据的时候查看到的是转换后的数据，所以把全局数据对象的匹配放到了每个模块和模板的处理中
    return React.createElement(
      component,
      this.transformGlobalData.call( this, props ),
      ...child
    );
  }

  render() {

    this.state.timeoutReRender && clearTimeout(this.state.timeoutReRender);
    let { pagesData } = this.state;

    return <div className="datav-container">
      { !pagesData && <div className="datav-noData">
        <div className="datav-noData-top">:(</div>
        <div className="datav-noData-content">Thanks for using</div>
        <div className="datav-noData-content">DataV Page Data Error.</div>
      </div>}
      {
        pagesData && this.renderComponent.call( this, pagesData, '0' )
      }

    </div>
  }
}

ReactDOM.render(
  <DataV />,
  document.getElementById('datav-container')
);
