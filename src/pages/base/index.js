'use strict';
import { connect } from 'react-redux';
import { Component } from 'react';
import { mapStateToProps } from '../../connect/baseConnect.js';
import BUTTON from './button.js';
import Library from '../library/';
import Style from '../style/';

require('./base.less');

class Base extends Component {
	constructor(props) {
		super(props);
	}

	headerButton( action ) {
		this.props.dispatch( {type: action} );
	}

	render(){

		let button = BUTTON[this.props.route.path] || [];

		return <div className="DataV">
			<div className="header">
				<i className="logo"></i>
				<div className="header-title">
					Data<br />Configurator
				</div>
				<div className="header-button-container">
				{
					button.map( buttonItem => {
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
			<div className="main">
			{ this.props.children }
			</div>

		</div>
	}
}


module.exports = connect(mapStateToProps)(Base);
