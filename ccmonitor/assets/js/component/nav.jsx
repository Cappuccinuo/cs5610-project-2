import React from 'react';
import { NavLink, Redirect, Link } from 'react-router-dom';
import api from '../api';
import Login from "./login";
import { connect } from 'react-redux';
import { Form, FormGroup, Input, Button } from 'reactstrap';
import { CookiesProvider } from 'react-cookie';

function Nav(props) {
  return <header className="header">

    <nav className="navbar navbar-default navbar-inverse" role="navigation">
      <div className="container-fluid">

        <div className="navbar-header">
          <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <Link className="navbar-brand" to="/">Ccmonitor</Link>
        </div>

        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul className="nav navbar-nav navbar-right">
            <li className="dropdown">
              <a href="#" className="dropdown-toggle" data-toggle="dropdown">Coins <span className="caret"></span></a>
              <ul className="dropdown-menu" role="menu">
                <li><Link to="/coin/BTC" onClick={()=>api.update_current_coin_type("BTC")}>BTC</Link></li>
                <li><NavLink to="/coin/ETH" onClick={()=>api.update_current_coin_type("ETH")}>ETH</NavLink></li>
                <li><NavLink to="/coin/LTC" onClick={()=>api.update_current_coin_type("LTC")}>LTC</NavLink></li>
                <li className="divider"></li>
                <li><NavLink to="/alertform">Subscribe</NavLink></li>
              </ul>
            </li>
            <li><NavLink to="/notifications"><i className="fa fa-bell"></i></NavLink></li>
            <li>
              <CookiesProvider>
                <Login />
              </CookiesProvider>
            </li>
          </ul>
        </div>
      </div>
    </nav>

  </header>;
}

function state2props(state) {
  return {
    token: state.token,
  };
}
export default connect(state2props)(Nav);
