'use strict';
import { connect } from 'react-redux';
import * as React from 'react';
import classnames from 'classnames';
import { mapStateToProps } from '../../connect/propsSettingConnect.js';
const deepClone = require('deepclone');

require('./index.less');

// 保留关键字，不会做处理
const KeepKeywords = {
  'siteDisplay': true,
  'changeProps': true,
  'isDataVPreView': true,
  'siteDisplayChange': true,
  'changeGlobalData': true
}

class PropsSetting extends React.Component {
  constructor( props ) {
    super( props );
    this.state = {
      data: {},
      errTip: {}
    }
  }

  handleCloseClick() {
    this.props.dispatch({type: 'MODULE_PROPS_CLOSE'});
  }

  componentWillReceiveProps(nextProps) {
    let { propsData } = nextProps,
        keys = [];
    if(propsData && propsData.props) {
      keys =  Object.keys(propsData.props);
    }
    let newData = deepClone(this.state.data);
    keys.map(item => {
      let itemData =  propsData.props[item];
      let { value } = itemData;
      newData[item] = value;
    });
    this.setState({data: newData});
  }

  formChange(item, type, e) {
    let newValue = e.target.value;
    this.state.data[item] = newValue;
    let errTipMsg = this.handleFormItemRule.call(this, type, newValue);
    let errTip = deepClone(this.state.errTip);
    errTip[item] = errTipMsg;
    this.setState({errTip});
  }

  renderFormItemByType( item, itemData ) {
    let { type, value, options } = itemData;
    let defaultValue = this.state.data[item]==null? value: this.state.data[item];
    switch (type) {
      case 'size':
        return <input type="text" onChange={this.formChange.bind(this, item, type)} value={ defaultValue}/>
        break;
      case 'array':
        return <select
            onChange={this.formChange.bind(this, item, type)}
          >
          {
            options && options.map(option=>{
              return <option value={option.value}
              selected = {option.value==defaultValue? true: false}>{option.text}</option>
            })
          }
        </select>
        break;
      case 'json':
        return <textarea onChange={this.formChange.bind(this, item, type)} value={ defaultValue }></textarea>
        break;
      default:
        return <input type="text" onChange={this.formChange.bind(this, item, type)} value={ defaultValue }/>
        break;
        break;
    }

  }

  renderFormItemEmptyMessage( type ) {
    switch( type ) {
      case 'size':
        return '请输入一个大小值，例如：auto / 0px / 0%';
        break;
      case 'array':
        return '请选择一个值';
        break;
      default:
        return '';
    }
  }

  handleFormItemRule_size( value ) {
    if(value && !/^\s*(?:auto|[\d\.]+%|[\d\.]+px)\s*$/.test(value)) {
      return this.renderFormItemEmptyMessage( 'size' ) ;
    }
    return false;
  }

  handleFormItemRule( type, value ) {
    switch( type ) {
      case 'size':
        return this.handleFormItemRule_size.call( this, value );
        break;
      default:
        return false;
    }
  }


  handleSubmit() {
    let errTips = this.state.errTip;
    let isHaveError = false;
    Object.keys(errTips).map(item=>{
      if(errTips[item]) isHaveError = true;
    });
    if(isHaveError) return;

    let values = this.state.data;

    let newPropsData = deepClone(this.props.propsData);
    if(!newPropsData.props) newPropsData.props = {};
    let keys = Object.keys(values);
    keys.map(key=>{
      if(KeepKeywords[key]) return;
      if(newPropsData.props[key]!=null){
        newPropsData.props[key].value = values[key];
      }
    });
    this.props.dispatch({type: 'MODULE_PROPS_CLOSE'});
    this.props.dispatch({type: 'MODULE_PROPS_CHANGE', path: this.props.propsPath, data: newPropsData});

  }


  render() {
    let { propsSettingOpen, propsData, propsPath } = this.props,
        keys = [];
    let newValueObj = {};

    if(propsData && propsData.props) {
      keys =  Object.keys(propsData.props);
    }

    return <div className={classnames({"propsSetting-container": true, "propsSetting-container-open": propsSettingOpen!=false})}>
      <div className="propsSetting-title">
        <div className="propsSetting-close"  onClick={this.handleCloseClick.bind(this)}></div>
        属性设置
      </div>
      <div className="propsSetting-main">
        {
          keys.length > 0 && <div className="propsSetting-form">
            {
              keys.map(item => {
                if( KeepKeywords[item] ) return '';
                if( item == 'style') return '';
                let itemData =  propsData.props[item];
                let { text, type, value } = itemData;

                if(type=='tip') return <div className="propsSetting-tip">{ value }</div>
                newValueObj[item] = value;
                return <div className="propsSetting-form-item">
                  { text &&  <div  className="propsSetting-form-item-title">{ text }</div>
                  }
                  {
                    this.renderFormItemByType.call( this, item, itemData )
                  }
                  <div className="propsSetting-form-item-errTip">
                  {
                    this.state.errTip[item]? this.state.errTip[item]: ''
                  }
                  </div>
                </div>
              })
            }

            <div className="propsSetting-form-save" onClick={this.handleSubmit.bind(this)}>保存</div>
          </div>
        }

      </div>
    </div>
  }
}

module.exports = connect( mapStateToProps )( PropsSetting );
