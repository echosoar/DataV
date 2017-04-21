'use script';
import * as React from 'react';
class DataVBaseModuleImage extends React.Component {
  constructor( props ) {
    super( props );
  }

  handleClick() {
    alert("click")
  }

  renderImage( width, height, src ) {
    if( width.value =='auto' || height.value == 'auto') {
      return <img src={src.value} width={width.value} height={height.value} />
    } else {
      return <div style={{
        width: width.value,
        height: height.value,
        background: 'url("' + src.value + '") center center / contain no-repeat'
      }}></div>
    }
  }

  render() {
    let { width, height, href, src, target } = this.props;
    if(!src.value) {
      return <div style={{
        padding: '10px 0',
        height: '60px',
        'line-height': '20px',
        'text-align': 'center'

        }}>
        DataV 基本图片组件<br />
        请点击右上角按钮配置图片属性
      </div>
    }
    if(href.value) {
      return <a href={href.value} target={target.value}>
      { this.renderImage.call( this, width, height, src) }
      </a>
    }
    return this.renderImage.call( this, width, height, src);
  }
}

if(!window.datavModule) window.datavModule = {};
window.datavModule.datavBaseModuleImage278920E14B69B02754BB95EA8B4293D6 = DataVBaseModuleImage;
