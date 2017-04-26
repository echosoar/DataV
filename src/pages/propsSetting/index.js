'use strict';
import { connect } from 'react-redux';
import * as React from 'react';
import classnames from 'classnames';
import { mapStateToProps } from '../../connect/propsSettingConnect.js';


require('./index.less');

class PropsSetting extends React.Component {
  constructor( props ) {
    super( props );
  }

  handleCloseClick() {
    this.props.dispatch({type: 'MODULE_PROPS_CLOSE'});
  }

  render() {
    let { propsSettingOpen, propsData, propsPath } = this.props;

    return <div className={classnames({"propsSetting-container": true, "propsSetting-container-open": propsSettingOpen!=false})}>
      <div className="propsSetting-title">
        <div className="propsSetting-close"  onClick={this.handleCloseClick.bind(this)}></div>
        属性设置
      </div>
      <div className="propsSetting-main">
        {
          propsPath
        }
      </div>
    </div>
  }
}

module.exports = connect( mapStateToProps )( PropsSetting );
