const button = {
	'/': [
		// {
    //   name: '布局模板',
    //   action: 'LIBRARY_OPEN_LAYOUT',
    //   icon: '',
    //   title: '打开布局模板库'
		// },
    // {
    //   name: '模块库',
    //   action: 'LIBRARY_OPEN_MODULE',
    //   icon: '',
    //   title: '打开模块库'
    // },
		{
			name: '保存此页面',
			action: 'SAVE_THIS_PAGE',
			title: '保存此页面中添加或编辑的内容',
			rule: (that) => {
				if( !that.props.layoutData ) return false;
				if(location.href.indexOf('index')!=-1) return true;
				return false;
			}
		},
		{
			name: '打开页面库',
			action: 'OPEN_SAVED',
			title: '浏览已保存的页面已便使用或重新编辑'
		},
		{
			name: '库管理',
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
      title: '退出页面编辑器'
    }
	]
};

module.exports = button;
