'use strict';
import { connect } from 'react-redux';
import { Component } from 'react';
import { mapStateToProps } from '../../connect/globalDataConfigConnect.js';
import { Menu } from 'antd';

require('./page_nowGlobalData.less');

class NowGlobalData extends Component {
	constructor(props) {
		super(props);

	}

  isType(ele, type) {
		return ({}).toString.call(ele).slice(8, -1).toLowerCase() == type.toLowerCase();
	}

  renderButton(value, path) {
    if( this.isType(value, 'object') ) {
      return <div className="nowGlobalData-item-add" data-path={path}>+ 添加子属性</div>

    }
    return '';
  }

  renderData( globalData, path ) {
      let returnArr = [], type = 'object';
    if( this.isType(globalData, 'object') ) {
      returnArr = Object.keys(globalData).map(key=>{
        let newPath = path + '.' + key;
        return <div className="nowGlobalData-item">
          <div className="nowGlobalData-item-title" data-path={newPath}>{ key }{ this.renderButton(globalData[key], newPath) }</div>
          <div className="nowGlobalData-item-childs">
          { this.renderData.call(this, globalData[key], newPath) }
          </div>
        </div>
      });


    } else if( this.isType(globalData, 'array') ) {
      type = 'array';
      returnArr = globalData.map((value, key)=>{
        let newPath = path + '.' + key;
        return <div className="nowGlobalData-item">
          <div className="nowGlobalData-item-title" data-path={ newPath }>{ key }{ this.renderButton(value, newPath) }</div>
          <div className="nowGlobalData-item-childs">
          { this.renderData.call(this, value, newPath) }
          </div>
        </div>
      })
    } else {
      return <div className="nowGlobalData-item-value" data-path={path}>
      { globalData }
      </div>
    }


    return returnArr;
  }

	render(){

		return <div className="globalData-nowGlobalData">
	   {
       this.renderData.call(this, this.props.datavGlobalData, '')
     }
		</div>
	}
}


module.exports = connect(mapStateToProps)(NowGlobalData);
