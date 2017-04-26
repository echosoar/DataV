'use strict';
import { connect } from 'react-redux';
import * as React from 'react';
import classnames from 'classnames';
import { mapStateToProps } from '../../connect/propsSettingConnect.js';
import { Form, Select, Input, Button } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

require('./index.less');

// 保留关键字，不会做处理
const KeepKeywords = {}

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

  render() {
    let { propsSettingOpen, propsData, propsPath, form } = this.props,
        keys = [];

    const { getFieldDecorator } = form;

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
          keys.length > 0 && <Form onSubmit={()=>{}}>
            {
              keys.map(item => {
                if( KeepKeywords[item] ) return '';
                if( item == 'style') return 'style';
                let itemData =  propsData.props[item];
                let { text, type, value } = itemData;
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
      </div>
    </div>
  }
}

module.exports = connect( mapStateToProps )( Form.create()( PropsSetting ) );
