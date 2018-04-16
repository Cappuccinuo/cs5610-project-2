import store from './store';
import swal from 'sweetalert';

class TheServer {
  request_users() {
    $.ajax("/api/v1/users", {
      method: "get",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      success: (resp) => {
        store.dispatch({
          type: 'USERS_LIST',
          users: resp.data,
        });
      },
      error: (resp) => {
        swal({
          title: "Wrong!",
          text: "Try again",
          icon: "warning",
        });
      },
    });
  }

  submit_login(data) {
    $.ajax("/api/v1/token", {
      method: "post",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify(data),
      success: (resp) => {
        store.dispatch({
          type: 'SET_TOKEN',
          token: resp,
        });
        swal({
          title: "Log in Success!",
          text: "Enjoy!",
          icon: "success",
        });
      },
      error: (resp) => {
        swal({
          title: "Wrong Combination!",
          text: "Try again",
          icon: "warning",
        });
      },
    });
  }

  get_price(data) {
    let currency = 'USD';

    let url = "https://api.coinbase.com/v2/prices/"+data.type+'-'+currency+"/spot";

    $.ajax(url, {
      method: "get",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      success: (resp) => {
        console.log(resp)
        const data1 = {
          base: resp.data.base,
          prices: [ resp.data.amount ],
        };
        store.dispatch({
          type: 'UPDATE_PRICES',
          data: data1,
        });
      },
    });

  }

  submit_user(data) {
    $.ajax("/api/v1/users", {
      method: "post",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify({ user: data }),
      success: (resp) => {
        store.dispatch({
          type: 'ADD_USER',
          user: resp.data,
        });
        swal({
          title: "Create Success!",
          text: "You can log in now",
          icon: "success",
        });
      },
      error: (resp) => {
        console.log(data);
        swal({
          title: "Wrong!",
          text: "Try again",
          icon: "warning",
        });
      },
    });
  }

  create_alert(data, callback) {
    $.ajax("/api/v1/alerts", {
      method: "post",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify({ token: data.token, alert: data.alert_params }),
      success: (resp) => {
        store.dispatch({
          type: 'UPDATE_ALERTS',
          data: {[resp.data.id]: resp.data},
        });
        $(callback);
      },
      error: (resp) => {
        alert('please login first');
      }
   });
  }

  update_alert(id, data, callback) {
    $.ajax("/api/v1/alerts/"+id, {
      method: "put",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify({ alert: data.alert_params, id: id, token: data.token }),
      success: (resp) => {
        store.dispatch({
          type: 'UPDATE_ALERTS',
          data: {[resp.data.id]: resp.data},
        });
        $(callback);
      },
      error: (xhr) => {
        alert('please login first');
      }
    });
  }


  // request all messages of given user
  request_messages_all(user_id) {
    // alert(user_id);
    $.ajax("/api/v1/get_messages_all", {
      method: "post",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify({user_id: user_id}),
      success: (resp) => {
        store.dispatch({
          type: 'MESSAGES_LIST',
          messages: resp.data,
        });
      },
      error: (xhr) => {
        alert('please login first');
      }
    });
  }

  // request messages of given user id and coin type
  request_messages_coin_type(user_id, coin_type) {
    $.ajax("/api/v1/get_messages_coin_type", {
      method: "post",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify({user_id: user_id, coin_type: coin_type}),
      success: (resp) => {
        store.dispatch({
          type: 'MESSAGES_LIST',
          messages: resp.data,
        });
      },
      error: (xhr) => {
        alert('please login first');
      }
    });
  }

  // request messages of given user id and alert type
  request_messages_alert_type(user_id, alert_type) {
    $.ajax("/api/v1/get_messages_alert_type", {
      method: "post",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify({user_id: user_id, alert_type: alert_type}),
      success: (resp) => {
        store.dispatch({
          type: 'MESSAGES_LIST',
          messages: resp.data,
        });
      },
      error: (xhr) => {
        alert('please login first');
      }
    });
  }

  // request messages of given user id and coin type and alert type
  request_messages_coin_alert_type(user_id, coin_type, alert_type) {
    $.ajax("/api/v1/get_messages_coin_alert_type", {
      method: "post",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify({user_id: user_id, coin_type: coin_type, alert_type: alert_type}),
      success: (resp) => {
        store.dispatch({
          type: 'MESSAGES_LIST',
          messages: resp.data,
        });
      },
      error: (xhr) => {
        alert('please login first');
      }
    });
  }

  // delete given message
  delete_message(message_id) {
    $.ajax("/api/v1/messages/"+message_id, {
      method: "delete",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      success: (resp) => {
      },
      error: (xhr) => {
        alert('please login first');
      }
    }); 
  }


}



export default new TheServer();
