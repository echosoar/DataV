'use strict';
import { connect } from 'react-redux';
import * as React from 'react';
import { mapStateToProps } from '../../connect/systemConnect.js';
import Loading from '../../common/Loading/';
import { Menu, Form, Input, Button } from 'antd';
require('./api.less');

const apiKeyToCn = {
  'datavApiTitle_1': "数据查询接口",
  baseModuleList: "基础组件接口",
  dataModuleList: "数据组件接口",
  layoutLibraryList: "布局列表接口",
  'datavApiTitle_2': "数据添加接口",
  layoutLibraryAdd: '添加新布局模板接口',
  baseModuleLibraryAdd: '添加新基础组件接口',
  dataModuleLibraryAdd: '添加新数据组件接口'
}

const FormItem = Form.Item;

class SystemSettingApi extends React.Component {
	constructor(props) {
		super(props);
		this.state = {}
	}

  handleSubmit( e ) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err && values) {
        this.props.dispatch({type: 'UPDATE_SYSTEM_CONFIG_API', data: values});
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
          labelCol: {
            xs: { span: 24 },
            sm: { span: 6 },
          },
          wrapperCol: {
            xs: { span: 24 },
            sm: { span: 14 },
          },
        };
    let { defaultConfig } = this.props;

    if( !defaultConfig || !defaultConfig.api ) return <Loading text="API配置加载中" style={{'padding-left': '120px'}}/>;
    let apis = Object.keys(apiKeyToCn);
    return <div className="systemSettingApi-container">
      <Form onSubmit={this.handleSubmit.bind(this)}>
        {
          apis.map(apiItem => {
            if(apiItem.indexOf('datavApiTitle_')!=-1){
              return <div className="systemSettingApi-title">{ apiKeyToCn[apiItem] }</div>
            }
            return (
              <FormItem
                {...formItemLayout}
                label={apiKeyToCn[apiItem]||''}
              >
              {getFieldDecorator(apiItem, {
                rules: [{
                    type: 'url', message: '需要填入一个URL地址',
                  }],
                initialValue: defaultConfig.api[apiItem]
              })(
                <Input />
              )}
            </FormItem>
            )
          })
        }
        <FormItem wrapperCol={{ span: 12, offset: 6 }} >
          <Button type="primary" htmlType="submit">保存</Button>
        </FormItem>
      </Form>
    </div>
  }
}

module.exports = connect(mapStateToProps)( Form.create()(SystemSettingApi) );
