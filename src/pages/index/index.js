'use strict';
import { connect } from 'react-redux';
import * as React from 'react';
import { mapStateToProps } from '../../connect/indexConnect.js';
import { Tooltip, Modal, Popover, Input } from 'antd';

import TEMPLATE_STYLE_SUPPORT from '../../common/tempalteStyleSupport.js';
const deepClone = require('deepclone');
require('./index.less');

const globalDataReg = /\$\{\s*([a-zA-Z][\_a-zA-Z0-9\.]*)\s*\}/g;

class Index extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			layout: false,
			updateTime: (new Date() - 0),
			needLoadModule: {},
			timeoutReRender: null
		}
		this.deepClone = deepClone;

		this.handleIndexClick = this.handleIndexClick.bind(this);
		this.siteDisplayChange = this.siteDisplayChange.bind(this);

	}

	componentDidMount() {

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

	componentWillReceiveProps() {

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
					let transformRes = this.transformGlobalVar(name.split('.'), this.props.datavGlobalData);
					if(transformRes!=null) return transformRes;
					return regMatch;
				})
			}
			return preData;
		}else{
			return preData;
		}
	}

	handleNolayoutSelect() {
		this.handleIndexClick();
		this.props.dispatch({type: "LIBRARY_OPEN_LAYOUT", onlyLayout: true});
		this.props.dispatch({type: "LAYOUT_CHANGE_PATH", path: ''});
	}

	siteDisplayChange(data) {
		// 修改全局展示控制逻辑
		this.props.dispatch({type: 'SITE_DISPLAY_CHANGE', data});
	}

	renderLayoutConfig(path) {
		return  <Tooltip placement="bottom" title="添加子模板 / 组件">
        <div
					className="config-button config-button-add-Layout"
					onClick={e=>{
						this.handleIndexClick();
						this.props.dispatch({type: "LIBRARY_OPEN_LAYOUT"});
						this.props.dispatch({type: "LAYOUT_CHANGE_PATH", path: e.target.getAttribute('data-path')});
					}}
					data-path={path}
					></div>
      </Tooltip>
	}

	renderDeleteButton(path) {
		return  <Tooltip placement="bottom" title="删除">
        <div
					className="config-button config-button-delete"
					onClick={e=>{
						let path = e.target.getAttribute('data-path');
						let _this = this;
						Modal.confirm({
					    title: '真的要删除这个模块吗?',
					    content: '删除不可恢复，此模块及所有子布局、子组件都会被删除',
					    onOk: () => {
								this.handleIndexClick();
								this.props.dispatch({type: "INDEX_DELETE_MODULE", path: path});

					    },
					    onCancel() {}
					  });
					}}
					data-path={path}
					></div>
      </Tooltip>
	}

	renderAdjacentSubassemblies(path, isPre, direction) {// 添加相邻子组件
		let directionText = '',
				className = '';

		if(isPre) {
			if(direction) {
				directionText = '前';
				className = 'config-button-addsamepre';
			} else {
				directionText = '上';
				className = 'config-button-addsametop';
			}
		}else {
			if(direction) {
				directionText = '后';
				className = 'config-button-addsamenext';
			} else {
				directionText = '下';
				className = 'config-button-addsamebottom';
			}
		}

		return  <Tooltip placement="bottom" title={"向" +(isPre? (direction? '前': '上'): (direction? '后': '下')) + "添加同一组件"}>
        <div
					className={"config-button " + className}
					onClick={e=>{
						this.handleIndexClick();
						let path = e.target.getAttribute('data-path');
						this.props.dispatch({type: "ADD_SAME_MODULE", path: path, isPre});
					}}
					data-path={path}
					></div>
      </Tooltip>
	}

	checkIsMultiModule(layout, layoutData) { // 检测是否是多个
		return layout && layout.template && layoutData.template.props.className.indexOf('template-item')!=-1 && layout.repeat && layout.repeat.indexOf('unlimited')!=-1 ;
	}

	renderDoingButton( buttons, name ){
		//let xxx = (<div className="doingButtonContainer">{ buttons }</div>);
		return <div className="doingButtonContainer">
			{ name && <div className="doingButtonContainer-name">{ name }</div> }
			{
				buttons.length>0 && <Popover content={ buttons } title={false} trigger="hover" >
						<div className="config-button config-button-tools"></div>
					</Popover>
			}
			</div>

	}

	templateStyleExec( style ) {
		if(!style) return[];
		let styleRes = [],
				keys = Object.keys(style);

				keys && keys.map(key => {
					let lowerKey = key.replace(/\s/g,'').toLowerCase();
					if(TEMPLATE_STYLE_SUPPORT.indexOf('|' + lowerKey + '|')!=-1){
						styleRes.push({
							style: lowerKey,
							key: key,
							value: style[key]
						})
					}
				});

		return styleRes;
	}

	renderLayoutStyleSetting(path, style) {
		return  <Tooltip placement="bottom" title="设置模板属性">
        <div
					className="config-button config-button-layout-style-setting"
					onClick={e=>{
						this.handleIndexClick();
						let path = e.target.getAttribute('data-path');
						this.props.dispatch({type: "STYLE_LAYOUT_OPEN", path: path, style});
					}}
					data-path={path}
					></div>
      </Tooltip>
	}

	renderModulePropsSetting(path, props) {
		return  <Tooltip placement="bottom" title="设置模块属性">
        <div
					className="config-button config-button-layout-props-setting"
					onClick={e=>{
						this.handleIndexClick();
						let path = e.target.getAttribute('data-path');
						this.props.dispatch({type: "MODULE_PROPS_OPEN", path: path, props});
					}}
					data-path={path}
					></div>
      </Tooltip>
	}

	renderSiteDisplaySetting(path, display, layoutData) {
		return  <Tooltip placement="bottom" title="设置模块显示控制属性">
        <div
					className="config-button config-button-display-setting"
					onClick={e=>{
						Modal.confirm({
					    title: '设置模块显示控制属性的值为？',
					    content: (<div>
									<Input defaultValue={display} onChange={(e)=>{
										this.state.temSiteDisplayChangeValue = e.target.value;
									}}/>
								</div>),
					    okText: '确认修改',
							onOk: ()=>{
								if(this.state.temSiteDisplayChangeValue != display){
									let newData = deepClone(layoutData);
									if(newData.template) {
										newData.template.display = this.state.temSiteDisplayChangeValue;
									} else {
										newData.display = this.state.temSiteDisplayChangeValue;
									}

									this.props.dispatch({
										type: 'MODULE_PROPS_CHANGE',
										path,
										data: newData
									})
								}
							},
					    cancelText: '取消',
					  });
					}}
					data-path={path}
					></div>
      </Tooltip>
	}

	renderModule(mainModuleConfig, modulepath) { // 需要处理

		let { hashName } = mainModuleConfig,
				moduleLoaded = true;

		if(!window.datavModule) window.datavModule = {};
		if( !window.datavModule[hashName] && !window.datavModule[hashName + '_element']) {
			moduleLoaded = false;
	    let scriptElement = document.createElement('script');
	    scriptElement.setAttribute('src', mainModuleConfig.scriptAddr);
	    document.head.appendChild(scriptElement);
	    window.datavModule[hashName + '_element'] = scriptElement;
			// Bug Repair@170507 多个模块加载完成后可能会导致未渲染完就刷新了，导致bug，解决方案是把onload放在componentDidMount里面去,每一次加载完成后都清掉所有onload，重新绑定，在componentWillReceiveProps里面去掉onload

			this.state.needLoadModule[hashName] = modulepath;


			return '';
	  }else {
			mainModuleConfig.props.siteDisplay = this.props.siteDisplay;
			mainModuleConfig.props.siteDisplayChange = this.siteDisplayChange;
			mainModuleConfig.props.isDataVPreView = this.props.isUsePreView;
			mainModuleConfig.props.changeProps = this.changeModuleProps.bind(this, modulepath, mainModuleConfig);
			mainModuleConfig.props.changeGlobalData = this.changeGlobalData.bind(this);

			// Bug Repair@170504 转换全局数据对象（方法：transformGlobalData）的时候本来在Index的render中，但是导致修改数据的时候查看到的是转换后的数据，所以把全局数据对象的匹配放到了每个模块和模板的处理中
			return React.createElement( window.datavModule[hashName], this.transformGlobalData.call( this, mainModuleConfig.props ) );
		}
	}

	changeGlobalData(api, data, index) { // 修改全局数据接口
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

		console.log("apiIndex", apiIndex, data)

		this.props.dispatch({type: 'CHANGE_GLOBAL_DATA', name: apiIndex, data});
	}

	changeModuleProps( path, mainModuleConfig, props) {
		let newModuleCOnfigData = deepClone(mainModuleConfig);
		newModuleCOnfigData.props = props;
		this.props.dispatch({type: 'MODULE_PROPS_CHANGE', path, data: newModuleCOnfigData});
	}

	renderModuleSetting(mainModuleConfig, renderPath) { // 添加和渲染模块工具条
		let path = renderPath;
		let childs = [ this.renderModule.call(this, mainModuleConfig, path) ],
				doingButton = [];

			doingButton.push( this.renderModulePropsSetting.call( this, path, mainModuleConfig ) );
			doingButton.push( this.renderDeleteButton.call(this, path) );
			if( mainModuleConfig.display!=null ) {
				doingButton.push( this.renderSiteDisplaySetting.call(this, path, mainModuleConfig.display, mainModuleConfig) );
			}

		childs.push( this.renderDoingButton.call(this, doingButton, mainModuleConfig.name) );
		return React.createElement(
			'div',
			{
				className: 'datav-module-edit-container',
				'data-path': path
			},
			...childs
		);
	}


	// 显示控制逻辑 返回true则不显示
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
					let transformRes = this.transformGlobalVar(name.split('.'), this.props.datavGlobalData);
					if(transformRes!=null) return transformRes;
					return '';
				});

			} else { // 显示控制对象数据
				displayItemRes = this.props.siteDisplay[displayItem];
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

			if(this.props.isUsePreView && props.className.indexOf('datavEditPreviewOpen')==-1) {
				props.className += ' datavEditPreviewOpen';
			}

			if(!this.props.isUsePreView && props.className.indexOf('datavEditPreviewOpen')!=-1) {
				props.className = props.className.replace(/\s*datavEditPreviewOpen\s*/g, ' ');
			}


			child = template.childs && template.childs.map((item, itemIndex) => this.renderComponent.call(this, item, path + '-' + itemIndex, layoutData)) || [];
			if(props.className.indexOf('template-item')!=-1) {
				doingButton.push( this.renderLayoutConfig.call(this, path) );
			}

			if(props.className.indexOf('template-container')!=-1) {
				doingButtonContainTitle = layoutData.name;
			}

			if(props.className.indexOf('template-container')!=-1 || this.checkIsMultiModule(preLayout, layoutData) ){
					if(props.className.indexOf('template-container')!=-1 || preLayout.template.childs.length>1) { // 只剩一个的时候不允许删除
						doingButton.push( this.renderDeleteButton.call(this, path) );
					}
					if(props.className.indexOf('template-item')!=-1) {
						if(preLayout && preLayout.repeat) {
							doingButton.push( this.renderAdjacentSubassemblies.call(this, path, true, preLayout.repeat.indexOf('-x')!=-1 ) );
							doingButton.push( this.renderAdjacentSubassemblies.call(this, path, false, preLayout.repeat.indexOf('-x')!=-1 ) );
						}
					}
			}

			if(display!=null) {
				doingButton.push( this.renderSiteDisplaySetting.call(this, path, display, layoutData) );
			}

			let templateStyle = this.templateStyleExec(props.style);
			if(templateStyle.length > 0) {
				doingButton.push( this.renderLayoutStyleSetting.call(this, path, templateStyle) );
			}
		} else {
			return this.renderModuleSetting.call( this, layoutData,  path );

		}

		if(doingButton.length) {
			child.push( this.renderDoingButton.call(this, doingButton, doingButtonContainTitle) );
		}

		props['data-path'] = path;

		// Bug Repair@170504 转换全局数据对象（方法：transformGlobalData）的时候本来在Index的render中，但是导致修改数据的时候查看到的是转换后的数据，所以把全局数据对象的匹配放到了每个模块和模板的处理中
		return React.createElement(
			component,
			this.transformGlobalData.call( this, props ),
			...child
		);
	}

	handleIndexClick () {
		// 为了保护修改样式的元素一直存在，先采用先把库面板、样式面板关闭的方案
		this.props.dispatch({type: "LAYOUT_STYLE_CLOSE"});
		this.props.dispatch({ type: 'LIBRARY_CLOSE'});
		this.props.dispatch({type: 'MODULE_PROPS_CLOSE'});
	}

	render(){
		// console.clear();

		this.state.timeoutReRender && clearTimeout(this.state.timeoutReRender);
		let { layoutData } = this.props;
		// this.transformGlobalData.call( this, this.props.layoutData );
		console.log( "render", layoutData );
		return <div className="Index">
			{
				!layoutData && <div className="index-nolayout">
					<div className="index-nolayout-thanks">
							:)<br />
							感谢使用DataV可视化您的数据

					</div>
					<div className="index-nolayout-select">
						进行数据页面搭建请先
						<i className="index-nolayout-select-layout" onClick={this.handleNolayoutSelect.bind(this)}>选择主布局模板</i>
					</div>
					<div className="index-nolayout-copyright">
						© 2013-2017 IWenKu.net All rights reserved.
					</div>
				</div>
			}
			{
				layoutData && this.renderComponent.call( this, layoutData, '0' )
			}
		</div>
	}
}


module.exports = connect(mapStateToProps)(Index);
