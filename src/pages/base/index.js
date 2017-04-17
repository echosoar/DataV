'use strict';
import { connect } from 'react-redux';
import {Component} from 'react';

require('./base.less');

class Base extends Component {
	constructor(props) {
		super(props);
	}

	render(){
		console.log(this.props)
		return <div className="DataV">
			<div className="header">
				<i className="logo"></i>
				<div className="header-title">
					Data<br />Configurator
				</div>
			</div>
			<div className="main">
			{ this.props.children }
			</div>

		</div>
	}
}


module.exports = connect()(Base);
