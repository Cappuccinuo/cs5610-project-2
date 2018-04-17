import { createStore, combineReducers } from 'redux';
import deepFreeze from 'deep-freeze';

function users(state = [], action) {
  switch (action.type) {
  case 'USERS_LIST':
    return [...action.users];
  case 'ADD_USER':
    return [action.user, ...state];
  default:
    return state;
  }
}

function token(state = null, action) {
  switch (action.type) {
    case 'SET_TOKEN':
      return action.token ? action.token : state;
    case 'DELETE_TOKEN':
      return null;
    default:
      return state;
  }
}

let empty_login = {
  email: "",
  password: "",
};

function login(state = empty_login, action) {
  switch (action.type) {
    case 'UPDATE_LOGIN_FORM':
      return Object.assign({}, state, action.data);
    case 'CLEAR_LOGIN_FORM':
      state = empty_login;
      return state;
    default:
      return state;
  }
}

let empty_signup_form = {
  email: "",
  name: "",
  password: "",
};

function signup(state = empty_signup_form, action) {
  switch (action.type) {
    case 'UPDATE_SIGNUP_FORM':
      return Object.assign({}, state, action.data);
    case 'CLEAR_SIGNUP_FORM':
      state = empty_signup_form;
      return empty_signup_form;
    default:
      return state;
  }
}

let empty_alert_form = {
  coin_type: "BTC",
  alert_type: "ASC",
  threshold: 7000.0,
};

function alert_form(state = empty_alert_form, action) {
  switch (action.type) {
    case 'UPDATE_ALERT_FORM':
      return Object.assign({}, state, action.data);
    default:
      return state;
  }
}

function alerts(state = {}, action) {
  switch (action.type) {
    case 'UPDATE_ALERTS':
      return Object.assign({}, state, action.data);
    default:
      return state;
  }
}

let initial_price = {
  BTC: [],
  LTC: [],
  ETH: [],
  time: [],
};

function prices(state = initial_price, action) {
  switch (action.type) {
    case 'UPDATE_PRICES':
      return Object.assign({}, state, action.data);
    default:
      return state;
  }
}

let initial_historical_price = {
  BTC: [],
  LTC: [],
  ETH: [],
  time: [],
};

function historical_prices(state = initial_historical_price, action) {
  switch (action.type) {
    case 'UPDATE_HISTORICAL_PRICES':
      return Object.assign({}, state, action.data);
    default:
      return state;
  }
}

// messages
function messages(state = [], action) {
  switch (action.type) {
  case 'MESSAGES_LIST':
    return [...action.messages];
  default:
    return state;
  }
}

// current coin type displayed in chart or subscrib
function current_coin_type(state = "BTC", action) {
  switch (action.type) {
  case 'UPDATE_CURRENT_COIN_TYPE':
    return action.coin_type ? action.coin_type : state;
  default:
    return state;
  }
}


function root_reducer(state0, action) {
  console.log("reducer", action);
  // {posts, users, form} is ES6 shorthand for
  // {posts: posts, users: users, form: form}
  let reducer = combineReducers({users, login, token, signup, prices, historical_prices, alerts, alert_form, messages, current_coin_type});
  let state1 = reducer(state0, action);
  console.log("state1", state1);
  return deepFreeze(state1);
};

let store = createStore(root_reducer);
export default store;
