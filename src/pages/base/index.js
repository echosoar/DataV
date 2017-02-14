'use strict';

import {Component} from 'react';

require('./base.less');

class Base extends Component {
	constructor(props) {
		super(props);
	}
	
	render(){
		return <div className="d3Kab">
			<div className="header">
				<i className="logo"></i>
			</div>
			{this.props.children}
		</div>
	}
}


module.exports = Base;
