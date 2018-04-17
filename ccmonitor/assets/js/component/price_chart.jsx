import React from 'react';
import { withRouter } from 'react-router';
import ReactEcharts from 'echarts-for-react';
import { connect } from 'react-redux';
import api from '../api';

class PriceChartComponent extends React.Component {
  constructor(props) {
    super(props);
    this.change_chart_data = this.change_chart_data.bind(this);
    api.get_chart_data_real_time();
  }

  change_chart_data(data_scope){
    switch (data_scope) {
      case "real_time":
          api.get_chart_data_real_time();
          break;
      case "one_day":
          api.get_chart_data_one_day();
          break;
      case "one_week":
          api.get_chart_data_one_week();
          break;
      case "one_month":
          api.get_chart_data_one_month();
          break;
      default:
          api.get_chart_data_real_time();
          break;
    }
  }

  render(){
   return(
    <div>
      <div className="chart-tabs" >
      <ul className="nav nav-tabs">
      <li className="active"><a data-toggle="tab" onClick={()=>this.change_chart_data("real_time")}>real time</a></li>
      <li><a data-toggle="tab" onClick={()=>this.change_chart_data("one_day")}>1 day</a></li>
      <li><a data-toggle="tab" onClick={()=>this.change_chart_data("one_week")}>1 week</a></li>
      <li><a data-toggle="tab" onClick={()=>this.change_chart_data("one_month")}>1 month</a></li>
      </ul>
    </div>
      <div>
      <ReactEcharts
        option={getOption(this.props.chart_data)} />
      </div>
    </div>
  );
 }
}


// set options for the chart
function getOption(data){
  var option = {
    title: {
    	x: 'center',
    	align: 'right'
    },
    toolbox: {
    	feature: {
    	    dataZoom: {
    	        yAxisIndex: 'none'
    	    },
    	    magicType: {type: ['line', 'bar']},
    	    dataView: {readOnly: false},
    	    restore: {},
    	    saveAsImage: {}
    	},
    },
    tooltip: {
    	trigger: 'axis',
    	axisPointer: {
    	    type: 'cross',
    	    animation: false,
    	    label: {
    	        backgroundColor: '#505765'
    	    }
    	}
    },
    legend: {
    	data:['BTC','ETH','LTC'],
      x: 'left',
      textStyle:{color:"white"},
    },
    grid: {
    	left: '3%',
    	right: '4%',
    	bottom: 35,
    	containLabel: true
    },
    dataZoom: [
  	{
  	    show: true,
  	    realtime: true,
  	    start: 50,
  	    end: 100
  	},
  	{
  	    type: 'inside',
  	    realtime: true,
  	    start: 65,
  	    end: 85
  	}
    ],
    xAxis: {
    	type: 'category',
    	boundaryGap: false,
    	data: data.time,
    	axisLine:{
    	  lineStyle:{
                color:'white',
    	    width:1
    	  }
      },
    },
    yAxis: {
    	type: 'value',
      name: 'price ($)',
    	axisLine:{
    	  lineStyle:{
          color:'white',
    	    width:1
    	  }
      },
    },
    series: [
	   {
	    name:'BTC',
	    type:'line',
	    data: data.price_btc
	   },
	   {
	    name:'ETH',
	    type:'line',
	    data: data.price_eth
	   },
	   {
	    name:'LTC',
	    type:'line',
	    data: data.price_ltc
	   }
    ]
  };
  return option;
}

const PriceChart = withRouter(connect((state) => ({
  chart_data: state.chart_data,
}))(PriceChartComponent));

export default PriceChart;
