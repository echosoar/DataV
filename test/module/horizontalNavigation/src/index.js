'use script';
import * as React from 'react';
let mockData = {
  index: 'noDataVBaseHorizontalNavigationData',
  data: [
    {
      text: 'No Nav Data',
      value: 'noDataVBaseHorizontalNavigationData'
    },
    {
      text: '没有导航数据',
      value: 'noDataVBaseHorizontalNavigationDataCn'
    }
  ]
}
class DataVBaseHorizontalNavigation extends React.Component {
  constructor( props ) {
    super( props );
  }

  checkIndex(itemData, siteDisplay) {
    let index = itemData.index;
    let isHaveIndex = false;
    itemData.data && itemData.data.map(item=>{
      if(!item.type || item.type == 'display') {
        if(siteDisplay[item.value]!=false && !isHaveIndex) {
          index = item.value;
          isHaveIndex = true;
        }
      }
    });
    return index;
  }

  handleClick(nowItem, itemData) {
    if(!itemData.data) return;

    if(nowItem.type && nowItem.type='link') {
      location.href = nowItem.value;
      return;
    }

    let newData = itemData.data.map(item=>{
        return {
          name: item.value,
          value: item.value == nowItem.value
        }
    });

    this.props.siteDisplayChange(newData);
  }

  render() {
    let { width, height, background, textColor, itemBackground, itemTextColor, data, siteDisplay } = this.props,
        itemData = mockData,
        isHaveIndex = false;

    try {
      itemData = JSON.parse(data.value);
    }catch(e){}

    let indexValue = this.checkIndex(itemData, siteDisplay);

    return <div
      style={{
        width: width.value,
        height: height.value,
        background: background.value,
        color: textColor.value
      }}
      >
      {
        itemData.data && itemData.data.map(item=>{
          let nowItemIsIndex = false;
          if(indexValue == item.value && !isHaveIndex) {
            nowItemIsIndex = true;
            isHaveIndex = true;
          }
          return <div
          style={{
            'display': 'inline-block',
            'height': height.value,
            'color': nowItemIsIndex? itemTextColor.value: textColor.value,
            'background': nowItemIsIndex? itemBackground.value: 'transparent',
            'cursor': nowItemIsIndex? 'default': 'pointer',
            'padding': '0 10px',
            'line-height': height.value
          }}
          onClick={nowItemIsIndex? (()=>{}): this.handleClick.bind(this, item, itemData)}
          >
          {
            item.text
          }
          </div>
        })
      }
    </div>
  }
}

if(!window.datavModule) window.datavModule = {};
window.datavModule.datavBaseModuleDataVBaseHorizontalNavigation4b3e68e53841939db2ccb37fe611a70b = DataVBaseHorizontalNavigation;
