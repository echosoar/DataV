'use strict';
import { combineReducers } from 'redux'
import * as reducers from './reducers/';

const reducer = combineReducers(reducers);

module.exports = reducer;
