import React from 'react';
import ReactEcharts from 'echarts-for-react'; 


export default function CurrentPriceChart(props) {

  var time = ["2018-4-11/14:52:22", "2018-4-11/14:52:23", "2018-4-11/14:52:24", "2018-4-11/14:52:25",
            "2018-4-11/14:52:26", "2018-4-11/14:52:27", "2018-4-11/14:52:28",]
  time = time.map(function (str) {
    return str.replace('/', '\n'); // add \n between date and specific time, in case the string is 
  });                              // too long to show in x-axis

  var current_price_chart_data = { // just for testing, need to get data from props
    price_btc: [200, 250, 200, 300, 280, 300, 350],
    price_eth: [100, 200, 250, 200, 300, 280, 300],
    price_ltc: [50, 100, 200, 250, 200, 300, 280],
    time: time,
  };

  return(
    <ReactEcharts
      option={getOption(current_price_chart_data)} />);
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
        name: '   current price($)',
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

