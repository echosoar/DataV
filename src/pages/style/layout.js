'use strict';
import { connect } from 'react-redux';
import { Component } from 'react';

import classNames from 'classnames';
import { mapStateToProps } from '../../connect/styleLayoutConnect.js';

import { Form, Select } from 'antd';
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

  render() {
    let { styleData, elementPath } = this.props;
    console.log(styleData)
    return <div className="style-container-layout-container">
      xxx
    </div>
  }
}
module.exports = connect( mapStateToProps )( LayoutStyle );
