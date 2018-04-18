import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import api from '../api';
import { Link } from 'react-router-dom';


class IndexComponent extends React.Component {
  constructor(props) {
    super(props);
    console.log("in index");
    this.state = {
      news: [],
    }; 

    api.get_open_price();
  }

  componentDidMount() {
    fetch('https://newsapi.org/v2/top-headlines?sources=crypto-coins-news&apiKey=3f5fd06a9f2649509496747b889aee2b')
    .then(results => {
      return results.json();
    }).then(data => {
      console.log("data is", data);
      let news = data.articles.map((n, index) => {
        if (index < 5) {
          return(
            <div key={index} className="news-body">
              <div id="landing-header">
                <h1 className="h3"><a href={n.url}>{n.title}</a></h1>
              </div>
              <div id="landing-message">
                <p>
                  {n.description}
                </p>
              </div>
            </div>
          )
        }
      })
      this.setState({news: news});
      console.log("state", this.state.news);
    })
  }

  render() {
    let btc_current_price = this.props.prices.BTC[this.props.prices.BTC.length-1];
    let eth_current_price = this.props.prices.ETH[this.props.prices.ETH.length-1];
    let ltc_current_price = this.props.prices.LTC[this.props.prices.LTC.length-1];
    let btc_open_price = this.props.prices.BTC_open;
    let eth_open_price = this.props.prices.ETH_open;
    let ltc_open_price = this.props.prices.LTC_open;
   
    return <div className="index">
      <div id="order-book" style={{display: "block"}}>
        <div>
          <dl className="stats-panel">
            <div className="stat">
              <div id="currency-pair">
                <h4><Link style={{color: "white"}} to="/coin/BTC">BTC/USD</Link></h4>
              </div>
            </div>
            <div className="stat">
              <dt>Current Price</dt>
              <dd>
                $
                {btc_current_price}
                <span className="btc-suffix"></span>
              </dd>
            </div>
            <div className="stat">
              <dt>Change Since Open</dt>
              <dd>
                {(btc_current_price - btc_open_price >= 0) ? "+" : "-"}
                $
                {Math.abs(Math.floor((btc_current_price - btc_open_price) * 100) / 100)}
                <span className="btc-suffix"></span>
              </dd>
            </div>
            <div className="stat" id="stat-24h-range">
              <dt>Open Price </dt>
              <dd>
                $
                <span>{btc_open_price}</span>
                <span className="btc-suffix"></span>
              </dd>
            </div>
          </dl>
        </div>

        <div>
          <dl className="stats-panel">
            <div className="stat">
              <div id="currency-pair">
                <h4><Link style={{color: "white"}} to="/coin/ETH">ETH/USD</Link></h4>
              </div>
            </div>
            <div className="stat">
              <dt>Current Price</dt>
              <dd>
                $
                {eth_current_price}
                <span className="btc-suffix"></span>
              </dd>
            </div>
            <div className="stat">
              <dt>Change Since Open</dt>
              <dd>
                {(eth_current_price - eth_open_price >= 0) ? "+" : "-"}
                $
                {Math.abs(Math.floor((eth_current_price - eth_open_price) * 100) / 100)}
                <span className="btc-suffix"></span>
              </dd>
            </div>
            <div className="stat" id="stat-24h-range">
              <dt>Open Price </dt>
              <dd>
                $
                <span>{eth_open_price}</span>
                <span className="btc-suffix"></span>
              </dd>
            </div>
          </dl>
        </div>


        <div>
          <dl className="stats-panel">
            <div className="stat">
              <div id="currency-pair">
                <h4><Link style={{color: "white"}} to="/coin/LTC">LTC/USD</Link></h4>
              </div>
            </div>
            <div className="stat">
              <dt>Current Price</dt>
              <dd>
                $
                {ltc_current_price}
                <span className="btc-suffix"></span>
              </dd>
            </div>
            <div className="stat">
              <dt>Change Since Open</dt>
              <dd>
                {(ltc_current_price - ltc_open_price >= 0) ? "+" : "-"}
                $
                {Math.abs(Math.floor((ltc_current_price - ltc_open_price) * 100) / 100)}
                <span className="btc-suffix"></span>
              </dd>
            </div>
            <div className="stat" id="stat-24h-range">
              <dt>Open Price </dt>
              <dd>
                $
                <span>{ltc_open_price}</span>
                <span className="btc-suffix"></span>
              </dd>
            </div>
          </dl>
        </div>

      </div>

      <div className="text offset-lg-1 col-lg-7 col-md-12">
        {this.state.news}
      </div>
    </div>
  }
}

const Index = withRouter(connect((state) => ({
  prices: state.prices,
}))(IndexComponent));

export default Index;
