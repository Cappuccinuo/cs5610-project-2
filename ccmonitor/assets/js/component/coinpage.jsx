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
        <div className="chart-on-index">
	         <CurrentPriceChart chart-data ={this.props} />
        </div>
        <ul>
          {prices}
        </ul>
      </div>
    );
  }
}

const CoinPage = withRouter(connect((state) => ({
  prices: state.prices,
}))(CoinComponent));

export default CoinPage;
