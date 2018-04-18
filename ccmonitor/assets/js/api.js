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

  get_price() {
    let btc_url = "https://api.coinbase.com/v2/prices/BTC-USD/spot";
    $.ajax(btc_url, {
      method: "get",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      success: (resp) => {
        store.dispatch({
          type: 'UPDATE_PRICES',
          data: {
            BTC: [ resp.data.amount ],
          },
        });
      },
    });

    let ltc_url = "https://api.coinbase.com/v2/prices/LTC-USD/spot";
    $.ajax(ltc_url, {
      method: "get",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      success: (resp) => {
        store.dispatch({
          type: 'UPDATE_PRICES',
          data: {
            LTC: [ resp.data.amount ],
          },
        });
      },
    });

    let eth_url = "https://api.coinbase.com/v2/prices/ETH-USD/spot";
    $.ajax(eth_url, {
      method: "get",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      success: (resp) => {
        store.dispatch({
          type: 'UPDATE_PRICES',
          data: {
            ETH: [ resp.data.amount ],
          },
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

  request_alerts_all() {
    $.ajax("/api/v1/alerts", {
      method: "get",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      success: (resp) => {
        store.dispatch({
          type: 'ALERT_LIST',
          all_alerts: resp.data,
        });
      },
    })
  }

  delete_alert(alert_id) {
    $.ajax("/api/v1/alerts/" + alert_id, {
      method: "delete",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: "",
      success: (resp) => {
        store.dispatch({
          type: 'DELETE_ALERT',
          alert_id: alert_id,
        });
      },
      error: (xhr) => {
        swal({
          title: "Wrong!",
          text: "Try again",
          icon: "warning",
        });
      },
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
        console.log(resp.data);
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

 // need to get data from back end
 // get one day chart data
  get_chart_data_one_day() {
    store.dispatch({
     type: 'UPDATE_HISTORICAL_PRICES',
     data: {
       BTC: [50, 250, 200, 300, 280, 300, 350],
       ETH: [300, 200, 250, 200, 300, 280, 300],
       LTC: [200, 100, 200, 250, 200, 300, 280],
       time: ["2018-4-11\n1pm", "2018-4-11\n2pm", "2018-4-11\n3pm", "2018-4-11\n4pm",
            "2018-4-11\n5pm", "2018-4-11\n6pm", "2018-4-11\n7pm"],
     }
   });
 }

 // get one week chart data
  get_chart_data_one_week() {
    store.dispatch({
     type: 'UPDATE_HISTORICAL_PRICES',
     data: {
       BTC: [200, 250, 200, 250, 280, 300, 50],
       ETH: [100, 200, 250, 1800, 300, 280, 250],
       LTC: [50, 100, 200, 230, 200, 300, 100],
       time: ["2018-4-11", "2018-4-12", "2018-4-13", "2018-4-14",
            "2018-4-15", "2018-4-16", "2018-4-17"],
     }
   });
 }

 // get one month chart data
  get_chart_data_one_month() {
    store.dispatch({
     type: 'UPDATE_HISTORICAL_PRICES',
     data: {
       BTC: [200, 250, 200, 300, 280, 300, 350],
       ETH: [100, 200, 250, 200, 300, 280, 300],
       LTC: [50, 100, 200, 250, 200, 300, 280],
       time: ["2018-4-12", "2018-4-13", "2018-4-14", "2018-4-15",
            "2018-4-16", "2018-4-17", "2018-4-18"],
     }
   });
 }

 // update current coin type
  update_current_coin_type(coin_type) {
    store.dispatch({
     type: 'UPDATE_CURRENT_COIN_TYPE',
     coin_type: coin_type,
   });
 }


  // get historical price(close price) for chart
  // scope: price unit is hour or day
  // limit: number of data 
  get_historical_price(scope, limit) {
    let price_btc = [];
    let price_eth = [];
    let price_ltc = [];
    let time = [];   

    let btc_url = "https://min-api.cryptocompare.com/data/histo" + scope + "?fsym=BTC&tsym=USD&limit=" + limit + "&aggregate=1&e=CCCAGG";
    $.ajax(btc_url, {
      method: "get",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      success: (resp) => {
        price_btc = resp.Data.map(function (price) {
                return price.close;
            });
        time = resp.Data.map(function (price) {
                return  convertTime(price.time, scope);
            });
	store.dispatch({
	  type: 'UPDATE_HISTORICAL_PRICES',
	  data: {
	    BTC: price_btc,
	    time: time,
	  }
	});
      },
    });

    let eth_url = "https://min-api.cryptocompare.com/data/histo" + scope + "?fsym=ETH&tsym=USD&limit=" + limit + "&aggregate=1&e=CCCAGG";
    $.ajax(eth_url, {
      method: "get",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      success: (resp) => {
        price_eth = resp.Data.map(function (price) {
                return price.close;
            });
	store.dispatch({
	  type: 'UPDATE_HISTORICAL_PRICES',
	  data: {
	    ETH: price_eth,
	    time: time,
	  }
	});
      },
    });

    let ltc_url = "https://min-api.cryptocompare.com/data/histo" + scope + "?fsym=LTC&tsym=USD&limit=" + limit + "&aggregate=1&e=CCCAGG";
    $.ajax(ltc_url, {
      method: "get",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      success: (resp) => {
        price_ltc = resp.Data.map(function (price) {
                return price.close;
            });
	store.dispatch({
	  type: 'UPDATE_HISTORICAL_PRICES',
	  data: {
	    LTC: price_ltc,
	    time: time,
	  }
	});
      },
    });
  }

}

// convert unix timestamp into normal time
function convertTime(unixtime, scope) {
  let u = new Date(unixtime*1000);
  let date = u.toLocaleDateString();
  let time = u.toLocaleTimeString();
  if (scope == "day") {
    return date;
  }
  else if (scope == "hour") {
    return date + "\n" + time;
  }
};

export default new TheServer();
