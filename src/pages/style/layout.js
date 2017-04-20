'use strict';
import { connect } from 'react-redux';
import { Component } from 'react';

import classNames from 'classnames';
import { mapStateToProps } from '../../connect/styleLayoutConnect.js';

import { Form, Select, Input, Button } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

require('./layout.less');

const styleConfig = {
  "width": {
    "name": "宽度",
    "type": "size"
  },
  "verticalalign": {
    "name": "水平对齐",
    "type": "array",
    "value": [
      {
        "text": "顶对齐",
        "value": "top"
      },
      {
        "text": "居中对齐",
        "value": "middle"
      },
      {
        "text": "底对齐",
        "value": "bottom"
      }
    ]
  }
}

class LayoutStyle extends Component {
  constructor( props ) {
    super( props );
  }

  handleClick() {
    this.props.dispatch({ type: 'LAYOUT_STYLE_CLOSE'});
  }

  handleSubmit( e ) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  renderFormItemByType( styleItem ) {
    let { type, value } = styleConfig[styleItem.style];

    switch( type ) {
      case 'size':
        return <Input />;
        break;
      case 'array':
        return <Select placeholder="请选择一个属性值">
          {
            value.map(item=>{
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
    let { styleData, elementPath, form } = this.props;
    const { getFieldDecorator } = form;
    return <div className="style-container-layout-container">
      {
        styleData.length > 0 && <Form onSubmit={this.handleSubmit.bind(this)}>
          {
            styleData.map(styleItem => {
              if( !styleConfig[styleItem.style] ) return '';
              let { name, type } = styleConfig[styleItem.style];
              return <FormItem label={ name }>
              {
                getFieldDecorator(styleItem.style, {
                  initialValue: styleItem.value,
                  rules: [
                    { required: true, message: this.renderFormItemEmptyMessage.call( this, type ), whitespace: true },
                    { validator: this.handleFormItemRule.call( this, type ) }
                  ],
                })(
                  this.renderFormItemByType.call( this, styleItem)
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
  }
}
module.exports = connect( mapStateToProps )( Form.create()( LayoutStyle ) );
