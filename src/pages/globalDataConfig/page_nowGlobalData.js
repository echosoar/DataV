'use strict';
import { connect } from 'react-redux';
import { Component } from 'react';
import { mapStateToProps } from '../../connect/globalDataConfigConnect.js';
import { Menu, Modal, Input } from 'antd';

require('./page_nowGlobalData.less');

class NowGlobalData extends Component {
	constructor(props) {
		super(props);

	}

  isType(ele, type) {
		return ({}).toString.call(ele).slice(8, -1).toLowerCase() == type.toLowerCase();
	}

  editValue(value, path) {
    path = path.replace(/^\./, '');
    Modal.confirm({
      title: '修改 ${ ' + path +' } 属性值',
      content: (<div>
        <Input defaultValue={value} onChange={(e)=>{
					value = e.target.value;
				}} />
        </div>),
      onOk: () => {
        this.props.dispatch({type: 'CHANGE_GLOBAL_DATA_BY_PATH', value, path });
      },
      onCancel() {}
    });

  }

  renderData( globalData, path ) {
      let returnArr = [], type = 'object';
    if( this.isType(globalData, 'object') ) {
      returnArr = Object.keys(globalData).map(key=>{
        let newPath = path + '.' + key;
        return <div className="nowGlobalData-item">
          <div className="nowGlobalData-item-title" data-path={newPath}>{ key }</div>
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
          <div className="nowGlobalData-item-title">{ key }</div>
          <div className="nowGlobalData-item-childs">
          { this.renderData.call(this, value, newPath) }
          </div>
        </div>
      })
    } else {
      return <div className="nowGlobalData-item-value">
        { globalData }
        <div
          className="nowGlobalData-item-edit"
          onClick={this.editValue.bind(this, globalData, path)}
          >编辑值</div>
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
