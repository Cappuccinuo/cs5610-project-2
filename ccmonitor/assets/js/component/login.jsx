import React from 'react';
import { Form, FormGroup, Input, Button } from 'reactstrap';
import { connect } from 'react-redux';
import api from '../api';
import { NavLink, Redirect, Link } from 'react-router-dom';
import { withCookies, Cookies } from 'react-cookie';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      switch: 0
    }
    this.update = this.update.bind(this);
    this.update_signup = this.update_signup.bind(this);
    this.sign_up = this.sign_up.bind(this);
    this.create_token = this.create_token.bind(this);
    this.delete_token = this.delete_token.bind(this);
    this.change_status = this.change_status.bind(this);
  }

  componentDidUpdate(prevProps) {
    if(prevProps.token !== this.props.token) {
      if(this.props.token) {
        this.props.cookies.set("token", this.props.token);
      }
      else {
        this.props.cookies.remove("token");
      }
    }
  }

  update(ev) {
    let tgt = $(ev.target);
    let data = {};
    data[tgt.attr('name')] = tgt.val();
    this.props.dispatch({
      type: 'UPDATE_LOGIN_FORM',
      data: data,
    });
  }

  update_signup(ev) {
    let tgt = $(ev.target);
    let data = {};
    data[tgt.attr('name')] = tgt.val();
    let action = {
      type: 'UPDATE_SIGNUP_FORM',
      data: data,
    };
    this.props.dispatch(action);
  }

  sign_up(ev) {
    api.submit_user(this.props.signup);
    this.props.dispatch({
      type: 'CLEAR_SIGNUP_FORM',
    });
  }

  create_token(ev) {
    api.submit_login(this.props.login);
    this.props.dispatch({
      type: "CLEAR_LOGIN_FORM",
    });
  }

  delete_token(ev) {
    this.props.dispatch({
      type: "DELETE_TOKEN",
    });
    swal({
      title: "Log out Success!",
      text: "Please wait for me to refresh, and Have a good one!",
      icon: "success",
    });
    this.setState({redirect: true});
    this.props.cookies.remove("token");
    setTimeout(function(){
        location.reload();
        location.reload();
    }, 2500);
  }

  get_current_user_name(users, user_id) {
    let user = "";
    _.map(users, (uu) => {
      if (uu.id == user_id) {
        user = uu;
      }
    })
    return user.name;
  }

  change_status(ev) {
    let flag = 1 - this.state.switch;
    console.log(this.state.switch);
    this.setState({switch: flag});
  }

  render() {
    const { from } = '/';
    const { redirect } = this.state;
    if (this.props.token) {
      let user_name = this.get_current_user_name(this.props.users, this.props.token.user_id);

      return <ul className="nav navbar-nav navbar-right">
        <div className="navbar-text">
          Welcome { user_name } <button className="btn btn-dark" onClick={this.delete_token}><b>Log out</b></button>
        </div>
      </ul>;
    }
    else {
      if (this.state.switch == 0) {
        return <div className="container-fluid">
          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav navbar-right">
              <li><p class="navbar-text">Already have an account?</p></li>
              <li className="dropdown">
                <a href="#" className="dropdown-toggle" data-toggle="dropdown"><b>Login</b><span class="caret"></span></a>
                  <ul id="login-dp" className="dropdown-menu">
                  <li>
                     <div className="row">
                        <div className="col-md-12">
                          Login via
                          <div class="social-buttons">
                            <a href="#" class="btn btn-fb"><i class="fa fa-facebook"></i> Facebook</a>
                            <a href="#" class="btn btn-tw"><i class="fa fa-twitter"></i> Twitter</a>
                          </div>
                                          or
                           <form className="form" role="form" method="post" action="login" id="login-nav">
                              <div className="form-group">
                                 <label className="sr-only">Email address</label>
                                 <Input type="text" name="email" placeholder="email"
                                        value={this.props.login.email} onChange={this.update} />
                              </div>
                              <div className="form-group">
                                 <label className="sr-only">Password</label>
                                 <Input type="password" name="password" placeholder="password"
                                        value={this.props.login.password} onChange={this.update} />
                              </div>
                              <div className="form-group">
                                 <Button className="btn btn-primary btn-block" onClick={this.create_token}>Sign in</Button>
                              </div>
                           </form>
                        </div>
                        <div className="bottom text-center">
                          New here ? <button className="unstyled-button" onClick={this.change_status}><b>Sign up</b></button>
                        </div>
                     </div>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          {redirect && (
            <Redirect to={from || '/'}/>
          )}
        </div>;
      }
      else {
        return <div className="container-fluid">
          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav navbar-right">
              <li><p class="navbar-text">Already have an account?</p></li>
              <li className="dropdown">
                <a href="#" className="dropdown-toggle" data-toggle="dropdown"><b>Login</b><span class="caret"></span></a>
                  <ul id="login-dp" className="dropdown-menu">
                  <li>
                     <div className="row">
                        <div className="col-md-12">
                           <form className="form" role="form" method="post" action="login" id="login-nav">
                             <div className="form-group">
                                <label className="sr-only">Email address</label>
                                <Input type="text" name="name" placeholder="name"
                                       value={this.props.signup.name} onChange={this.update_signup} />
                             </div>
                              <div className="form-group">
                                 <label className="sr-only">Email address</label>
                                 <Input type="text" name="email" placeholder="email"
                                        value={this.props.signup.email} onChange={this.update_signup} />
                              </div>
                              <div className="form-group">
                                 <label className="sr-only">Password</label>
                                 <Input type="password" name="password" placeholder="password"
                                        value={this.props.signup.password} onChange={this.update_signup} />
                              </div>
                              <div className="form-group">
                                 <Button className="btn btn-primary btn-block" onClick={this.sign_up}>Sign up</Button>
                              </div>
                           </form>
                        </div>
                        <div className="bottom text-center">
                          Have an account ? <button className="unstyled-button" onClick={this.change_status}><b>Sign in</b></button>
                        </div>
                     </div>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          {redirect && (
            <Redirect to={from || '/'}/>
          )}
        </div>;
      }
    }
  }
}

function state2props(state) {
  return {
    login: state.login,
    token: state.token,
    users: state.users,
    signup: state.signup,
  };
}

export default connect(state2props)(withCookies(Login));
