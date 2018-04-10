import React                                                    from 'react';
import ReactDOM                                                 from 'react-dom';
import { Route, BrowserRouter as Router, Switch }     from 'react-router-dom';
import { Provider, connect }                                    from 'react-redux';
import { CookiesProvider, withCookies, Cookies, cookie }        from 'react-cookie';
import Nav                                                      from './component/nav'
import CoinPage from "./component/coinpage.jsx";

export default function ccmonitor_init(store) {
  ReactDOM.render(
    <Provider store={store}>
      <CookiesProvider>
        <App state={store.getState()} />
      </CookiesProvider>
    </Provider>,
    document.getElementById('root')
  );
}

class CcMonitor extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    console.log(this.props);
    let token = this.props.cookies.get('token');
    this.props.dispatch({
      type: "SET_TOKEN",
      token: token
    });
  }

  render() {
    return <Router path="/">
      <div>
        <Nav/>
        <Switch>
          <Route path="/coin/:type" render={() => (<CoinPage/>)}/>
        </Switch>
      </div>
    </Router>
  }
};

let App = withCookies(connect((state) => state)(CcMonitor));
