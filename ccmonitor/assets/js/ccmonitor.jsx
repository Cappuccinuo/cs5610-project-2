import React                                                    from 'react';
import ReactDOM                                                 from 'react-dom';
import { BrowserRouter as Router, Route, Redirect, Switch }     from 'react-router-dom';
import { Provider, connect }                                    from 'react-redux';
import { CookiesProvider, withCookies, Cookies, cookie }        from 'react-cookie';
import Nav                                                      from './component/nav'

export default function ccmonitor_init(store) {
  ReactDOM.render(
    <Provider store={store}>
      <CookiesProvider>
        <Ccmonitor state={store.getState()} />
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
    return <Router>
      <div>
        <Nav/>
      </div>
    </Router>
  }
};

let Ccmonitor = withCookies(connect((state) => state)(CcMonitor));
