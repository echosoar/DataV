'use strict';
import { connect } from 'react-redux';
import * as React from 'react';
import { mapStateToProps } from '../../connect/indexConnect.js';
import { Tooltip, Modal } from 'antd';

require('./index.less');



class Index extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			layout: false
		}
	}


	handleNolayoutSelect() {
		this.props.dispatch({type: "LIBRARY_OPEN_LAYOUT", onlyLayout: true});
		this.props.dispatch({type: "LAYOUT_CHANGE_PATH", path: ''});
	}

	renderLayoutConfig(path) {
		return  <Tooltip placement="bottom" title="添加子模板">
        <div
					className="config-button config-button-add-Layout"
					onClick={e=>{
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
								this.props.dispatch({type: "INDEX_DELETE_MODULE", path: path});
					    },
					    onCancel() {}
					  });

					}}
					data-path={path}
					></div>
      </Tooltip>
	}

	checkIsMultiModule(layout, layoutData) { // 检测是否是多个
		return layout && layout.template && layoutData.template.props.className.indexOf('template-item')!=-1 && layout.repeat == 'unlimited';
	}

	renderDoingButton( buttons ){
		return <div className="doingButtonContainer">{ buttons }</div>
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
				doingButton.push( this.renderDeleteButton.call(this, path) );
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

				</div>
			}
			{
				layoutData && this.renderComponent.call( this, layoutData, '0' )
			}
		</div>
	}
}


module.exports = connect(mapStateToProps)(Index);
