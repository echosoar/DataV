'use strict';
import { connect } from 'react-redux';
import { Component } from 'react';
import { Tabs } from '../../common/';
import classNames from 'classnames';

import { mapStateToProps } from '../../connect/libraryConnect.js';
import Layout from './layout.js';

require('./index.less');

class Library extends Component {
  constructor( props ) {
    super( props );
  }

  handleClick() {
    this.props.dispatch({ type: 'LIBRARY_CLOSE'});
  }

  handleTabsClick(item) {
    this.props.dispatch({ type: 'LIBRARY_OPEN_' + item.value.toUpperCase()});
  }

  render() {

    return <div className={classNames({library: true, libraryOpen: this.props.libraryOpen!=false})}>
      <div className="library-title">
        DataV组件库
        <i className="library-close" onClick={this.handleClick.bind(this)}></i>
      </div>
      <div className="library-main">
        <Tabs items={[
            {
              name: '布局模板',
              value: 'layout'
            },
            {
              name: '基础模块',
              value: 'module'
            },
            {
              name: '数据模块',
              value: 'viewmodule'
            }
          ]}
          nowItem={this.props.libraryOpen}
          onClick={this.handleTabsClick.bind(this)}
          />
        {
          this.props.libraryOpen == 'layout' && <Layout />
        }
      </div>

    </div>
  }
}


module.exports = connect(mapStateToProps)(Library);
