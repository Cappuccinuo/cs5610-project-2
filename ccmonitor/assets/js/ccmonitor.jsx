import React                                                    from 'react';
import ReactDOM                                                 from 'react-dom';
import { Route, BrowserRouter as Router, Switch }               from 'react-router-dom';
import { Provider, connect }                                    from 'react-redux';
import { CookiesProvider, withCookies, Cookies, cookie }        from 'react-cookie';
import socket                                                   from './socket.js';
import Nav                                                      from './component/nav'
import Index                                                    from './component/index'
import CoinPage                                                 from "./component/coinpage.jsx";
import AlertForm                                                from "./component/alertform.jsx";
import NotificationCenter                                       from "./component/notification_center"


export default function ccmonitor_init(store, channel) {

  ReactDOM.render(
    <Provider store={store}>
      <CookiesProvider>
        <App state={store.getState()} channel={channel} />
      </CookiesProvider>
    </Provider>,
    document.getElementById('root')
  );
}

class CcMonitor extends React.Component {
  constructor(props) {
    super(props);

    const channel = props.channel;

    channel.on("new:prices", resp => {
      this.props.state.dispatch({
        type: "UPDATE_PRICES",
        data: {
          base: resp.base,
          prices: resp.prices,
        }
      });
    });

    channel.join()
        .receive("ok", resp => {
          this.props.state.dispatch({
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

  componentWillMount() {
    console.log(this.props);
    let token = this.props.cookies.get('token');
    this.props.state.dispatch({
      type: "SET_TOKEN",
      token: token
    });

  }

  render() {
    return <Router path="/">
      <div>
        <Nav/>
        <Switch>
          <Route path="/coin/:type" render={() => (<CoinPage channel={this.props.channel}/>)}/>
          <Route path="/alerts" />
          <Route path="/alertform/:alert_id" />
          <Route path="/alertform" render={() => (<AlertForm />)}/>
          <Route path="/notifications" render={() => (<NotificationCenter />)} />
          <Route path="/" render={() => (<Index channel={this.props.channel}/>)} />
        </Switch>
      </div>
    </Router>
  }
};

let App = withCookies(connect((state) => state)
                             ((props) => (
                                          <CcMonitor
                                            state={props}
                                            cookies={props.cookies}
                                            channel={props.channel}
                                          />)));
