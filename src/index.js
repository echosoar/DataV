'use strict';

import {Component} from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';

import Base from './pages/base/';
import Index from './pages/index/';

class D3Kab extends Component {
	constructor(props) {
		super(props);
	}
	
	render(){
		return (
			<Router history={hashHistory}>
				<Route path="/" component={Base}>
					<IndexRoute component={Index}/>
				</Route>
			</Router>
		)
	}
}


ReactDOM.render(
  <D3Kab />,
  document.getElementById('container')
);


