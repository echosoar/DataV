'use strict';

import {Component} from 'react';

require('./base.less');

class Base extends Component {
	constructor(props) {
		super(props);
	}

	render(){
		return <div className="DataV">
			<div className="header">
				<i className="logo"></i>
				<div className="header-title">
					Data<br />Configurator
				</div>
			</div>
			{this.props.children}
		</div>
	}
}


module.exports = Base;
