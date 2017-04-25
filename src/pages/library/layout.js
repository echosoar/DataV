'use strict';
import { connect } from 'react-redux';
import { Component } from 'react';
import { mapStateToProps } from '../../connect/libraryLayoutConnect.js';

require('./layout.less');

let mockData = [
  {
    "name": "无限横向布局模板",
    "introduction": "暂无简介",
    "enName": "horizontal",
    "version": "1.0.0",
    "datavVersion": "1.0.0",
    "previewImg": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPAAAACMCAYAAABCtSQoAAACO0lEQVR4nO3c3W0aURCA0blpgHTgdEA6oASXQEpIB3YHTglJBS7B6cDpwEkFVioYvzgIIQF77SvCLOc8rlbDj/QtWhATAQAAAAAAAAAAAAAAAAAAAAAAAP9XGz0wM3P0TJiL1trQ5j6MHAacloChMAFDYQKGwgQMhQkYChMwFCZgKEzAAAAAAAAAAAAAwAWzEwtOyE4sYEPAUJiAoTABQ2EChsIEDIUJGAoTMBQmYAAAAAAAAAAAAOCC2YkFJ2QnFrAhYChMwFCYgKEwAUNhAobCBAyFCRgKEzAAAAAAAAAAAABwwezEghOyEwvYEDAUJmAoTMBQmIChMAFDYQKGwgQMhQkYAAAAAAAAAAAAuGB2YsEJ2YkFbAgYChMwFCZgKEzAUJiAoTABQ2EChsIEDAAAAAAAAAAAAFyw4TuxeJ/MXEfEl53D31trP94waxURXyPi49bhnxHxrbX2t3PWVUTcRsSnrcO/I+K2tfan97nB7GTmTe530zlrdWDWQ+esRWY+75n1nJmLvlcKM3MkuH9WE2cdCq77gpCZD0dmdV0QYHYy83FCwI8TZ91NmJU54ZMzM68nzrp+/7tAL38nPB+fB50z+rzRj8lAAobCBHw+fg06Z/R5ox8T5mfiveak+8zMvMrjX2LddTy3Y/fnk+7NYdby8JdPk4N7nbU+EPFDdvz0k5nLzHzaM+spM5f9rxZm6DW8p51A1m+ctdz59HzuvRBszVpk5v1OvPc9FwIAAAAAAAAAAAA4Py+Yx5ElJSG0iAAAAABJRU5ErkJggg==",
    "repeat": "unlimited-y",
    "template": {
      "component": "div",
      "props": {
        "className": "template-container"
      },
      "childs": [
        {
          "template": {
            "component": "div",
            "props": {
              "className": "template-item"
            },
            "childs": []
          }
        },
        {
          "template": {
            "component": "div",
            "props": {
              "className": "template-item"
            },
            "childs": []
          }
        }
      ]
    }
  }
];

class LibraryLayout extends Component {
  constructor( props ) {
    super( props );

    this.state = {
      layout: mockData
    }
  }

  handleItemClick(item) {
    this.props.dispatch({type: 'LIBRARY_CLOSE'});
    this.props.dispatch({type: 'ADD_LIBRARY', data: item});
  }

  render() {
    let { layout } = this.state;
    return <div>
    {
      layout && layout.map(item => {
        return <div className="libraryLayout-item">
          <div className="libraryLayout-item-name">{ item.name }</div>
          <div className="libraryLayout-item-introduction">{ item.introduction }</div>
          <div className="libraryLayout-item-preview" style={{background: '#eee url(' + item.previewImg +') center center/contain no-repeat'}}></div>
          <div
            className="libraryLayout-item-add-button"
            onClick={this.handleItemClick.bind(this, item)}
            >
            添加
          </div>
        </div>
      })
    }
    </div>
  }

}

module.exports = connect(mapStateToProps)(LibraryLayout);
