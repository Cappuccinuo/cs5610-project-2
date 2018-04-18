import React from 'react';
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router';
import { Form, FormGroup, NavItem, Input, Button, Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle } from 'reactstrap';
import { connect } from 'react-redux';
import { CookiesProvider } from 'react-cookie';
import api from '../api';
import PriceChart from './price_chart'; // import chart component

class CoinComponent extends React.Component {

  render() {
    const type = this.props.match.params.type;

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
                <dt>Last Price</dt>
                <dd>
                  $
                  {this.props.prices[type][this.props.prices[type].length-1]}
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
          					<tr className="row100 body">
          						<td className="cell100 column1"></td>
                      <td className="cell100 column2"></td>
          						<td className="cell100 column3"></td>
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
