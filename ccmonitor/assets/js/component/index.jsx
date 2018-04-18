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

        <div>
          <dl className="stats-panel">
            <div className="stat">
              <div id="currency-pair">
                <h4><Link style={{color: "white"}} to="/coin/ETH">ETH/USD</Link></h4>
              </div>
            </div>
            <div className="stat">
              <dt>Last Price</dt>
              <dd>
                $
                {this.props.prices.ETH[this.props.prices.ETH.length-1]}
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
        <div>
          <dl className="stats-panel">
            <div className="stat">
              <div id="currency-pair">
                <h4><Link style={{color: "white"}} to="/coin/LTC">LTC/USD</Link></h4>
              </div>
            </div>
            <div className="stat">
              <dt>Last Price</dt>
              <dd>
                $
                {this.props.prices.LTC[this.props.prices.LTC.length-1]}
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
