import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

class IndexComponent extends React.Component {
  constructor(props) {
    super(props);
    const channel = this.props.channel;
    channel.on("new:prices", resp => {
      props.dispatch({
        type: "UPDATE_PRICES",
        data: {
          base: resp.base,
          prices: resp.prices,
        }
      });
    });

    channel.join()
        .receive("ok", resp => {
          this.props.dispatch({
            type: "UPDATE_PRICES",
            data: {
              base: resp.base,
              prices: resp.prices,
            }
          });
        })
        .receive("error", () => {
          console.log("Unable to join.");
        });
  }

    
  render() {
    return <div className="index">
      <div id="order-book" style={{display: "block"}}>
        <div>
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

        <div>
          <dl className="stats-panel">
            <div className="stat">
              <div id="currency-pair">
                <h4>ETH/USD</h4>
              </div>
            </div>
            <div className="stat">
              <dt>Last Price</dt>
              <dd>
                $
                6845.01
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
                <h4>LTC/USD</h4>
              </div>
            </div>
            <div className="stat">
              <dt>Last Price</dt>
              <dd>
                $
                6845.01
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

      <div className="text offset-lg-1 col-lg-6 col-md-12">
        <div className="news-body">
          <div id="landing-header">
            <h1 className="h3">Golem Arrives: One of Ethereum's Most Ambitious Apps Is Finally Live</h1>
          </div>
          <div id="landing-message">
            <p>
              "This is typical for software development in general, and blockchain in particular,
              we underestimate the complexity of what we want to do," Julian Zawistowski,
              CEO and founder of Golem, told CoinDesk. "You always underestimate how difficult
              it is, and this was obviously the case with us."
            </p>
          </div>
        </div>
        <div className="news-body">
          <div id="landing-header">
            <h1 className="h3">What You Don't Know About Crypto Taxes Can Hurt You</h1>
          </div>
          <div id="landing-message">
            <p>
              The IRS allows residents to request an extension (for any reason) for up
              to six months, provided you pay your estimated taxes by April 17.
            </p>
          </div>
        </div>
        <div className="news-body">
          <div id="landing-header">
            <h1 className="h3">Rangebound: Bitcoin Bulls Need Break Above $7.5K</h1>
          </div>
          <div id="landing-message">
            <p>
              The cryptocurrency was solidly bid above $7,100 about 24 hours ago,
              reportedly due to speculation the Wall Street bigwigs (Soros and Rockefeller, for example)
              are set to enter the crypto markets. However, a long liquidation
              (unwinding of long bitcoin trades), as reported by WhaleCalls, looks to have pushed
              BTC to a low of $6,611 overnight.
            </p>
          </div>
        </div>
        <div className="news-body">
          <div id="landing-header">
            <h1 className="h3">Bank-Backed Hyperledger Is Slowly Opening to ICOs</h1>
          </div>
          <div id="landing-message">
            <p>
              The IRS allows residents to request an extension (for any reason) for up
              to six months, provided you pay your estimated taxes by April 17.
            </p>
          </div>
        </div>
      </div>
    </div>
  } 
}

const Index = withRouter(connect((state) => ({ 
  prices: state.prices, 
}))(IndexComponent));

export default Index;
