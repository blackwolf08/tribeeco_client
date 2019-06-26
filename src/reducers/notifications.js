import {
  GET_NOTIFICATIONS_REQUEST,
  GET_NOTIFICATIONS_SUCCESS,
  GET_NOTIFICATIONS_ERROR,
  INCOMING_NOTIFICATION,
  ACCEPT_CONN_REQUEST,
  ACCEPT_PROJECT_REQUEST,
  ACCEPT_REQUEST
} from "../constants/actionTypes";

function notifications(
  state = {
    isFetching: true,
    notificationsById: {}
  },
  action
) {
  const { payload } = action;
  switch (action.type) {
    case GET_NOTIFICATIONS_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case GET_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        notificationsById: payload.notifications
      };
    case ACCEPT_REQUEST:
      let { [payload.index]: omit, ...rest } = state.notificationsById;
      return {
        ...state,
        isFetching: false,
        notificationsById: rest
      };
    case GET_NOTIFICATIONS_ERROR:
      return {
        ...state,
        isFetching: false,
        notificationsById: {}
      };
    case INCOMING_NOTIFICATION:
      return {
        ...state,
        notifications: [...state.notifications, payload.notification]
      };

    default:
      return state;
  }
}

export default notifications;
