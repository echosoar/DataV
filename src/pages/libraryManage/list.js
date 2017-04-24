'use strict';
import { Component } from 'react';
import refetch from 'refetch';
import deepEqual from 'deeper';
import { message } from 'antd';

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

  render() {

    if(!this.props.api) return <div>API 接口不存在，请进入 “设置->接口设置->数据添加接口” ，设置接口地址</div>;

    if(!this.state.data) return <div>暂无数据</div>;

    return <div>{this.props.api}</div>
  }
}

module.exports = List;
