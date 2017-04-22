'use strict';

require('./index.less');

let Loading = props => {
  return <div className="component-loading-container">
    <div className="component-loading-animate"></div>
    <div className="component-loading-text">{ props.text || 'DataV Loading' }</div>
  </div>
}

module.exports = Loading;
