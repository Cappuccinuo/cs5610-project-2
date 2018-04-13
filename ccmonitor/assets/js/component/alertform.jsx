import React from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import { withRouter } from 'react-router';
import { Form, FormGroup, NavItem, Label, Input, Button, Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle } from 'reactstrap';
import { connect } from 'react-redux';
import { CookiesProvider } from 'react-cookie';
import api from '../api';
import Login from './login.jsx';
import CurrentPriceChart from './current_price_chart';

class AlertFormComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
    };
    this.update = this.update.bind(this);
    this.submit_form = this.submit_form.bind(this);
    this.submit_callback = this.submit_callback.bind(this);
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

  render() {
    if(this.state.redirect) {
      return (<Redirect to={'/'} />);
    }

    return (
      <div>
        {/*
        <Card>
          <CardBody>
            <FormGroup>
              <Label for="coin_type">Coin Type</Label>
              <Input type="select" name="coin_type"
                    value={this.props.alert_form.coin_type} onChange={this.update}>
                    <option value={"BTC"}>BTC</option>
                    <option value={"LTC"}>LTC</option>
                    <option value={"ETH"}>ETH</option>

              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="alert_type">Alert Type</Label>
              <Input type="select" name="alert_type"
                    value={this.props.alert_form.alert_type} onChange={this.update}>
                    <option value={"ASC"}>Ascending</option>
                    <option value={"DES"}>Descending</option>
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="threshold">Time Spent</Label>
              <Input type="number" name="threshold" step={0.1} min={0}
                    value={this.props.alert_form.threshold} onChange={this.update}/>
            </FormGroup>
            <Button onClick={this.submit_form}>Submit</Button>
          </CardBody>
        </Card>
        */}
        <div class="container-contact100">
      		<div class="wrap-contact100">
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
              <CurrentPriceChart chart-data ={this.props} />
            </div>
      		</div>
      	</div>
    </div>
    );
  }
}

const AlertForm = withRouter(connect((state) => ({
  token: state.token,
  alert_form: state.alert_form
}))(AlertFormComponent));

export default AlertForm;
