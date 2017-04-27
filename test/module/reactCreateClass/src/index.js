'use script';
import * as React from 'react';
class DataVBaseModuleImage extends React.Component {
  constructor( props ) {
    super( props );
    console.log("module", props)
  }

  handleClick() {
    alert("click")
  }

  renderImage( width, height, src, borderRadius ) {
    if( width.value =='auto' || height.value == 'auto') {
      return <img
        src={src.value}
        width={width.value}
        height={height.value}
        style={{
          'border-radius': borderRadius.value
        }}
      />
    } else {
      return <div style={{
        width: width.value,
        height: height.value,
        background: 'url("' + src.value + '") center center / cover no-repeat',
        'border-radius': borderRadius.value,
        'overflow': 'hidden'
      }}></div>
    }
  }

  render() {
    let { width, height, href, src, target, borderRadius } = this.props;
    if(!borderRadius || borderRadius.value=='auto') borderRadius.value = '0px';
    if(!src.value) {
      return <div style={{
        padding: '10px 0',
        height: '60px',
        'line-height': '20px',
        'text-align': 'center'
        }}
        >
        DataV 基本图片组件<br />
        请点击右上角按钮配置图片属性
      </div>
    }
    if(href.value) {
      return <a href={href.value} target={target.value}>
      { this.renderImage.call( this, width, height, src, borderRadius) }
      </a>
    }
    return this.renderImage.call( this, width, height, src, borderRadius);
  }
}

if(!window.datavModule) window.datavModule = {};
window.datavModule.datavBaseModuleImage278920E14B69B02754BB95EA8B4293D6 = DataVBaseModuleImage;
