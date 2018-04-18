import React from 'react';
import { withRouter } from 'react-router';
import ReactEcharts from 'echarts-for-react';
import { connect } from 'react-redux';
import api from '../api';

class PriceChartComponent extends React.Component {
  constructor(props) {
    super(props);
    this.change_chart_data = this.change_chart_data.bind(this);

    this.state = {
      onSelect: "real_time",
    }
  }

  change_chart_data(data_scope){
    console.log(data_scope);
    this.setState({
      onSelect: data_scope,
    });
    switch (data_scope) {
      case "real_time":
          break;
      case "one_day":
          api.get_historical_price("hour", "24");
          break;
      case "one_week":
          api.get_historical_price("day", "7");
          break;
      case "one_month":
          api.get_historical_price("day", "30");
          break;
      default:
          api.get_historical_price("hour", "24");
          break;
    }
  }

  render(){
    let eChart = (<ReactEcharts option={getOption(this.props.historical_prices, this.props.current_coin_type, this.state.onSelect)} />);
    if(this.state.onSelect == "real_time") {
      eChart = (<ReactEcharts option={getOption(this.props.prices, this.props.current_coin_type, this.state.onSelect)} />);
    }
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
        {eChart}
      </div>
    </div>
  );
 }
}


// set options for the chart
function getOption(data, coin_type, select){
  let time = data.time;
  if (select == "real_time") { // change the style of real time
    time = time.map(function (t) {
                return  t.replace(/T/g, "\n").replace(/Z/g, "");
           });
  }

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
    	data: time,
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
      min: 'dataMin',
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
