'use strict';
import { connect } from 'react-redux';
import { Component } from 'react';
import { mapStateToProps } from '../../connect/indexConnect.js';

require('./index.less');

class Index extends Component {
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



	render(){
		let { layoutData } = this.props;

		console.log( layoutData )

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
		</div>
	}
}


module.exports = connect(mapStateToProps)(Index);
