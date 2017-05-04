'use strict';
import { connect } from 'react-redux';
import * as React from 'react';
import refetch from 'refetch';
import { Input, Button, message } from 'antd';
import Loading from '../../common/Loading/';
import { mapStateToProps } from '../../connect/libraryManageConnect.js';
import List from './list.js';
import Top from './top.js';
require('./libraryManageItem.less');

class LayoutLibraryManage extends React.Component {
  constructor( props ) {
    super( props );
    this.state = {
      data: [],
      isOpenNew: false,
      newLayoutJsonIsCanUse: false,
      newLayoutJsonData: '',
      name: '',
      page: 1,
      size: 8
    }
  }


  handleAddNewLayout(isOpenNew) {
    this.setState( {
      isOpenNew,
      newLayoutJsonIsCanUse: false,
      newLayoutJsonData: '',
      name: '',
      page: 1
    });
  }

  handleAddNewLayoutJson(e) {
    let newLayoutJsonIsCanUse = false,
        newLayoutJsonData = e.target.value;
    try{
      let temData = JSON.parse(newLayoutJsonData);
      if(!temData.name || temData.version=='null' || !temData.template.component || !temData.enName || !temData.template.props.className) {
        throw new Error();
      }
      newLayoutJsonIsCanUse = true;
    }catch(e) {
      newLayoutJsonIsCanUse = false;
    }
    this.setState({
      newLayoutJsonIsCanUse: newLayoutJsonIsCanUse,
      newLayoutJsonData: e.target.value
    })
  }

  handleAddThisLayoutTemplate() {
    let { newLayoutJsonIsCanUse, newLayoutJsonData, name, page, size } = this.state;
    let { defaultConfig } = this.props;
    if(newLayoutJsonIsCanUse) {

      if(!defaultConfig) {
        message.error('获取系统配置出错');
        return;
      }
      if(!defaultConfig.api || !defaultConfig.api.layoutLibraryAdd) {
        message.error('请进入 “设置->接口设置->数据添加接口” ，设置 “添加新布局模板接口” 地址');
        return;
      }
      newLayoutJsonData = newLayoutJsonData.replace(/\\/g, "#DataVSlashFormat#");
      refetch.post( defaultConfig.api.layoutLibraryAdd, {data: newLayoutJsonData } ).then(res=>{
        res = JSON.parse(res);
        if(res.success){
          this.handleAddNewLayout.call(this, false);
        }else{
          message.error((res && res.msg) || '接口请求错误');
        }
      }).catch(err=>{
        message.error('接口请求错误');
      })
    } else {
      message.error('请输入正确的JSON字符串，并包含必须字段');
    }
  }


  handleSearchClick( data ) {
    this.setState({
      name: data
    })
  }

  handlePageChange(page) {
    this.setState({
      page
    })
  }

  render() {

    let { isOpenNew, newLayoutJsonIsCanUse, page, size, name } = this.state;

    let {defaultConfig} = this.props;
    return <div className="libraryManageItem-container">
      <Top
        text="布局模板"
        isOpenNew={isOpenNew}
        onChange={this.handleAddNewLayout.bind(this)}
        onSearch={this.handleSearchClick.bind(this)}
        />
      <div className="libraryManageItem-main">
      {
        isOpenNew && <div className="libraryManageItem-main-add">

          <div className="libraryManageItem-main-add-item">
            <div className="libraryManageItem-main-add-item-title">布局模板配置JSON</div>
            <Input type="textarea" placeholder="请输入布局模板配置JSON" onChange={this.handleAddNewLayoutJson.bind(this)} autosize={{ minRows: 20}} />
            <div className="libraryManageItem-main-add-error">
            {
              !newLayoutJsonIsCanUse && '请输入正确的JSON字符串，并包含必须字段'
            }
            </div>
            <Button className="libraryManageItem-main-add-button" type="primary" onClick={this.handleAddThisLayoutTemplate.bind(this)}>确认添加布局模板</Button>
          </div>
          <div className="libraryManageItem-main-add-item libraryManageItem-main-add-info">
            <div className="libraryManageItem-main-add-item-title">布局模板包含：</div>
            <div className="libraryManageItem-main-add-item-stitle">1. 模板基本信息：</div>
            <ul>
              <li>name ：【必须】模板名称。</li>
              <li>introduction ： 模板简介信息。</li>
              <li>enName ：【必须】模板英文名称。</li>
              <li>version ：【必须】当前模板版本。</li>
              <li>datavVersion ：要求使用此模板的DataV的最低版本（暂无作用）。</li>
              <li>previewImg ：布局预览图像，可使用DataUrl或线上地址，大小最好为240*140，其它比例会被拉伸或缩放。</li>
              <li>repeat ：模块条目是否可重复</li>
            </ul>
            <div className="libraryManageItem-main-add-item-stitle">2. 模板布局信息：</div>

              DataV 会根据这里的信息，递归调用React.createElement方法进行模板渲染。
              <ul>
                <li>template ：【必须】模板当前层信息，是一个对象。
                  <ul>
                    <li>component ：【必须】当前标签名称，是一个字符串类型的值，如 div、table、span等等。</li>
                    <li>props ：【必须】当前标签层属性值
                      <ul>
                        <li>className ：【必须】代表当前标签层class值。作为一个DataV的布局模板，要求模板主容器层的className需要包含 template-container ；模板的子条目层需要包含 template-item ；其它中间层都需要有 template-middle ，使用方法可以查看下面的demo。</li>
                        <li>style ：代表模板的样式，如果下面的值匹配上了样式配置列表里面的属性，那么就可以唤起属性配置面板进行属性配置。</li>
                      </ul>
                    </li>
                    <li>childs ：这是一个数组，存放子条目、子布局模板、组件等各种此模板层包含的信息。</li>
                  </ul>
                </li>
              </ul>
          </div>
        </div>
      }
      {
        !isOpenNew && <List
          api={ defaultConfig && defaultConfig.api && defaultConfig.api.layoutLibraryList }
          editApi={ defaultConfig && defaultConfig.api && defaultConfig.api.layoutLibraryEdit }
          page={page}
          name={name}
          size={size}
          onPageChange={this.handlePageChange.bind(this)}
          />
      }
      </div>
    </div>
  }
}


module.exports = connect(mapStateToProps)(LayoutLibraryManage);
