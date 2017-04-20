'use strict';
import { connect } from 'react-redux';
import * as React from 'react';

import { mapStateToProps } from '../../connect/libraryLayoutConnect.js';

const Component = React.Component;

require('./baseModule.less');

let mockData = [{
  name: "计数器",
  introduction: "暂无简介",
  enName: "text-module",
  version: "1.0.0",
  datavVersion: "1.0.0",
  previewImg: "",
  hashName: "testTextModule",
  scriptType: "local",
  scriptAddr: "./test/module/testTextModule.js",
  component: 'div',
  props: {
    style: {
      "color": "#000000",
      "font-size": "12px"
    },
    onClick: '{@event|click}'
  },
  defaultState: {
    count: 0
  },
  childs: [
    '计数器：当前数值 {@state|count}，点击加1'
  ]
}]

class BaseModule extends Component {
  constructor( props ) {
    super( props );

    this.state = {
      baseModule: mockData
    }
  }

  handleItemClick(item) {
    this.props.dispatch({type: 'LIBRARY_CLOSE'});
    this.props.dispatch({type: 'ADD_LIBRARY', data: item});
  }


  //

  //
  // render() {
  //   let { layout } = this.state;
  //   return <div>
  //   {
  //     layout && layout.map((item, index) => {
  //       return this.renderModule.call( this, item, item, 'module_' + index, '0' );
  //     })
  //   }
  //   </div>
  // }

  render() {
    let { baseModule } = this.state;
    return <div>
    {
      baseModule && baseModule.map(item => {
        return <div className="baseModule-item">
          <div className="baseModule-item-name">{ item.name }</div>
          <div className="baseModule-item-introduction">{ item.introduction }</div>
          <div className="baseModule-item-preview" style={{background: '#eee url(' + item.previewImg +') center center/contain no-repeat'}}></div>
          <div
            className="baseModule-item-add-button"
            onClick={this.handleItemClick.bind(this, item)}
            >
            添加
          </div>
        </div>
      })
    }
    </div>
  }
}

module.exports = connect(mapStateToProps)(BaseModule);
