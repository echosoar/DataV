'use strict';
import { Component } from 'react';
import { Steps } from 'antd';
const Step = Steps.Step;

require('./execExport.less');

class ExecExport extends Component {

  constructor( props ) {
    super( props );

    this.state = {
      nowStep: 0,
      exporting: false,
      exportDir: ''
    }
  }

  handleSelectDir() {
		if(window.ipcRenderer) {
			window.ipcRenderer.send('SELECT_DIRECT');
			window.ipcRenderer.on('SELECT_DIRECT_RESPONSE', (e, data)=>{
        if(data.dirname) {
          this.setState({
            nowStep: 1,
            exportDir: data.dirname,
            exporting: false
          });
        }
      });
    }
 	}

  transformData(data) {
    let newLayoutData = JSON.stringify(data);
		newLayoutData = newLayoutData.replace(/\\/g, "#DataVSlashFormat#");
    return newLayoutData;
  }

  handleExecExport() {
    if(this.state.exporting) return;
    if(window.ipcRenderer) {
			window.ipcRenderer.send('PAGE_EXPORT', {
        dir: this.state.exportDir,
        data: this.props.data && this.transformData(this.props.data)
      });
			window.ipcRenderer.on('PAGE_EXPORT_SUCCESS', ()=>{
          this.setState({
            nowStep: 2,
            exporting: false
          });
      });
    }

    this.setState({
      exporting: true
    });
  }

  render() {
    let { nowStep, exportDir, exporting } = this.state

    return <div className="execExport-select-container">
      <Steps direction="vertical" current={nowStep}>
      <Step title="选择页面导出目录" description={
        <div
          className="execExport-select-direction"
          onClick={this.handleSelectDir.bind(this)}
          >{
          exportDir?exportDir: '点击选择'
        }</div>
      } />
      <Step title="导出页面" description={
        nowStep==0?'':
          (<div
            className="execExport-exec-export"
            onClick={this.handleExecExport.bind(this)}
            >{nowStep==1?(exporting?'页面导出中':'开始导出页面'):'您选择的页面已导出'}</div>)

      } />
      <Step title="页面导出完成" description="" />
    </Steps>
  </div>
  }
}


module.exports = ExecExport;
