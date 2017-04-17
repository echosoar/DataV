'use strict';

import {Component} from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducerAll from './reducer.js';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';

import Base from './pages/base/';
import Index from './pages/index/';
import 'antd/dist/antd.css';

let store = createStore(reducerAll);

class DataV extends Component {
	constructor(props) {
		super(props);
	}

	render(){
		return (
			<Provider store={store}>
				<Router history={hashHistory}>
					<Route path="/" component={Base}>
						<IndexRoute component={Index}/>
					</Route>
				</Router>
			</Provider>
		)
	}
}


ReactDOM.render(
  <DataV />,
  document.getElementById('container')
);
