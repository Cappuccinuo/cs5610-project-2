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

        swal({
          title: "Success!",
          text: "Please check in my alert",
          icon: "warning",
        });

        $(callback);
      },
      error: (resp) => {
        swal({
          title: "Wrong!",
          text: "Log in first",
          icon: "warning",
        });
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
        swal({
          title: "Wrong!",
          text: "Log in first",
          icon: "warning",
        });
      }
    });
  }


  request_alerts_all(user_id) {
    $.ajax("/api/v1/get_alerts_all", {
      method: "post",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify({user_id: user_id}),
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
        swal({
          title: "Wrong!",
          text: "Log in first",
          icon: "warning",
        });
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
        swal({
          title: "Wrong!",
          text: "Log in first",
          icon: "warning",
        });
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
        swal({
          title: "Wrong!",
          text: "Log in first",
          icon: "warning",
        });
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
        swal({
          title: "Wrong!",
          text: "Log in first",
          icon: "warning",
        });
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
        swal({
          title: "Wrong!",
          text: "Log in first",
          icon: "warning",
        });
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

// get coins' open price for today
  get_open_price() {
    let btc_url = "https://min-api.cryptocompare.com/data/histoday?fsym=BTC&tsym=USD&limit=1&aggregate=1&e=CCCAGG";
    $.ajax(btc_url, {
      method: "get",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      success: (resp) => {
        let open_price = resp.Data[0].open;
	store.dispatch({
	  type: 'UPDATE_PRICES',
	  data: {
	    BTC_open: open_price,
	  }
	});
      },
    });

    let eth_url = "https://min-api.cryptocompare.com/data/histoday?fsym=ETH&tsym=USD&limit=1&aggregate=1&e=CCCAGG";
    $.ajax(eth_url, {
      method: "get",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      success: (resp) => {
        let open_price = resp.Data[0].open;
	store.dispatch({
	  type: 'UPDATE_PRICES',
	  data: {
	    ETH_open: open_price,
	  }
	});
      },
    });

    let ltc_url = "https://min-api.cryptocompare.com/data/histoday?fsym=LTC&tsym=USD&limit=1&aggregate=1&e=CCCAGG";
    $.ajax(ltc_url, {
      method: "get",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      success: (resp) => {
        let open_price = resp.Data[0].open;
	store.dispatch({
	  type: 'UPDATE_PRICES',
	  data: {
	    LTC_open: open_price,
	  }
	});
      },
    });
  }

// get prices for table in coin page
  get_prices_for_table() {
    let btc_url = "https://min-api.cryptocompare.com/data/histoday?fsym=BTC&tsym=USD&limit=30&aggregate=1&e=CCCAGG";
    $.ajax(btc_url, {
      method: "get",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      success: (resp) => {
        let prices = resp.Data;
	store.dispatch({
	  type: 'UPDATE_PRICES_FOR_TABLE',
	  data: {
	    BTC: prices,
	  }
	});
      },
    });

    let eth_url = "https://min-api.cryptocompare.com/data/histoday?fsym=ETH&tsym=USD&limit=30&aggregate=1&e=CCCAGG";
    $.ajax(eth_url, {
      method: "get",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      success: (resp) => {
        let prices = resp.Data;
	store.dispatch({
	  type: 'UPDATE_PRICES_FOR_TABLE',
	  data: {
	    ETH: prices,
	  }
	});
      },
    });

    let ltc_url = "https://min-api.cryptocompare.com/data/histoday?fsym=LTC&tsym=USD&limit=30&aggregate=1&e=CCCAGG";
    $.ajax(ltc_url, {
      method: "get",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      success: (resp) => {
        let prices = resp.Data;
	store.dispatch({
	  type: 'UPDATE_PRICES_FOR_TABLE',
	  data: {
	    LTC: prices,
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
