'use strict';
import { connect } from 'react-redux';
import { Component } from 'react';
import { mapStateToProps } from '../../connect/baseConnect.js';
import refetch from 'refetch';
require('./moduleVersionUpdate.less');

class ModuleVersionUpdate extends Component {
	constructor(props) {
		super(props);
    this.state = {
      isChecked: false,
      moduleList: <div></div>
    }

    this.nowModules = {};
	}

  handlePreButtonClick() {
    this.renderModuleConfig.call(this);
    this.setState({isChecked: true})
  }

  handleCloseButtonClick() {
    this.setState({isChecked: false})
  }

  checkModule(layoutData, path) {
  		if(!layoutData) return null;
  		let { component, props, template, display } = layoutData;
  		if(template) { // 存在template即为模板
        template.childs && template.childs.map((item, itemIndex) => this.checkModule.call(this, item, path + '-' + itemIndex));
  		} else {
        let { hashName, version, name } = layoutData;
        if(!this.nowModules[hashName]) {
          this.nowModules[hashName] = {
            name,
            hashName,
            childs: []
          }
        }

        this.nowModules[hashName].childs.push({
          path,
          version
        });
  		}
  }

	handleClickUpdate(newVersion, scriptAddr, hashName) {
		this.props.dispatch({
			type: 'UPDATE_MODULE_VERSION',
			hashName,
			newVersion,
			scriptAddr
		});
		this.handleCloseButtonClick.call(this);
	}

	renderChildVersion(childs, newVersion, scriptAddr, hashName) {
		let unUpdate = 0;
		let newModule = 0;
		childs.map(v=>{
			if(v.version != newVersion) {
				unUpdate ++ ;
			} else {
				newModule ++;
			}
		});

		return <div className="moduleVersionUpdate-module-item-childs">
			<div className="moduleVersionUpdate-module-item-info">
				<div>在此页面共引用 { childs.length } 次，</div>
				{
					unUpdate> 0 && <div>{ newModule } 次引用已升级到最新版，还有 { unUpdate } 次需要升级。</div>
				}
				{
					unUpdate== 0 && <div>所有引用均已升级到最新版。</div>
				}
			</div>
			{
				unUpdate> 0 && <div
				 onClick={this.handleClickUpdate.bind(this, newVersion, scriptAddr, hashName)}
				 className="moduleVersionUpdate-module-item-update">
				全部升级
				</div>
			}
		</div>
	}

	execServerModule(data, moduleListObj) {
		if(!data) {
			this.setState({
				moduleList: <div className="moduleVersionUpdate-noModule">无线上模块</div>
			});
			return;
		}
		this.setState({
			moduleList: <div className="moduleVersionUpdate-module-container">
			{
				data.map(item=>{
					let key = item.hashName;
					return <div className="moduleVersionUpdate-module-item">
						<div className="moduleVersionUpdate-module-item-name">{
							moduleListObj[key].name
						}</div>
						<div className="moduleVersionUpdate-module-item-hashName">{
							key
						}</div>
						{
							this.renderChildVersion.call(this, moduleListObj[key].childs, item.version, item.scriptAddr, key)
						}
					</div>
				})
			}
			</div>
		});

	}

	fetchModuleData(ObKeys, moduleListObj) {
		refetch.post('http://datavs.applinzi.com/moduleVersion.php', {
			hashName: ObKeys
		}).then(res=>{
      res = JSON.parse(res);
      if( res.success) {
        this.execServerModule.call(this, res.model && res.model.data, moduleListObj)
      }else{
				this.setState({
	        moduleList: <div className="moduleVersionUpdate-noModule">模块版本检测接口出错</div>
	      })
			}
		})
	}

  renderModuleConfig() {
    let { layoutData } = this.props;
    this.checkModule(layoutData, '0');
		let ObKeys = Object.keys(this.nowModules);
    if(!ObKeys.length) {
      this.setState({
        moduleList: <div className="moduleVersionUpdate-noModule">当前页面没有使用任何模块</div>
      })
    }else {
			this.fetchModuleData.call(this, ObKeys, this.nowModules);
			this.setState({
        moduleList: <div className="moduleVersionUpdate-noModule">正则加载模块版本，请稍后</div>
      })
    }
  }

	render(){

    let { isChecked, moduleList } = this.state;
    let { layoutData } = this.props;
    if(!layoutData || location.href.indexOf('index')==-1) return <div></div>;

    this.nowModules = {};

		return <div className="moduleVersionUpdate">
      {
        !isChecked && <div onClick={this.handlePreButtonClick.bind(this)} className="moduleVersionUpdate-preButton">
          <div className="moduleVersionUpdate-preButton-text">模块版本升级</div>
        </div>
      }
      {
        isChecked && <div className="moduleVersionUpdate-container">
          <div className="moduleVersionUpdate-top">
            <div className="moduleVersionUpdate-title">模块版本升级</div>
            <div className="moduleVersionUpdate-close" onClick={this.handleCloseButtonClick.bind(this)}></div>
          </div>
          <div className="moduleVersionUpdate-bottom">
            { moduleList }
          </div>
        </div>
      }
		</div>
	}
}


module.exports = connect(mapStateToProps)(ModuleVersionUpdate);
