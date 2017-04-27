'use strict';
import { connect } from 'react-redux';
import * as React from 'react';
import { mapStateToProps } from '../../connect/indexConnect.js';
import { Tooltip, Modal, Popover } from 'antd';

import TEMPLATE_STYLE_SUPPORT from '../../common/tempalteStyleSupport.js';
const deepClone = require('deepclone');
require('./index.less');


class Index extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			layout: false
		}
		this.deepClone = deepClone;

		this.handleIndexClick = this.handleIndexClick.bind(this);
	}

	handleNolayoutSelect() {
		this.handleIndexClick();
		this.props.dispatch({type: "LIBRARY_OPEN_LAYOUT", onlyLayout: true});
		this.props.dispatch({type: "LAYOUT_CHANGE_PATH", path: ''});
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

	renderDoingButton( buttons ){
		//let xxx = (<div className="doingButtonContainer">{ buttons }</div>);
		return <div className="doingButtonContainer">
			{ buttons.length<=1 && buttons }
			{
				buttons.length>1 && <Popover content={ buttons } title={false} trigger="hover" >
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
		return  <Tooltip placement="bottom" title="设置模板样式">
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

	renderModule(mainModuleConfig, modulepath) {
		let { hashName } = mainModuleConfig,
				moduleLoaded = true;
		if(!window.datavModule) window.datavModule = {};
		if( !window.datavModule[hashName] && !window.datavModule[hashName + '_element']) {
			moduleLoaded = false;
	    let scriptElement = document.createElement('script');
	    scriptElement.setAttribute('src', mainModuleConfig.scriptAddr);
	    document.head.appendChild(scriptElement);
	    window.datavModule[hashName + '_element'] = scriptElement;
	    window.datavModule[hashName + '_element'].onload = () => {
	      let newState = deepClone(this.state[modulepath]) || {};
	      newState.loaded = true;
	      this.setState({[modulepath]: newState});
	    }
			return <div className="datav-module-loading">
				DataV Module Loading...
			</div>;
	  }

		return React.createElement( window.datavModule[hashName], mainModuleConfig.props );
	}

	renderModuleSetting(mainModuleConfig, renderPath) { // 添加和渲染模块工具条
		let path = renderPath;
		let childs = [ this.renderModule.call(this, mainModuleConfig, path) ],
				doingButton = [];

			doingButton.push( this.renderModulePropsSetting.call( this, path, mainModuleConfig ) );
			doingButton.push( this.renderDeleteButton.call(this, path) );

		childs.push( this.renderDoingButton.call(this, doingButton) );
		return React.createElement(
			'div',
			{
				className: 'datav-module-edit-container',
				'data-path': path
			},
			...childs
		);
	}

	renderComponent(layoutData, path, preLayout) {

		if(!layoutData) return null;
		console.log("preLayout", preLayout)


		let layout = Object.assign({}, layoutData),
				child = layout.childs || [],
				{ component, props, template } = layout,
				doingButton = [];

		if(template) { // 存在template即为模板
			component = template.component;
			props = template.props;

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

			let templateStyle = this.templateStyleExec(props.style);
			if(templateStyle.length > 0) {
				doingButton.push( this.renderLayoutStyleSetting.call(this, path, templateStyle) );
			}
		} else {
			return this.renderModuleSetting.call( this, layoutData,  path );
		}

		if(doingButton.length) {
			child.push( this.renderDoingButton.call(this, doingButton) );
		}

		props['data-path'] = path;

		return React.createElement(
			component,
			props,
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

		let { layoutData } = this.props;
		console.clear();
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
