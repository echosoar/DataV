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

class BaseModuleLibraryManage extends React.Component {
  constructor( props ) {
    super( props );
    this.state = {
      data: [],
      isOpenNew: false,
      newJsonIsCanUse: false,
      newJsonData: '',
      name: '',
      page: 1,
      size: 10
    }
  }


  handleAddNew(isOpenNew) {
    this.setState( {
      isOpenNew,
      newJsonIsCanUse: false,
      newJsonData: '',
      name: '',
      page: 1
    });
  }

  handleAddNewJson(e) {
    let newJsonIsCanUse = false,
        newJsonData = e.target.value;
    try{
      let temData = JSON.parse(newJsonData);
      if(!temData.name || temData.version=='null' || !temData.scriptAddr || !temData.enName || !temData.hashName) {
        throw new Error();
      }
      newJsonIsCanUse = true;
    }catch(e) {
      newJsonIsCanUse = false;
    }
    this.setState({
      newJsonIsCanUse: newJsonIsCanUse,
      newJsonData: e.target.value
    })
  }

  handleAddThisTemplate() {
    let { newJsonIsCanUse, newJsonData, name, page, size } = this.state;
    let { defaultConfig } = this.props;
    if(newJsonIsCanUse) {

      if(!defaultConfig) {
        message.error('获取系统配置出错');
        return;
      }
      if(!defaultConfig.api || !defaultConfig.api.baseModuleLibraryAdd) {
        message.error('请进入 “设置->接口设置->数据添加接口” ，设置 “添加新基础组件接口” 地址');
        return;
      }

      refetch.post( defaultConfig.api.baseModuleLibraryAdd, {data: newJsonData } ).then(res=>{
        if(res.success){
          this.handleAddNew.call(this, false);
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

  render() {

    let { isOpenNew, newJsonIsCanUse, page, size, name } = this.state;

    let {defaultConfig} = this.props;
    return <div className="libraryManageItem-container">
      <Top
        text="基础组件"
        isOpenNew={isOpenNew}
        onChange={this.handleAddNew.bind(this)}
        onSearch={this.handleSearchClick.bind(this)}
        />
      <div className="libraryManageItem-main">
      {
        isOpenNew && <div className="libraryManageItem-main-add">

          <div className="libraryManageItem-main-add-item">
            <div className="libraryManageItem-main-add-item-title">基础组件配置JSON</div>
            <Input type="textarea" placeholder="请输入基础组件配置JSON" onChange={this.handleAddNewJson.bind(this)} autosize={{ minRows: 20}} />
            <div className="libraryManageItem-main-add-error">
            {
              !newJsonIsCanUse && '请输入正确的JSON字符串，并包含必须字段'
            }
            </div>
            <Button className="libraryManageItem-main-add-button" type="primary" onClick={this.handleAddThisTemplate.bind(this)}>确认添加基础组件</Button>
          </div>
          <div className="libraryManageItem-main-add-item libraryManageItem-main-add-info">
            <div className="libraryManageItem-main-add-item-title">基础组件包含：</div>
            <ul>
              <li>name ：【必须】模块名称。</li>
              <li>introduction ： 模块简介信息。</li>
              <li>enName ：【必须】模块英文名称。</li>
              <li>version ：【必须】当前模块版本。</li>
              <li>datavVersion ：要求使用此模块的DataV的最低版本（暂无作用）。</li>
              <li>previewImg ：模块预览图像，可使用DataUrl或线上地址，大小最好为240*140，其它比例会被拉伸或缩放。</li>
              <li>hashName ：【必须】模块hashName，模块的唯一识别码。</li>
              <li>scriptType ：模块脚本文件类型：
                <ul>
                  <li>loacl ：本地模块，发布的时候会进行本地模块打包操作。</li>
                  <li>online ：线上模块。</li>
                </ul>
              </li>
              <li>scriptAddr ：【必须】模块脚本文件地址，支持本地或线上地址。</li>
              <li>props ：模块的属性
                <ul>
                  <li>style ：模块的样式，如果下面的值匹配上了样式配置列表里面的属性，那么就可以唤起样式属性配置面板进行样式配置。</li>
                  <li>其它属性 ：这些属性都是一个对象来表示：
                    <ul>
                      <li>text ：属性名称。</li>
                      <li>type ：属性的类型，类型可以查看 属性类型列表（propsType.md）。</li>
                      <li>value ：属性值。</li>
                      <li>options ：type为array时必选，代表可以选择的值。</li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      }
      {
        !isOpenNew && <List api={ defaultConfig && defaultConfig.api && defaultConfig.api.baseModuleList} page={page} name={name} size={size}/>
      }
      </div>
    </div>
  }
}


module.exports = connect(mapStateToProps)(BaseModuleLibraryManage);
