'use strict';
import { Component } from 'react';
import refetch from 'refetch';
import deepEqual from 'deeper';
import {  Modal, message, Pagination, Input } from 'antd';

require('./list.less');

class List extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      data: false
    }
    this.fetchData = this.fetchData.bind(this);
    this.fetchData();
  }

  componentWillReceiveProps(newProps) {
    if(!deepEqual(newProps, this.props)) {
      this.fetchData(newProps);
    }
  }

  fetchData(props) {
    props = props || this.props;
    let { api, size, page, name } = props;
    if(!api) return;
    refetch.get( api, {size, page, name}).then( res => {
      res = JSON.parse(res);
      if( res.success) {
        this.setState({
          data: res.model
        })
      }else{
        message.error(res.msg || '数据获取出现错误');
      }
    }).catch(e=>{
      message.error('请求数据获取接口出现错误');
    })
  }

  handleViewJson(data) {
    let json = data.json;
    this.state.temViewJsonData = json;
     Modal.confirm({
       title: '查看/编辑配置JSON',
       content: (
          <div style={{'word-break': 'break-all', 'max-height': '320px', 'overflow-y': 'auto'}}>
            <Input type="textarea" defaultValue={json} autosize={{maxRows: 16}} onChange={this.handleViewJsonEdit.bind(this)}/>
          </div>
      ),
      width: '640px',
      onOk: this.handleViewJsonEditSave.bind(this, json, data.id),
      onCancel: () => {
        this.state.temViewJsonData = false;
      },
      okText: '保存修改',
      cancelText: '关闭'
    });
  }

  handleViewJsonEdit(e) {
    this.state.temViewJsonData =  e.target.value;
  }

  handleViewJsonEditSave(oldData, id) {
    console.log(id)
    let newData = {};
    try {
      newData = JSON.parse(this.state.temViewJsonData);
      oldData = JSON.parse(oldData);
    }catch(e){
      message.error('修改后的数据不是一个正确的JSON字符串');
      return new Promise.reject();
    }
    if(deepEqual(newData, oldData)) {
      return;
    }
  }

  handlePageChange(page) {
    this.props.onPageChange && this.props.onPageChange(page);
  }

  render() {
    let { data } = this.state;

    let { api, page, size } = this.props;

    if(!api) return <div>API 接口不存在，请进入 “设置->接口设置->数据添加接口” ，设置接口地址</div>;

    if(!data || !data.tolCount || data.tolCount == '0') return <div>暂无数据</div>;

    return <div className="libraryManageListContainer">
      <div className="libraryManageListItemContainer">
      {
        data.data.map(itemJson => {
          let item = JSON.parse(itemJson.json);
          return <div className="libraryManageListItem">
            <div className="libraryManageListItem-name">{ item.name }</div>
            <div className="libraryManageListItem-introduction" title={ item.introduction }>{ item.introduction }</div>
            <div className="libraryManageListItem-preview" style={{background: '#eee url(' + item.previewImg +') center center/contain no-repeat'}}></div>
            <div className="libraryManageListItem-viewjson" onClick={this.handleViewJson.bind(this, itemJson)}>JSON</div>
          </div>
        })
      }
        <Pagination total={data.tolCount} pageSize={size} current={page} onChange={this.handlePageChange.bind(this)}/>
      </div>
      </div>
  }
}

module.exports = List;
