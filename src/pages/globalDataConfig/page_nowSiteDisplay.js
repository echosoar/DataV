'use strict';
import { connect } from 'react-redux';
import { Component } from 'react';
import { mapStateToProps } from '../../connect/globalDataConfigConnect.js';
import { Switch } from 'antd';

require('./page_nowSiteDisplay.less');

class NowSiteDisplay extends Component {
	constructor(props) {
		super(props);

	}

  handleSwitchChange( key, checked ) {
    this.props.dispatch({
      'type': 'SITE_DISPLAY_CHANGE',
      data: [{
        name: key,
        value: checked
      }]
    });
  }

  renderData( siteDisplay ) {
    return Object.keys( siteDisplay ).map( key=>{
      return <div className="globalData-nowSiteDisplay-item">
          <div className="globalData-nowSiteDisplay-key">{ key }</div>
          <div className="globalData-nowSiteDisplay-value">
            <Switch defaultChecked={siteDisplay[key]} onChange={this.handleSwitchChange.bind(this, key)} />
          </div>
      </div>
    })
  }

	render(){

		return <div className="globalData-nowSiteDisplay">
	   {
       this.renderData.call(this, this.props.siteDisplay, '')
     }
		</div>
	}
}


module.exports = connect(mapStateToProps)(NowSiteDisplay);
