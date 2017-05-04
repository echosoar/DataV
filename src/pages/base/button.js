import { Modal, message, Input } from 'antd';

import refetch from 'refetch';

let handlePageSaveClick = (that, cb) => {

	let { defaultConfig, layoutInfo, layoutData } = that.props,
			doType = '创建新',
			name = '',
			description = '',
			id = -1;

	if(layoutInfo) {
		 name = layoutInfo.name;
		 description = layoutInfo.description;
		 if(layoutInfo.id!=null) id = layoutInfo.id;
	}

	let savePageFun = () => {
		refetch.post( apiAddress, { name, description, data: JSON.stringify(layoutData), id } ).then(res=>{
			res = JSON.parse(res);
			if(res.success){
				id = parseInt(res.model);
				apiAddress = defaultConfig.api.pageDataEdit;
				doType = '修改';
				message.success('保存成功');
				cb({
					name,
					description,
					id
				});
			}else{
				message.error((res && res.msg) || '接口请求错误');
			}
		}).catch(err=>{
			message.error('接口请求错误');
		});
	}
	if(!defaultConfig || !defaultConfig.api) {
		message.error("尚未页面库相关接口配置 (no loaded config)");
		return;
	}
	let apiAddress = defaultConfig.api.pageDataAdd;
	if( layoutInfo ) {
		apiAddress = defaultConfig.api.pageDataEdit;
		doType = '修改';
	}

	if(!apiAddress) {
		message.error("请设置页面库相关接口");
		return;
	}

	Modal.confirm({
		title: doType+'页面 - 设置页面的名称和描述',
		content: (<div>
				<Input addonBefore="页面名称" defaultValue={name} onChange={(e)=>{
					name = e.target.value;
				}} />
				<div style={{ marginTop: 8 }}>
					<Input addonBefore="页面描述" defaultValue={description} onChange={(e)=>{
						description = e.target.value;
					}} />
				</div>
			</div>),
		okText: '确认' + doType + '页面',
		onOk: ()=>{
			savePageFun();
		},
		cancelText: '取消',
	});

};

const button = {
	'/': [
		{
			name: '预览',
			action: 'PAGE_EDITING_PREVIEW',
			title: '预览已编辑的页面内容',
			rule: (that) => {
				if( !that.props.layoutData ) return false;
				if( that.props.isUsePreView ) return false;
				if(location.href.indexOf('index')!=-1) return true;
				return false;
			}
		},
		{
			name: '退出预览，继续编辑',
			action: 'PAGE_EDITING_EDIT',
			title: '继续编辑此页面',
			rule: (that) => {
				if( !that.props.layoutData ) return false;
				if( !that.props.isUsePreView ) return false;
				if(location.href.indexOf('index')!=-1) return true;
				return false;
			}
		},
		{
			name: '保存此页面',
			action: 'SAVE_THIS_PAGE',
			title: '保存此页面中添加或编辑的内容',
			onClick: handlePageSaveClick,
			rule: (that) => {
				if( !that.props.layoutData ) return false;
				if(location.href.indexOf('index')!=-1) return true;
				return false;
			}
		},
		{
			name: '页面数据配置管理',
			action: 'GLOBAL_DATA_CONFIG',
			title: '配置全局数据对象、数据接口，管理页面数据、页面显示控制属性',
			rule: (that) => {
				if( !that.props.layoutData ) return false;
				if(location.href.indexOf('index')!=-1) return true;
				return false;
			}
		},
		{
			name: '查看已存储页面',
			action: 'OPEN_SAVED',
			title: '浏览已保存的页面已便使用或重新编辑',
			rule: (that) => {
				if(location.href.indexOf('pagesList')!=-1) return false;
				return true;
			}
		},
		{
			name: '模板组件库管理',
			action: 'LIBRARY_MANAGE_OPEN',
			title: '添加、配置或删除布局模板、组件',
			rule: (that) => {
				if(location.href.indexOf('librartManage')!=-1) return false;
				return true;
			}
		},
		{
			name: '页面编辑器',
			action: 'WINDOW_RETUEN_INDEX',
			title: '页面编辑器',
			rule: (that) => {
				if(location.href.indexOf('index')!=-1) return false;
				return true;
			}
		},
		{
			name: '设置',
			action: 'WINDOW_SETTING',
			title: 'DataV 系统设置',
			rule: (that) => {
				if(location.href.indexOf('setting')!=-1) return false;
				return true;
			}
		},
    {
      name: '',
      action: 'WINDOW_CLOSE',
      icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABNElEQVRYR+2WUQ0CMRBEBwfgAAlIAAXgAHAwThgH4AALSEACEpBAmnBJc1x7u1uS44P7vnZeZ7fTnWHibzaxPv4Av+sAyaWkxzd6hORc0nNor0EHSO4AnAFsJN1bIEheAOwlDWoVS/BeuG2B6MQBHCUlkI+v2gMtEBbxRDPahBEIkgRwqp28s2IUIP3ogSB5ePdP0fa8DiYAK4RX3FSCnLbmRETcDVByIioeAuhDAFh5at6/h+Ye6C/MyjG3dHspzFoB9gBSxIYTMwSQhwyANYBwYroBhhLOkxNNPVCL1yiE2QFLtkcgTAAW8c5aL8QogEc8AmF5jtNVMz0s1tg2PUaRk1fCqpgTtZHsGjl5CULSwjwRpSESQBpKm+bBrCfWkm5mgJYh1Lt29BZ4N/T+/weY3IEXsk3FIZTHIRAAAAAASUVORK5CYII=',
      title: '退出 Page Configurator'
    }
	]
};

module.exports = {
	BUTTON: button,
	handlePageSaveClick
}
