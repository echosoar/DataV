'use strict';

import {Component} from 'react';
import ReactDOM from 'react-dom';

class Index extends Component {
	constructor(props) {
		super(props);
	}
	
	render(){
		return <span>init</span>
	}
}


ReactDOM.render(
  <Index />,
  document.getElementById('container')
);


