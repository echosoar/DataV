'use strict';
import { connect } from 'react-redux';
import * as React from 'react';
import { Menu } from 'antd';
require('./api.less');

class SystemSettingApi extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
      data: false
		}
	}



  render() {

    return <div className="systemSettingApi-container">
      {
        data && <div>
          
        </div>
      }
    </div>
  }
}

module.exports = SystemSettingApi;
