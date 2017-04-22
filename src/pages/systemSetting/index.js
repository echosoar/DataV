'use strict';
import { connect } from 'react-redux';
import * as React from 'react';
import SystemSettingApi from './api.js';
import { Menu } from 'antd';
require('./systemSetting.less');

class SystemSetting extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			page: 'api'
		}
	}

	changeMenu(page) {
		if( page.key != this.state.page) {
			this.setState({ page: page.key});
		}
	}

  render() {
		let {page} = this.state;

    return <div className="systemSetting-container">
			<div className="systemSetting-left-container">
				<div className="systemSetting-title">系统设置</div>
				<Menu
	        onClick={ this.changeMenu.bind(this) }
	        style={{ width: 120 }}
	        defaultSelectedKeys={['api']}
	        mode="inline"
	      >
					<Menu.Item key="api">接口设置</Menu.Item>
				</Menu>
			</div>
			<div className="systemSetting-right-container">
			{
				page == 'api' && <div><SystemSettingApi /></div>
			}
			</div>
    </div>
  }
}

module.exports = SystemSetting;
