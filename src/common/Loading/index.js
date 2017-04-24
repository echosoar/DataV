'use strict';

require('./index.less');

let Loading = props => {
  return <div className="component-loading-container" style={props.style || {}}>
    <div className="component-loading-verticle-middle">
      <div className="component-loading-animate"></div>
      <div className="component-loading-text">{ props.text || 'DataV Loading' }</div>
    </div>
  </div>
}

module.exports = Loading;
