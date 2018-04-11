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
    if(data.currency) {
      currency = data.currency;
    }

    let url = "https://api.coinbase.com/v2/prices/"+data.type+'-'+currency+"/spot";

    $.ajax(url, {
      method: "get",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      success: (resp) => {
        const data1 = {
          type: data.type,
          price: resp.data.amount,
          currency: resp.data.currency,
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
}

export default new TheServer();
