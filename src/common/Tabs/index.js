'use strict';
import { Component } from 'react';
import classNames from 'classnames';

require('./index.less');

class Tabs extends Component {
  constructor( props) {
    super( props );
  }

  handleClick(item) {
    if( this.props.onClick && this.props.nowItem != item.value ) {
      this.props.onClick(item);
    }
  }

  render() {
    let { items, nowItem } = this.props;
    return <div className="component-tabs">
      {
        items.map(item => {
              return <i className={
                classNames({
                  "component-tabs-item": true,
                  "component-tabs-item-now": item.value == nowItem
                })
            }
            onClick={this.handleClick.bind(this, item)}
            >
            { item.name }
          </i>
        })
      }
    </div>
  }
}


module.exports = Tabs;
