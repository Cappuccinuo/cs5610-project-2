import React from 'react';
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router';
import { Form, FormGroup, NavItem, Input, Button, Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle } from 'reactstrap';
import { connect } from 'react-redux';
import { CookiesProvider } from 'react-cookie';
import api from '../api';
import CurrentPriceChart from './current_price_chart'; // import chart component

class CoinComponent extends React.Component {
  constructor(props) {
    super(props);
    const channel = this.props.channel;
    this.state = Object.assign({ triggered: false }, this.props.prices);
    api.get_price({type: 'BTC'});
    console.log("in coinpage1:");
    console.log( this.props);
    console.log(this.state);

  }

  componentWillUpdate(nextProps, nextState){
    const btcPrices = nextProps.prices.BTC;
    if(btcPrices.length != this.state.BTC.length) {
      this.setState({
        BTC: btcPrices,
        triggered: !this.state.triggered,
      });
    } else {
      for(var i = 0; i < this.state.BTC.length; i++) {
        if(btcPrices[i] != this.state.BTC[i]) {
          this.setState({
            BTC: btcPrices,
            triggered: !this.state.triggered,
          });
          console.log("updated");
          break;
        }
      }
    }
    //const data = {type: this.props.match.params.type};
    //api.get_price(data);
  }

  render() {
    const type = this.props.match.params.type;

    let i = 0;
    const prices = this.state.BTC.map((price) => (<li key={i++}>{price}</li>));

    return (
      <div>
        <div className="panel-chart">
          <div className="coinpage-panel">
            <dl className="stats-panel">
              <div className="stat">
                <div id="currency-pair">
                  <h4>BTC/USD</h4>
                </div>
              </div>
              <div className="stat">
                <dt>Last Price</dt>
                <dd>
                  $
                  {this.props.prices.BTC[this.props.prices.BTC.length-1]}
                  <span className="btc-suffix"></span>
                </dd>
              </div>
              <div className="stat">
                <dt>24-hour Change</dt>
                <dd>
                  +
                  $
                  76.53
                  <span className="btc-suffix"></span>
                </dd>
              </div>
              <div className="stat" id="stat-24h-range">
                <dt>24-hour Range</dt>
                <dd>
                  $
                  6651.12
                  <span className="btc-suffix"></span>
                  -
                  $
                  6876.33
                  <span className="btc-suffix"></span>
                </dd>
              </div>
            </dl>
          </div>

          <div className="chart-on-coinpage">
  	         <CurrentPriceChart chart-data ={this.props} />
          </div>
        </div>

        <div class="history container-login100">
          <div class="table100 ver3 m-b-110">
        		<div class="table100-head">
        			<table>
        				<thead>
        					<tr class="row100 head">
        						<th class="cell100 column1">Date</th>
        						<th class="cell100 column2">Open</th>
        						<th class="cell100 column3">Close</th>
        					</tr>
        				</thead>
        			</table>
        		</div>

        		<div class="table100-body">
        			<table>
        				<tbody>
          					<tr class="row100 body">
          						<td class="cell100 column1"></td>
                      <td class="cell100 column2"></td>
          						<td class="cell100 column3"></td>
          					</tr>
        				</tbody>
        			</table>
        		</div>
        	</div>
        </div>
      </div>
    );
  }
}

const CoinPage = withRouter(connect((state) => ({
  prices: state.prices,
}))(CoinComponent));

export default CoinPage;
