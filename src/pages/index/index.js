'use strict';
import { connect } from 'react-redux';
import * as React from 'react';
import { mapStateToProps } from '../../connect/indexConnect.js';
import { Tooltip, Modal } from 'antd';

import TEMPLATE_STYLE_SUPPORT from '../../common/tempalteStyleSupport.js';

require('./index.less');




class Index extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			layout: false
		}

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
		return <div className="doingButtonContainer">{ buttons }</div>
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

	renderComponent(layoutData, path, preLayout) {

		if(!layoutData) return null;

		let layout = Object.assign({}, layoutData),
				child = layout.childs || [],
				{ component, props, template } = layout,
				doingButton = [];

		if(template) { // 存在template即为模板
			component = template.component;
			props = template.props;

			child = template.childs && template.childs.map((item, itemIndex) => this.renderComponent.call(this, item, path + '-' + itemIndex, layoutData)) || [];
			if(props.className.indexOf('template-item')!=-1) {
				doingButton.push( this.renderLayoutConfig.call(this, path) );
			}

			if(props.className.indexOf('template-container')!=-1 || this.checkIsMultiModule(preLayout, layoutData) ){
					if(props.className.indexOf('template-container')!=-1 || preLayout.template.childs.length>1) { // 只剩一个的时候不允许删除
						doingButton.push( this.renderDeleteButton.call(this, path) );
					}
					if(props.className.indexOf('template-item')!=-1) {
						doingButton.push( this.renderAdjacentSubassemblies.call(this, path, true, preLayout.repeat.indexOf('-x')!=-1 ) );
						doingButton.push( this.renderAdjacentSubassemblies.call(this, path, false, preLayout.repeat.indexOf('-x')!=-1 ) );
					}
			}

			let templateStyle = this.templateStyleExec(props.style);
			if(templateStyle.length > 0) {
				doingButton.push( this.renderLayoutStyleSetting.call(this, path, templateStyle) );
			}
		}

		if(doingButton.length) {
			child.push( this.renderDoingButton.call(this, doingButton) ); // 删除
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
	}

	render(){

		let { layoutData } = this.props;

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
