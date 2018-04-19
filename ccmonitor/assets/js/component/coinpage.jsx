import React from 'react';
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router';
import { Form, FormGroup, NavItem, Input, Button, Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle } from 'reactstrap';
import { connect } from 'react-redux';
import { CookiesProvider } from 'react-cookie';
import api from '../api';
import PriceChart from './price_chart'; // import chart component

class CoinComponent extends React.Component {
  constructor(props) {
    super(props);
    api.get_prices_for_table(); 
  }

  render() {
    const type = this.props.match.params.type;
    let current_price = 0;
    let open_price = 0;
    let prices = [];

    if (type == "BTC") {
      current_price = this.props.prices.BTC[this.props.prices.BTC.length-1];
      open_price = this.props.prices.BTC_open;
      prices = this.props.prices_for_table.BTC;
    }
    else if (type == "ETH") {
      current_price = this.props.prices.ETH[this.props.prices.ETH.length-1];
      open_price = this.props.prices.ETH_open;
      prices = this.props.prices_for_table.ETH;
    }
    if (type == "LTC") {
      current_price = this.props.prices.LTC[this.props.prices.LTC.length-1];
      open_price = this.props.prices.LTC_open;
      prices = this.props.prices_for_table.LTC;
    }

    let index = 0;
    let price_list = prices.map(function(p){
      return <tr key={index++} className="row100 body">
      	<td className="cell100 column1">{convertTime(p.time,"day")}</td>
      	<td className="cell100 column2">{p.open}</td>
      	<td className="cell100 column3">{p.close}</td>
      </tr>;
    })

    return (
      <div>
        <div className="panel-chart">
          <div className="coinpage-panel">
            <dl className="stats-panel">
              <div className="stat">
                <div id="currency-pair">
                  <h4>{type}/USD</h4>
                </div>
              </div>
              <div className="stat">
                <dt>Current Price</dt>
                <dd>
                  $
                  {current_price}
                  <span className="btc-suffix"></span>
                </dd>
              </div>
              <div className="stat" id="stat-24h-range">
                <dt>Open Price</dt>
                <dd>
                  $
                  <span>{open_price}</span>
                  <span className="btc-suffix"></span>
                </dd>
              </div>
              <div className="stat">
                <dt>Change Since Open</dt>
                <dd>
                 {(current_price - open_price >= 0) ? "+" : "-"}
                 $
                 {Math.abs(Math.floor((current_price - open_price) * 100) / 100)}
                 <span className="btc-suffix"></span>
                </dd>
              </div>
            </dl>
          </div>

          <div className="chart-on-coinpage">
  	         <PriceChart chart-data ={this.props} />
          </div>
        </div>

        <div className="history container-login100">
          <div className="table100 ver3 m-b-110">
            <div className="table100-head">
              <table>
                <thead>
        	  <tr className="row100 head">
		    <th className="cell100 column1">Date</th>
		    <th className="cell100 column2">Open</th>
		    <th className="cell100 column3">Close</th>
        	  </tr>
        	</thead>
              </table>
            </div>

	    <div className="table100-body">
	      <table>
	        <tbody>
                 {price_list}
		</tbody>
	      </table>
	    </div>
          </div>

        </div>
      </div>
    );
  }
}

// convert unix timestamp into normal time
function convertTime(unixtime, scope) {
  let u = new Date(unixtime*1000);
  let date = u.toLocaleDateString();
  let time = u.toLocaleTimeString();
  if (scope == "day") {
    return date;
  }
  else if (scope == "hour") {
    return date + "\n" + time;
  }
};

const CoinPage = withRouter(connect((state) => ({
  prices: state.prices,
  prices_for_table: state.prices_for_table,
}))(CoinComponent));

export default CoinPage;
