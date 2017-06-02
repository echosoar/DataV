'use strict';
import { connect } from 'react-redux';
import { Component } from 'react';
const deepClone = require('deepclone');

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
  "height": {
    "name": "高度",
    "type": "size"
  },
  "borderradius": {
    "name": "圆角半径",
    "type": "size"
  },
  "background": {
    "name": "背景",
    "type": "text"
  },
  "verticalalign": {
    "name": "水平对齐方式",
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
  },
  "minwidth": {
    "name": "最小宽度",
    "type": "size"
  },
  "top": {
    "name": "顶部位置",
    "type": "size"
  },
  "left": {
    "name": "左部位置",
    "type": "size"
  },
  "zindex": {
    "name": "层高",
    "type": "number"
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
        let newStyleData = this.props.styleData.map( item => {
          if( values[item.style] ) {
            item.value = values[item.style];
          }
          return item;
        });
        this.props.dispatch( { type: 'LAYOUT_STYLE_CLOSE'} );
        this.props.dispatch( { type: 'LIBRARY_LAYOUT_STYLE_CHANGE', path: this.props.elementPath, newStyle: newStyleData} );

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
        return '请输入大小值，例如：auto / 0px / 0% / none';
        break;
      case 'array':
        return '请选择一个值';
        break;
      case 'number':
        return '请输入一个数字';
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
      case 'number':
        return this.handleFormItemRule_number.bind( this );
        break;
      default:
        return ( rule, value, callback ) => callback();
    }
  }

  handleFormItemRule_size( rule, value, callback ) {
    if(value && !/^\s*(?:none|auto|[\d\.]+%|[\d\.]+px)\s*$/.test(value)) {
      callback( this.renderFormItemEmptyMessage( 'size' ) );
    }
    callback();
  }

  handleFormItemRule_number( rule, value, callback ) {
    if(value && !/^\s*(?:\d+)\s*$/.test(value)) {
      callback( this.renderFormItemEmptyMessage( 'number' ) );
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
