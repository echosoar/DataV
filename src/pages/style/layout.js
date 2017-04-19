'use strict';
import { connect } from 'react-redux';
import { Component } from 'react';
import classNames from 'classnames';
import { mapStateToProps } from '../../connect/styleLayoutConnect.js';

require('./layout.less');

class LayoutStyle extends Component {
  constructor( props ) {
    super( props );
  }

  handleClick() {
    this.props.dispatch({ type: 'LAYOUT_STYLE_CLOSE'});
  }

  render() {
    let { styleOpen } = this.props;
    return <div className="style-container-layout-container">
      xxx
    </div>
  }
}
module.exports = connect( mapStateToProps )( LayoutStyle );
