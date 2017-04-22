'use strict';
import { connect } from 'react-redux';
import * as React from 'react';
import { mapStateToProps } from '../../connect/systemConnect.js';
import Loading from '../../common/Loading/';
import { Menu, Form, Input, Button } from 'antd';
require('./api.less');

const apiKeyToCn = {
  baseModuleListAll: "所有基础组件接口",
  baseModuleListByName: "根据名称查询基础组件接口",
  dataModuleListAll: "所有数据组件接口",
  dataModuleListByName: "根据名称查询数据组件接口",
  layoutLibraryListAll: "所有布局列表接口",
  layoutLibraryListByName: "根据名称查询布局列表接口"
}

const FormItem = Form.Item;

class SystemSettingApi extends React.Component {
	constructor(props) {
		super(props);
		this.state = {

		}
	}

  handleSubmit( e ) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log(values)
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

    if( !defaultConfig || !defaultConfig.api ) return <Loading />;
    let apis = Object.keys(defaultConfig.api);
    return <div className="systemSettingApi-container">
      <Form onSubmit={this.handleSubmit.bind(this)}>
        {
          apis.map(apiItem => {
            return (
              <FormItem
                {...formItemLayout}
                label={apiKeyToCn[apiItem]||''}
              >
              {getFieldDecorator(apiItem, {
                rules: [{
                    type: 'url', message: '需要填入一个URL地址',
                  }, {
                    required: true, message: '不可为空!',
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
