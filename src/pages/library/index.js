'use strict';
import { connect } from 'react-redux';
import { Component } from 'react';
import classNames from 'classnames';

import { mapStateToProps } from '../../connect/libraryConnect.js';

require('./index.less');

class Library extends Component {
  constructor( props ) {
    super( props );
  }

  handleClick() {
    this.props.dispatch({ type: 'LIBRARY_CLOSE'});
  }

  render() {
    console.log( Tabs);
    return <div className={classNames({library: true, libraryOpen: this.props.libraryOpen!=false})}>
      <div className="library-title">
        DataV组件库
        <i className="library-close" onClick={this.handleClick.bind(this)}></i>
      </div>
      
    </div>
  }
}


module.exports = connect(mapStateToProps)(Library);
