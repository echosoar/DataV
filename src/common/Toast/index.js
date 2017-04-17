'use strict';
import { Component } from 'react';

require('./index.less');

class Toast entends Component {
  constructor( props ) {
    super( props );
  }

  render() {
    return <div className="component-toast">
      <div className="component-toast-text">{ this.props.text }</div>
    </div>
  }
}
