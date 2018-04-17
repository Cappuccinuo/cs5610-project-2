import React from 'react';
import { withRouter } from 'react-router';
import ReactEcharts from 'echarts-for-react';
import { connect } from 'react-redux';
import api from '../api';

class PriceChartComponent extends React.Component {
  constructor(props) {
    super(props);
    this.change_chart_data = this.change_chart_data.bind(this);

    api.get_chart_data_one_day();
  }

  change_chart_data(data_scope){
    switch (data_scope) {
      case "real_time":
          api.get_chart_data_real_time(this.props.prices);
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
          api.get_chart_data_one_day();
          break;
    }
  }

  render(){
   return(
    <div>
      <div className="chart-tabs" >
      <ul className="nav nav-tabs">
      <li className="active"><a data-toggle="tab" onClick={()=>this.change_chart_data("one_day")}>1 day</a></li>
      <li><a data-toggle="tab" onClick={()=>this.change_chart_data("one_week")}>1 week</a></li>
      <li><a data-toggle="tab" onClick={()=>this.change_chart_data("one_month")}>1 month</a></li>
      <li><a data-toggle="tab" onClick={()=>this.change_chart_data("real_time")}>real time</a></li>
      </ul>
    </div>
      <div>
      <ReactEcharts
        option={getOption(this.props.historical_prices, this.props.current_coin_type)} />
      </div>
    </div>
  );
 }
}


// set options for the chart
function getOption(data, coin_type){
  let prices = [];
  switch (coin_type) {
    case "BTC":
      prices = data.BTC
      break;
    case "ETH":
      prices = data.ETH
      break;
    case "LTC":
      prices = data.LTC
      break;
    default:
      prices = data.BTC
      break;
  }
  
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
    	data:[coin_type],
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
  	    start: 0,
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
	    name: coin_type,
	    type:'line',
	    data: prices
	   },
    ]
  };
  return option;
}

const PriceChart = withRouter(connect((state) => ({
  prices: state.prices,
  historical_prices: state.historical_prices,
  current_coin_type: state.current_coin_type,
}))(PriceChartComponent));

export default PriceChart;
