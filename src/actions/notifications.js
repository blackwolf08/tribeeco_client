import axios from "../utils/axios";

import {
  GET_NOTIFICATIONS_REQUEST,
  GET_NOTIFICATIONS_SUCCESS,
  GET_NOTIFICATIONS_ERROR,
  INCOMING_NOTIFICATION,
  ACCEPT_CONN_REQUEST,
  ACCEPT_PROJECT_REQUEST,
  ACCEPT_REQUEST
} from "../constants/actionTypes";

function action(type, payload) {
  return {
    type,
    payload
  };
}

export function fetchNotifications() {
  return dispatch => {
    dispatch({ type: GET_NOTIFICATIONS_REQUEST });

    axios
      .get("requests")
      .then(res => {
        let result = {};
        if (res.data && res.data.all.length > 0) {
          res.data.all.map((item, idx) => {
            result[idx] = { ...item, index: idx };
          });
        }

        dispatch({
          type: GET_NOTIFICATIONS_SUCCESS,
          payload: { notifications: result }
        });

        // else
        //   this.setState({
        //     isDataAvailable: false
        //   });
      })
      .catch(err => {
        dispatch({
          type: GET_NOTIFICATIONS_ERROR
        });
      });
  };
}

export function acceptConnectionReq(senderId, index) {
  return dispatch => {
    axios
      .patch("acceptrequest", { senderId })
      .then(res => {
        dispatch(action(ACCEPT_REQUEST, { index }));
      })
      .catch(err => {
        console.log(err);
      });
  };
}

export function acceptProjectReq(projectId, index) {
  return dispatch => {
    axios
      .patch(`acceptprojectrequest/${projectId}`)
      .then(res => {
        dispatch(action(ACCEPT_REQUEST, { index }));
      })
      .catch(err => {
        console.log(err);
      });
  };
}
export function onNotification(notification) {
  return dispatch => {
    console.log("onNotification", notification);
  };
}
