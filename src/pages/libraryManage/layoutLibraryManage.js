'use strict';
import { connect } from 'react-redux';
import * as React from 'react';
import { Input, Button } from 'antd';

require('./layoutLibraryManage.less');

class LayoutLibraryManage extends React.Component {
  constructor( props ) {
    super( props );

    this.state = {
      isOpenNew: false
    }
  }

  handleAddNewLayout(isOpenNew) {
    this.setState( {isOpenNew});
  }

  render() {

    let { isOpenNew } = this.state;
    return <div className="layoutLibraryManage-container">
      <div className="layoutLibraryManage-top">
      {
        !isOpenNew && <div>
          <Input className="layoutLibraryManage-top-search" addonBefore="检索布局模块" placeholder="请输入布局名称，按Enter键搜索"/>
          <Button className="layoutLibraryManage-top-search-button" shape="circle" icon="search" />
          <Button className="layoutLibraryManage-top-button-add" type="primary" onClick={this.handleAddNewLayout.bind(this, true)}>添加新布局</Button>
        </div>
      }
      {
        isOpenNew && <div>
          <div className="layoutLibraryManage-top-add-title">添加新布局</div>
          <Button className="layoutLibraryManage-top-button-add" type="primary" onClick={this.handleAddNewLayout.bind(this, false)}>返回列表</Button>
        </div>
      }
      </div>
    </div>
  }
}


module.exports = LayoutLibraryManage;
