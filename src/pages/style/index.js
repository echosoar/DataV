'use strict';
import { connect } from 'react-redux';
import { Component } from 'react';
import classNames from 'classnames';
import { mapStateToProps } from '../../connect/styleConnect.js';

import Layout from './layout.js';

require('./index.less');

class Style extends Component {
  constructor( props ) {
    super( props );
  }

  handleClick() {
    this.props.dispatch({ type: 'LAYOUT_STYLE_CLOSE'});
  }

  render() {
    let { styleOpen } = this.props;
    return <div className={classNames({"style-conatiner": true, "style-conatiner-open": styleOpen!=false})}>
      <div className="style-title">
        <i className="style-close" onClick={this.handleClick.bind(this)}></i>
        { styleOpen == 'layout' && 'DataV - 布局模板样式设置' }
      </div>
      <div className="style-main">
        { styleOpen == 'layout' && <Layout /> }
      </div>
    </div>
  }
}
module.exports = connect( mapStateToProps )( Style );
