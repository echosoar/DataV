'use strict';
import { connect } from 'react-redux';
import { Component } from 'react';
import { mapStateToProps } from '../../connect/baseConnect.js';
import BUTTON from './button.js';
import Library from '../library/';
import Style from '../style/';
import PropsSetting from '../propsSetting/';
import { message } from 'antd';

require('./base.less');

class Base extends Component {
	constructor(props) {
		super(props);
		/*
		获取全局配置信息
		*/

		if(window.ipcRenderer) {
			window.ipcRenderer.send('getSystemConfig');
			window.ipcRenderer.on('resultGetSystemConfig', (event, args)=>{
				if(this.props.windowDefaultConfigChange) {
					message.success('DataV系统配置修改成功');
				}
				this.props.dispatch({type: 'UPDATE_SYSTEM_CONFIG', data: JSON.parse(args)});
			})
		}
	}

	headerButton( action ) {
		this.props.dispatch( {type: action} );

		/*关闭所有侧边栏*/
		this.props.dispatch({type: "LAYOUT_STYLE_CLOSE"});
		this.props.dispatch({ type: 'LIBRARY_CLOSE'});
		this.props.dispatch({type: 'MODULE_PROPS_CLOSE'});
	}

	render(){

		let button = BUTTON[this.props.route.path] || [];

		return <div className="DataV">
			<div className="header">
				<i className="logo"></i>
				<div className="header-title">
					Page<br />Configurator
				</div>
				<div className="header-button-container">
				{
					button.map( buttonItem => {
						if( buttonItem.rule ) {
							if( !buttonItem.rule(this) ) return '';
						}
						return <i
							className="header-button"
							onClick={()=>{ this.headerButton.call(this, buttonItem.action); }}
							data-title={ buttonItem.title }
						>
							{ buttonItem.icon && <span className="header-button-icon" style={{'background': 'url(' + buttonItem.icon + ') center center / contain no-repeat'}}></span>}
							{ buttonItem.name }
						</i>
					} )
				}
				</div>
			</div>
			<Library />
			<Style />
			<PropsSetting />
			<div className="main">
			{ this.props.children }
			</div>

		</div>
	}
}


module.exports = connect(mapStateToProps)(Base);
