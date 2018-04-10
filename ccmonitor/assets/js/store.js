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

let initial_price = {
  BTC: "loading",

};

function price(state = initial_price, action) {
  switch (action.type) {
    case 'UPDATE_PRICES':
      return Object.assign({}, state, {[action.data.type]: action.data.price});
    default:
      return state;
  }
}

function root_reducer(state0, action) {
  console.log("reducer", action);
  // {posts, users, form} is ES6 shorthand for
  // {posts: posts, users: users, form: form}
  let reducer = combineReducers({users, login, token, signup, price});
  let state1 = reducer(state0, action);
  console.log("state1", state1);
  return deepFreeze(state1);
};

let store = createStore(root_reducer);
export default store;
