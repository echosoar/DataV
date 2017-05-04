'use strict';
import { connect } from 'react-redux';
import { Component } from 'react';
import { mapStateToProps } from '../../connect/globalDataConfigConnect.js';

require('./index.less');

class GlobalDataConfig extends Component {
	constructor(props) {
		super(props);

	}


	render(){

		return <div className="DataV">


		</div>
	}
}


module.exports = connect(mapStateToProps)(GlobalDataConfig);
