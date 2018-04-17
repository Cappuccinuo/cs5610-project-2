import React from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import { withRouter } from 'react-router';
import { Form, FormGroup, NavItem, Label, Input, Button, Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle } from 'reactstrap';
import { connect } from 'react-redux';
import { CookiesProvider } from 'react-cookie';
import api from '../api';
import Login from './login.jsx';
import PriceChart from './price_chart';

class AlertFormComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      chageTab: false,
    };
    this.update = this.update.bind(this);
    this.submit_form = this.submit_form.bind(this);
    this.submit_callback = this.submit_callback.bind(this);
    this.switchTab1 = this.switchTab1.bind(this);
    this.switchTab2 = this.switchTab2.bind(this);
  }

  componentWillMount() {
    api.request_alerts_all();
  }

  update(ev) {
    let target = $(ev.target);
    console.log(target);
    let data = {};
    data[target.attr('name')] = target.val();
    this.props.dispatch({
      type: 'UPDATE_ALERT_FORM',
      data: data,
    });
    api.update_current_coin_type(target.val());
  }

  submit_form(ev) {

    let alert_params = this.props.alert_form;

    const data = {
      alert_params: alert_params,
      token: this.props.token,
    };

    if(this.props.match.params.alert_id) {
      // update
      const alert_id = parseInt(this.props.match.params.alert_id);
      api.update_alert(alert_id, data, this.submit_callback);
    } else {
      // create
      api.create_alert(data, this.submit_callback);
    }

  }

  submit_callback() {
    this.setState({
      redirect: true,
    });
  }

  switchTab1(ev) {
    ev.preventDefault();
    this.setState({
      changeTab: false,
    });
  }

  switchTab2(ev) {
    ev.preventDefault();
    this.setState({
      changeTab: true,
    });
  }

  render() {
    if(this.state.redirect) {
      return (<Redirect to={'/'} />);
    }

    if (this.state.changeTab) {
      return <div className="tab-contain">
      <ul id="tabs">
        <a onClick={this.switchTab1} className="button1 bouncy">New Subscribe</a>
        <a onClick={this.switchTab2} className="button1 bouncy" style={{animationDelay:"0.07s"}}>My Alert</a>
      </ul>
      <div id="content">
        <div class="container-login100">
          <div class="table100 ver3 m-b-110">
        		<div class="table100-head">
        			<table>
        				<thead>
        					<tr class="row100 head">
        						<th class="cell100 column4">Coin Type</th>
        						<th class="cell100 column5">Alert Setting</th>
        						<th class="cell100 column6">Insert Time</th>
        						<th class="cell100 column7"></th>
        					</tr>
        				</thead>
        			</table>
        		</div>

        		<div class="table100-body js-pscroll">
        			<table>
        				<tbody>
                  <tr class="row100 body">
        						<td class="cell100 column4">a</td>
                    <td class="cell100 column5">b</td>
        						<td class="cell100 column6">d</td>
                    <td class="cell100 column7">
                      <span>delete</span>
                    </td>
        					</tr>
        				</tbody>
        			</table>
        		</div>
        	</div>
        </div>
      </div>
    </div>
    }
    else {
    return (
      <div className="tab-contain">
        <ul id="tabs">
          <a onClick={this.switchTab1} className="button1 bouncy">New Subscribe</a>
          <a onClick={this.switchTab2} className="button1 bouncy" style={{animationDelay:"0.07s"}}>My Alert</a>
        </ul>
        <div id="content">
          <div class="container-contact100">
        		<div id="tab1" class="wrap-contact100">
        			<form class="contact100-form validate-form">
        				<span class="contact100-form-title">
        					Alert Setting
        				</span>

        				<div class="wrap-input100">
        					<div class="label-input100">Coin Type</div>
          					<div>
                      <select className="input100" name="coin_type" placeholder="title"
                            value={this.props.alert_form.coin_type} onChange={this.update}>
          							<option>Please chooses</option>
          							<option value={"BTC"}>BTC</option>
          							<option value={"LTC"}>LTC</option>
          							<option value={"ETH"}>ETH</option>
          						</select>
          						<div class="dropDownSelect2"></div>
          					</div>
        					<span class="focus-input100"></span>
        				</div>

                <div class="wrap-input100 validate-input">
        					<div class="label-input100">Alert Type</div>
          					<div>
                      <select className="input100" name="alert_type" placeholder="description"
                            value={this.props.alert_form.alert_type} onChange={this.update}>
                            <option>Please chooses</option>
                            <option value={"ASC"}>Ascending</option>
                            <option value={"DES"}>Descending</option>
                      </select>
          						<div class="dropDownSelect2"></div>
          					</div>
        					<span class="focus-input100"></span>
        				</div>

                <div class="wrap-input100 validate-input">
        					<label class="label-input100" for="email">Threshold</label>
                  <input type="number" className="input100" name="threshold" step={0.1} min={0}
                        value={this.props.alert_form.threshold} onChange={this.update}/>
        					<span class="focus-input100"></span>
        				</div>

        				<div class="container-contact100-form-btn">
        					<button class="contact100-form-btn" onClick={this.submit_form}>
        						Subscribe
        					</button>
        				</div>
        			</form>
              <div class="contact100-more">
                <PriceChart chart-data ={this.props} />
              </div>
        		</div>
        	</div>
      </div>
    </div>
    );
    }
  }
}

const AlertForm = withRouter(connect((state) => ({
  token: state.token,
  alert_form: state.alert_form
}))(AlertFormComponent));

export default AlertForm;
