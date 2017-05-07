'use strict';
import { connect } from 'react-redux';
import * as React from 'react';
import classnames from 'classnames';
import { mapStateToProps } from '../../connect/propsSettingConnect.js';
import { Form, Select, Input, Button } from 'antd';
const deepClone = require('deepclone');
const FormItem = Form.Item;
const Option = Select.Option;

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
  }

  handleCloseClick() {
    this.props.dispatch({type: 'MODULE_PROPS_CLOSE'});
  }

  renderFormItemByType( itemData ) {
    let { type, value, options } = itemData;
    switch( type ) {
      case 'size':
        return <Input />;
        break;
      case 'array':
        return <Select placeholder="请选择一个属性值">
          {
            options.map(item=>{
              return <Option value={ item.value }>{ item.text }</Option>
            })
          }
        </Select>
        break;
      case 'json':
        return <Input type="textarea" autosize={{ minRows: 8, maxRows: 12 }}/>;
        break;
      default:
        return <Input />;
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

  handleFormItemRule( type ) {
    switch( type ) {
      case 'size':
        return this.handleFormItemRule_size.bind( this );
        break;
      default:
        return ( rule, value, callback ) => callback();
    }
  }

  handleFormItemRule_size( rule, value, callback ) {
    if(value && !/^\s*(?:auto|[\d\.]+%|[\d\.]+px)\s*$/.test(value)) {
      callback( this.renderFormItemEmptyMessage( 'size' ) );
    }
    callback();
  }

  handleSubmit( e ) {

    e.preventDefault();
    // let values = this.props.form.getFieldsValue();
    //
    // let newPropsData = deepClone(this.props.propsData);
    // if(!newPropsData.props) newPropsData.props = {};
    //
    // let keys = Object.keys(values);
    // keys.map(key=>{
    //   if(newPropsData.props[key]!=null){
    //     newPropsData.props[key].value = values[key];
    //   }
    // });
    // this.props.dispatch({type: 'MODULE_PROPS_CLOSE'});
    // this.props.dispatch({type: 'MODULE_PROPS_CHANGE', path: this.props.propsPath, data: newPropsData});

    // this.props.form.validateFields((err, values) => {
    //   if (!err) {
    //
    //   }
    // });


  }

  updateToForm(newValueObj) {
    //this.props.form.setFieldsValue(newValueObj)
    return '';
  }

  render() {
    let { propsSettingOpen, propsData, propsPath, form } = this.props,
        keys = [];
    let newValueObj = {};

    const { getFieldDecorator } = form;

    if(propsData && propsData.props) {
      keys =  Object.keys(propsData.props);
    }
    console.log("propsSetting", propsData)

    return <div className={classnames({"propsSetting-container": true, "propsSetting-container-open": propsSettingOpen!=false})}>
      <div className="propsSetting-title">
        <div className="propsSetting-close"  onClick={this.handleCloseClick.bind(this)}></div>
        属性设置
      </div>
      <div className="propsSetting-main">
        {
          keys.length > 0 && <Form onSubmit={ this.handleSubmit.bind(this) }>
            {
              keys.map(item => {
                if( KeepKeywords[item] ) return '';
                if( item == 'style') return '';
                let itemData =  propsData.props[item];
                let { text, type, value } = itemData;

                if(type=='tip') return <div className="propsSetting-tip">{ value }</div>
                newValueObj[item] = value;
                return <FormItem label={ text }>
                {
                  getFieldDecorator(item, {
                    initialValue: value,
                    rules: [
                      { required: false, message: this.renderFormItemEmptyMessage.call( this, type ), whitespace: true },
                      { validator: this.handleFormItemRule.call( this, type ) }
                    ],
                  })(
                    this.renderFormItemByType.call( this, itemData)
                  )
                }
                </FormItem>
              })
            }

            <FormItem>
              <Button type="primary" htmlType="submit">保存修改</Button>
            </FormItem>
          </Form>
        }
        {
          this.updateToForm.call(this, newValueObj)
        }
      </div>
    </div>
  }
}

module.exports = connect( mapStateToProps )( Form.create()( PropsSetting ) );
