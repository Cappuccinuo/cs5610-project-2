import React                                                    from 'react';
import ReactDOM                                                 from 'react-dom';
import { BrowserRouter as Router, Route, Redirect, Switch }     from 'react-router-dom';
import { Provider, connect }                                    from 'react-redux';
import { CookiesProvider, withCookies, Cookies, cookie }        from 'react-cookies';

export default function ccmonitor_init(store) {
  ReactDOM.render(
    <CcMonitor />,
    document.getElementById('root')
  );
}

class CcMonitor extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    return <div>
      Test
    </div>
  }
};
