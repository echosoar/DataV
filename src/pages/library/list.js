'use strict';
import { connect } from 'react-redux';
import { Component } from 'react';
import refetch from 'refetch';
import deepEqual from 'deeper';
import {  Modal, message, Pagination, Input } from 'antd';
import { mapStateToProps } from '../../connect/libraryListConnect.js';
import Loading from '../../common/Loading/';
require('./list.less');

class LibraryList extends Component {
  constructor( props ) {
    super( props );

    this.state = {
      data: [],
      page: 1,
      size: 5,
      name: '',
      searchData: '',
      tolCount: 0
    }

    this.fetchData = this.fetchData.bind(this);
    this.fetchData();
  }

  handleItemClick(item) {
    this.props.dispatch({type: 'LIBRARY_CLOSE'});
    this.props.dispatch({type: 'ADD_LIBRARY', data: item});
  }

  componentWillReceiveProps(newProps) {
    if(!deepEqual(newProps, this.props)) {
      this.state.page = 1;
      this.state.name = '';
      this.state.searchData = '';
      this.fetchData(newProps);
    }
  }

  fetchData(props) {
    props = props || this.props;
    let { api } = props;
    let { size, page, name } = this.state;
    if(!api) return;
    refetch.get( api, {size, page, name}).then( res => {
      res = JSON.parse(res);
      if( res.success) {
        this.setState({
          data: res.model.data.map(item=>JSON.parse(item)),
          tolCount: res.model.tolCount
        })
      }else{
        message.error(res.msg || '数据获取出现错误');
      }
    }).catch(e=>{
      message.error('请求数据获取接口出现错误');
    })
  }

  handleSearchClick() {
    this.state.name = this.state.searchData;
    this.fetchData();
  }

  handleSearchNameChange(e) {
    this.setState({
      searchData: e.target.value
    })
  }

  handlePageChange(page) {
    this.state.page = page;
    this.fetchData();
  }

  render() {
    let { data, tolCount, size, page } = this.state;
    let { api } = this.props;

    return <div className="libraryList-container">
      <div className="libraryList-search-container">
        <Input className="libraryList-search" onChange={this.handleSearchNameChange.bind(this)} onPressEnter={this.handleSearchClick.bind(this)} placeholder={"请输入名称，按Enter键搜索"}/>
      </div>
      {
        (!api || !data || !data.length) && <div className="libraryList-nodata">~ · No Data · ~</div>
      }
      {
        data && data.map(item => {
          return <div className="libraryList-item">
            <div className="libraryList-item-name">{ item.name }</div>
            <div className="libraryList-item-introduction">{ item.introduction }</div>
            <div className="libraryList-item-preview" style={{background: '#eee url(' + item.previewImg +') center center/contain no-repeat'}}></div>
            <div
              className="libraryList-item-add-button"
              onClick={this.handleItemClick.bind(this, item)}
              >
              添加
            </div>
          </div>
        })
      }
      {
        data && data.length>0 && tolCount>size && <div className="libraryList-pagination">
          <Pagination simple total={tolCount} pageSize={size} current={page} onChange={this.handlePageChange.bind(this)}/>
        </div>
      }
    </div>
  }

}

module.exports = connect(mapStateToProps)(LibraryList);
