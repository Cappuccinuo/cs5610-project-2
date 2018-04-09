import React from 'react';
import { NavLink, Redirect, Link } from 'react-router-dom';
import api from '../api';
import Login from "./login";
import { connect } from 'react-redux';
import { Form, FormGroup, Input, Button } from 'reactstrap';
import { CookiesProvider } from 'react-cookie';

function Nav(props) {
  return <header className="header">
    <nav role="navigation">
      <ul className="nav nav-pills pull-right">
        <li>
          <CookiesProvider>
            <Login/>
          </CookiesProvider>
        </li>
      </ul>
    </nav>
  </header>;
}

function state2props(state) {
  return {
    token: state.token,
  };
}
export default connect(state2props)(Nav);
