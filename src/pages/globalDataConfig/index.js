'use strict';
import { connect } from 'react-redux';
import { Component } from 'react';
import { mapStateToProps } from '../../connect/globalDataConfigConnect.js';
import { Menu } from 'antd';

import NowGlobalData from './page_nowGlobalData.js';

require('./index.less');

class GlobalDataConfig extends Component {
	constructor(props) {
		super(props);
		this.state = {
			page: 'nowGlobalData'
		}
	}

	handlePageClose() {
		this.props.dispatch({ type: 'GLOBAL_DATA_CONFIG_CLOSE' });
	}

	changeMenu(page) {
		if( page.key != this.state.page) {
			this.setState({ page: page.key});
		}
	}

	render(){
		let { page } = this.state;
		return <div className="globalDataConfig">
			<div className="globalDataConfig-top">
				<div className="globalDataConfig-title">页面数据配置管理</div>
				<div className="globalDataConfig-close" onClick={ this.handlePageClose.bind(this) }></div>
			</div>
			<div className="globalDataConfig-left">
				<Menu
					onClick={ this.changeMenu.bind(this) }
					style={{ width: 160 }}
					defaultSelectedKeys={['nowGlobalData']}
					mode="inline"
				>
					<Menu.Item key="nowGlobalData">当前全局数据</Menu.Item>
					<Menu.Item key="defaultGlobalData">默认全局数据/接口</Menu.Item>
					<Menu.Item key="displayData">显示控制数据</Menu.Item>
				</Menu>
			</div>
			<div className="globalDataConfig-right">
				{
					page == 'nowGlobalData' && <NowGlobalData />
				}
			</div>
		</div>
	}
}


module.exports = connect(mapStateToProps)(GlobalDataConfig);
