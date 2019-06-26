import axios from "axios";
import { BASE_API_URL } from "../constants";

import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGOUT,
  SET_ONBOARDING,
  SET_PICTURE,
  UPDATE_SUCCESS,
  UPDATE_PROFILE_SUCCESS
} from "../constants/actionTypes";

function fetch(url, options, token) {
  axios.defaults.baseURL = BASE_API_URL;
  axios.defaults.headers.post["Content-Type"] = "application/json";
  if (token) axios.defaults.headers.common["x-auth"] = token;
  return axios({ url: url, ...options });
}

function loginRequest() {
  return {
    type: LOGIN_REQUEST
  };
}

function loginSuccess(user) {
  return {
    type: LOGIN_SUCCESS,
    user
  };
}

function loginError(message) {
  return {
    type: LOGIN_FAILURE,
    message
  };
}

function registerError(message) {
  return {
    type: REGISTER_FAILURE,
    message
  };
}
function registerRequest() {
  return {
    type: REGISTER_REQUEST
  };
}

function registerSuccess(user) {
  return {
    type: REGISTER_SUCCESS,
    user
  };
}
export function updateUser(newUser) {
  return dispatch => {
    localStorage.removeItem("user");
    localStorage.setItem("user", JSON.stringify(newUser));

    dispatch({
      type: UPDATE_SUCCESS,
      newUser
    });
  };
}
export function updateProfile(newUser) {
  return dispatch => {
    localStorage.removeItem("user");
    localStorage.setItem("user", JSON.stringify(newUser));

    dispatch({
      type: UPDATE_PROFILE_SUCCESS,
      newUser
    });
  };
}

export function setOnboarding() {
  return dispatch => {
    const user = JSON.parse(localStorage.getItem("user"));
    const newUser = { ...user, onboarding: true };
    localStorage.setItem("user", JSON.stringify(newUser));

    dispatch({
      type: SET_ONBOARDING
    });
  };
}

export function setPicture(url) {
  return dispatch => {
    const user = JSON.parse(localStorage.getItem("user"));
    const newUser = { ...user, profilepic: url };
    localStorage.setItem("user", JSON.stringify(newUser));

    dispatch({
      type: SET_PICTURE,
      url
    });
  };
}

export function logoutUser() {
  return dispatch => {
    localStorage.removeItem("id_token");
    localStorage.removeItem("user");
    dispatch({
      type: LOGOUT
    });
  };
}
export function loginUser(creds) {
  return dispatch => {
    dispatch(loginRequest());

    return fetch("login", {
      method: "POST",
      data: creds
    })
      .then(res => {
        const token = res.headers["x-auth"];
        localStorage.setItem("id_token", token);
        localStorage.setItem("user", JSON.stringify(res.data));
        dispatch(loginSuccess(res.data));
      })
      .catch(err => {
        if (
          err.response &&
          (err.response.status === 401 || err.response.status === 404)
        )
          dispatch(loginError(err.response.data.msg));
        else dispatch(loginError("Server Error. Try again."));
      });
  };
}

export function registerUser(creds) {
  return dispatch => {
    dispatch(registerRequest());

    return fetch("signup", {
      method: "POST",
      data: creds
    })
      .then(res => {
        const token = res.headers["x-auth"];
        localStorage.setItem("id_token", token);
        localStorage.setItem("user", JSON.stringify(res.data));
        dispatch(registerSuccess(res.data));
      })
      .catch(err => {
        if (err.response && err.response.status === 400)
          dispatch(registerError(err.response.data.msg));
        else dispatch(registerError("Server Error. Try again."));
      });
  };
}
