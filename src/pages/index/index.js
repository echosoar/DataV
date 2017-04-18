'use strict';
import { connect } from 'react-redux';
import * as React from 'react';
import { mapStateToProps } from '../../connect/indexConnect.js';

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

	renderLayoutConfig() {
		return {
			component: 'div',
			props: {
				className: 'config-button config-button-add-Layout',
				'data-title': '添加子模版',
				'onClick': e=>{
					this.props.dispatch({type: "LIBRARY_OPEN_LAYOUT"});
					this.props.dispatch({type: "LAYOUT_CHANGE_PATH", path: e.target.getAttribute('data-path')});
				}
			}
		}
	}

	renderComponent(layoutData, path) {

		if(!layoutData) return null;

		let layout = Object.assign({}, layoutData),
				template = layout.template,
				child = [],
				{ component, props} = layout;

		if(template) { // 存在template即为模板
			component = template.component;
			props = template.props;

			child = template.childs && template.childs.map((item, itemIndex) => this.renderComponent.call(this, item, path + '-' + itemIndex)) || [];

			if(props.className.indexOf('template-item')!=-1) {
				child.push( this.renderComponent.call(this, this.renderLayoutConfig.call(this), path) );
			}
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

		console.log( "layoutData", layoutData )

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
				layoutData && this.renderComponent.call( this, layoutData.layout, '0' )
			}
		</div>
	}
}


module.exports = connect(mapStateToProps)(Index);
