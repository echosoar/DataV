'use strict';
import { Component } from 'react';
import { Input, Button, message } from 'antd';
require('./top.less');
class Top extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      data: ''
    }
  }

  onChange(isOpenNew) {
    this.props.onChange && this.props.onChange(isOpenNew);
  }

  handleSearchClick() {
    this.props.onSearch && this.props.onSearch( this.state.data );
  }

  handleSearchNameChange(e) {
    this.setState({
      data: e.target.value
    })
  }

  render() {

    let { isOpenNew, text } = this.props;

    return <div className="LibraryManage-top">
    {
      !isOpenNew && <div>
        <Input className="LibraryManage-top-search" addonBefore={"检索" + text} onChange={this.handleSearchNameChange.bind(this)} onPressEnter={this.handleSearchClick.bind(this)} placeholder={"请输入" + text + "名称，按Enter键/点击右侧按钮搜索"}/>
        <Button className="LibraryManage-top-search-button" shape="circle" icon="search" onClick={this.handleSearchClick.bind(this)}/>
        <Button className="LibraryManage-top-button-add" type="primary" onClick={this.onChange.bind(this, true)}>添加新{text}</Button>
      </div>
    }
    {
      isOpenNew && <div>
        <div className="LibraryManage-top-add-title">添加新{text}</div>
        <Button className="LibraryManage-top-button-add" type="primary" onClick={this.onChange.bind(this, false)}>返回列表</Button>
      </div>
    }
    </div>
  }
}

module.exports = Top;
