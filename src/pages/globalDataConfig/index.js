'use strict';
import { connect } from 'react-redux';
import { Component } from 'react';
import { mapStateToProps } from '../../connect/globalDataConfigConnect.js';

require('./index.less');

class GlobalDataConfig extends Component {
	constructor(props) {
		super(props);

	}

	handlePageClose() {
		this.props.dispatch({ type: 'GLOBAL_DATA_CONFIG_CLOSE' });
	}

	render(){
		return <div className="globalDataConfig">
			<div className="globalDataConfig-top">
				<div className="globalDataConfig-title">页面数据配置管理</div>
				<div className="globalDataConfig-close" onClick={ this.handlePageClose.bind(this) }></div>
			</div>
		</div>
	}
}


module.exports = connect(mapStateToProps)(GlobalDataConfig);
