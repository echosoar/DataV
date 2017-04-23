'use strict';
import { connect } from 'react-redux';
import * as React from 'react';
import { Menu } from 'antd';
import LayoutLibraryManage from './layoutLibraryManage.js';
require('./libraryManage.less');

class LibraryManage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			page: 'layout'
		}
	}

	changeMenu(page) {
		if( page.key != this.state.page) {
			this.setState({ page: page.key});
		}
	}

  render() {
		let { page } = this.state;

    return <div className="libraryManage-container">
			<div className="libraryManage-left-container">
				<div className="libraryManage-title">库管理</div>
				<Menu
	        onClick={ this.changeMenu.bind(this) }
	        style={{ width: 120 }}
	        defaultSelectedKeys={['layout']}
	        mode="inline"
	      >
					<Menu.Item key="layout">布局模板</Menu.Item>
					<Menu.Item key="baseModule">基础组件</Menu.Item>
					<Menu.Item key="dataModule">数据组件</Menu.Item>
				</Menu>
			</div>
			<div className="libraryManage-right-container">
				{
					page == 'layout' && <LayoutLibraryManage />
				}
			</div>
    </div>
  }
}

module.exports = LibraryManage;
