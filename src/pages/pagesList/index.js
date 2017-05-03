'use strict';
import { connect } from 'react-redux';
import * as React from 'react';
import refetch from 'refetch';
import { Modal, message, Pagination, Input, Button } from 'antd';
import deepEqual from 'deeper';
import deepClone from 'deepclone';
import { mapStateToProps } from '../../connect/pagesListConnect.js';
import { handlePageSaveClick } from '../base/button.js';

require('./pagesList.less');

class PagesList extends React.Component {
	constructor(props) {
		super(props);

    this.state = {
      data: [],
			tolCount: 0,
      size: 10,
      page: 1,
      name: ''
    };
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
    let { size, page, name } = this.state;
    let { pagesListApi } = props;
    if(!pagesListApi) return;
    refetch.get( pagesListApi, {size, page, name}).then( res => {
      res = JSON.parse(res);
      if( res.success) {
        this.setState({
          data: res.model.data,
					tolCount: res.model.tolCount
        })
      }else{
        message.error(res.msg || '数据获取出现错误');
      }
    }).catch(e=>{
      message.error('请求数据获取接口出现错误');
    })
  }

  handleSearchNameChange(e) {
    this.state.searchText = e.target.value;
  }

  handleSearchClick() {
		this.state.name = this.state.searchText;
		this.fetchData();
  }

	formatTime( time ) {
		time *= 1000;
		let timeObj = new Date(time);
		return timeObj.getFullYear() + '/' + (timeObj.getMonth() + 1) + '/' + timeObj.getDate();
	}

	handleClickReedit( item ) {
		let changeData = (infoData) => {
			// infoData 是保存原数据后返回的数据
			if(infoData){
				if(infoData.id == parseInt(item.id)) {
					item.name = infoData.name;
					item.description = infoData.description;
				}
			}
			this.props.dispatch({
				type: "REEDIT_LAYOUT_DATA",
				layoutData: JSON.parse(deepClone(item.json)),
				layoutInfo: {
					id: item.id,
					name: item.name,
					description: item.description
				}
			});
			location.href = '#index';

		}
		if(!this.props.layoutData) {
			changeData();
		} else { // 已存在数据
			Modal.confirm({
				title: '更改页面编辑器数据',
				content: (<div>当前页面编辑器存在数据，是否保存？</div>),
				okText: '保存',
				onOk: ()=>{
					handlePageSaveClick( this, changeData);
				},
				cancelText: '不保存直接替换',
				onCancel: ()=>{
					changeData();
				}
			});
		}
	}

	handleClickDelete( id ) {
		let { pageDataDelete } = this.props;
		if(!pageDataDelete) {
			message.error('未配置（或加载失败）页面删除接口');
			return;
		}
		Modal.confirm({
			title: '真的要删除这个页面吗？',
			content: (<div>页面删除不可恢复，请谨慎操作</div>),
			okText: '删除',
			onOk: ()=>{
				refetch.get( pageDataDelete, { id }).then( res => {
		      res = JSON.parse(res);
		      if( res.success) {
						message.success('页面已删除');
		        this.fetchData()
		      }else{
		        message.error(res.msg || '页面删除出现错误');
		      }
		    }).catch(e=>{
		      message.error('请求页面删除接口出现错误');
		    })
			},
			cancelText: '取消'
		});
	}

	handlePageChange(page) {
		this.state.page = page;
		this.fetchData();
	}

  render() {
		let { data, tolCount, size, page } = this.state;

    return <div className="pagesList-container-outer">
      <div className="pagesList-top">
        <div className="pagesList-title">已存储页面</div>
        <div className="pagesList-search-container">
          <Input className="pagesList-search" addonBefore="检索页面" onChange={this.handleSearchNameChange.bind(this)} onPressEnter={this.handleSearchClick.bind(this)} placeholder={"请输入页面名称，按Enter键/点击右侧按钮搜索"}/>
          <Button className="pagesList-searchh-button" shape="circle" icon="search" onClick={this.handleSearchClick.bind(this)}/>
        </div>
      </div>
      <div className="pagesList-container">
      {
        data && data.map(item=>{
          return <div className="pagesList-item">
            <div className="pagesList-item-name">{ item.name }</div>
						<div className="pagesList-item-description">{ item.description }</div>
						<div className="pagesList-item-time">页面创建时间：{ this.formatTime(item.createTime) }</div>
						<div className="pagesList-item-buttons">
							<div className="pagesList-item-button" onClick={ this.handleClickReedit.bind(this, item) }>再编辑</div>
							<div className="pagesList-item-button">编译导出</div>
							<div className="pagesList-item-button" onClick={ this.handleClickDelete.bind(this, item.id) }>删除</div>
						</div>
          </div>
        })
      }
      </div>
			<div className="pagesList-pagination">
				<Pagination total={tolCount} pageSize={size} current={page} onChange={this.handlePageChange.bind(this)}/>
			</div>
    </div>
  }
}

module.exports = connect( mapStateToProps )( PagesList );
