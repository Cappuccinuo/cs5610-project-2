import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { Table, Button, Label} from 'reactstrap';
import { NavLink, Redirect, Link } from 'react-router-dom';
import swal from 'sweetalert';

import api from '../api';

class NotificationCenter extends React.Component {
  constructor(props) {
    super(props);
    api.request_messages_all(this.props.token.user_id);
  }

  render() {
    if (!this.props.token) {
      const { from } = '/';
      return <Redirect to={from || '/'}/>;
    }
    console.log("wahahahha" + this.props.token);
    let user_id = this.props.token.user_id;
    let index = 0;
    let messageList = this.props.messages.map(function(mes){
      return <tr key={index++}>
      	<td>{mes.coin_type}</td>
      	<td>{(mes.alert_type == "ASC")?"Ascending":"Descending"}</td>
      	<td>{mes.content}</td>
      	<td>{mes.inserted_at}</td>
      	<td><div className="wrapper icons">
      	       <link className="fa fa-trash" onClick={()=>delete_message(mes.id, user_id)}></link>
      	 </div>
      	</td>
      </tr>;
    })

    return (
      <div className="notification-total">
        <div className="notification-select">
          <div className="type-select">
            <Label for="coin_type">Coin Type:  </Label>
            <select name="coin_type" defaultValue="ALL" className="select-item" onChange={()=>update_message_select(this.props.token.user_id)}>
              <option value={"BTC"}>BTC</option>
              <option value={"LTC"}>LTC</option>
              <option value={"ETH"}>ETH</option>
              <option value={"ALL"}>ALL</option>
            </select>
          </div>
          <div className="type-select">
            <Label for="alert_type">Alert Type:  </Label>
            <select name="alert_type" defaultValue="ALL" className="select-item" onChange={()=>update_message_select(this.props.token.user_id)}>
              <option value={"ASC"}>Ascending</option>
              <option value={"DES"}>Descending</option>
              <option value={"ALL"}>ALL</option>
            </select>
          </div>
        </div>

        <div className="notification-message" >
          <div className="messege-table">
            <Table>
              <thead>
                <tr>
                  <th>Coin Type</th>
                  <th>Alert Type</th>
                  <th>Content</th>
                  <th>Sent Date</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {messageList}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
   );
  }
}

// update message based on selection of coin and alert type
function update_message_select(user_id){
    let coin_type = document.getElementsByName("coin_type")[0].value;
    let alert_type = document.getElementsByName("alert_type")[0].value;
    if (coin_type == "ALL" && alert_type == "ALL") { // all messages of given user
      api.request_messages_all(user_id);
    }
    else if (alert_type == "ALL") {  // all messages with given coin type of given user
      api.request_messages_coin_type(user_id, coin_type);
    }
    else if (coin_type == "ALL") { // all messages with given alert type of given user
      api.request_messages_alert_type(user_id, alert_type);
    }
    else {              // all messages with given coin type and alert type of given user
      api.request_messages_coin_alert_type(user_id, coin_type, alert_type);
   }
}

// delete given message
function delete_message(message_id, user_id) {
   //alert();
   swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        api.delete_message(message_id);
        update_message_select(user_id);
        swal("Poof! Your file has been deleted!", {
          icon: "success",
        });
      } else {
        swal("Your file is safe!");
      }
    });
}

const Notification = withRouter(connect((state) => ({
  messages: state.messages,
  token: state.token,
}))(NotificationCenter));

export default Notification;
