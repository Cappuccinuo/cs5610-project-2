import React                                                    from 'react';
import ReactDOM                                                 from 'react-dom';
import { Route, BrowserRouter as Router, Switch, Redirect }     from 'react-router-dom';
import { Provider, connect }                                    from 'react-redux';
import { CookiesProvider, withCookies, Cookies, cookie }        from 'react-cookie';
import socket                                                   from './socket.js';
import Nav                                                      from './component/nav'
import Index                                                    from './component/index'
import CoinPage                                                 from "./component/coinpage.jsx";
import AlertForm                                                from "./component/alertform";
import Notification                                             from "./component/notification_center"
import swal                                                     from 'sweetalert';

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

    console.log(window.user_id);

    this.state = {
      isLoggedIn: false,
    }

    channel.on("new:prices", resp => {
      this.props.state.dispatch({
        type: "UPDATE_PRICES",
        data: resp,
      });
    });

    channel.join()
        .receive("ok", resp => {
          this.props.state.dispatch({
            type: "UPDATE_PRICES",
            data: resp,
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
    if(window.user_id) {
      token = {
        token: window.token,
        user_id: parseInt(window.user_id),
      }
      window.token = null;
      window.user_id = null;
      this.props.cookies.remove("token");
      this.props.cookies.set("token", token);
      this.props.state.dispatch({
        type: "SET_TOKEN",
        token: token,
      });
    }
    console.log("token is" + token);
    if (token) {
      this.setState({isLoggedIn: true});
    }
    else {
      this.setState({isLoggedIn: false});
    }
  }

  render() {
    console.log("props", this.props);
    console.log("current log in " + this.state.isLoggedIn);
    console.log("hhhhh" + this.props.state.token);
    if (this.state.isLoggedIn || this.props.state.token) {
      return <Router path="/">
        <div>
          <Nav/>
          <Switch>
            <Route path="/coin/:type" render={() => (<CoinPage channel={this.props.channel}/>)}/>
            <Route path="/alerts" />
            <Route path="/alertform/:alert_id" />
            <Route path="/alertform" render={() => (<AlertForm channel={this.props.channel}/>)}/>
            <Route path="/notifications" render={() => (<Notification channel={this.props.channel}/>)} />
            <Route path="/" render={() => (<Index channel={this.props.channel}/>)} />
          </Switch>
        </div>
      </Router>
    }
    else {
      return <Router path="/">
        <div>
          <Nav/>
          <Switch>
            <Route path="/coin/:type" render={() => (<Redirect to="/"></Redirect>)}/>
            <Route path="/alerts" render={() => (<Redirect to="/"></Redirect>)}/>
            <Route path="/alertform/:alert_id" render={() => (<Redirect to="/"></Redirect>)}/>
            <Route path="/alertform" render={() => (<Redirect to="/"></Redirect>)}/>
            <Route path="/notifications" render={() => (<Redirect to="/"></Redirect>)} />
            <Route path="/" render={() => (<Index channel={this.props.channel}/>)}/>
          </Switch>
        </div>
      </Router>
    }
  }
};

let App = withCookies(connect((state) => state)
                             ((props) => (
                                          <CcMonitor
                                            state={props}
                                            cookies={props.cookies}
                                            channel={props.channel}
                                          />)));
