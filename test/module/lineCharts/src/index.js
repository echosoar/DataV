'use script';
import * as React from 'react';
import { LineChart } from 'rd3';

let defaultData =  [
    {
      name: "series1",
      values: [ { x: 0, y: 20 },  { x: 24, y: 10 } ],
      strokeWidth: 3,
      strokeDashArray: "5,5",
    },
    {
      name: "series2",
      values: [ { x: 0, y: 28 }, { x: 16, y: 2 } ]
    }
  ];

class D3BaseLineChart extends React.Component {
  constructor( props ) {
    super( props );

    this.state = {
      data: this.formatJson(this.props.data) || []
    }

    if(this.props.dataApi) {
      this.fetchData.call(this, this.props.dataApi);
    }
  }

  formatJson(data) {
    try{
      return JSON.parse(data.value);
    }catch(e){
      return false;
    }
  }

  fetchData() {

  }

  render() {
    let { title, width, height, startX, startY, drawWidth, drawHeight, xAxisLabel, yAxisLabel } = this.props;
    let lineData = this.state.data;

    return <LineChart
      legend={false}
      data={lineData}
      width={ width.value }
      height={ height.value }
      viewBoxObject={{
        x: startX.value,
        y: startY.value,
        width: drawWidth.value,
        height: drawHeight.value
      }}
      title={title.value}
      yAxisLabel={ yAxisLabel.value }
      xAxisLabel={ xAxisLabel.value }
      gridHorizontal={true}
    />
  }
}

if(!window.datavModule) window.datavModule = {};
window.datavModule.datavBaseModuleD3BaseLineChart4593a3162ed373bb5c0bdd57518ee077 = D3BaseLineChart;
