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

function auth(
  state = {
    isFetching: false,
    isAuthenticated: localStorage.getItem("id_token") ? true : false,
    user: JSON.parse(localStorage.getItem("user")),
    hasError: false,
    loginErrorMessage: "",
    registerErrorMessage: "",
    registerSuccess: false
  },
  action
) {
  switch (action.type) {
    case SET_PICTURE:
      return {
        ...state,
        user: {
          ...state.user,
          profilepic: action.url
        }
      };
    case SET_ONBOARDING:
      return {
        ...state,
        user: {
          ...state.user,
          onboarding: true
        }
      };
    case LOGIN_REQUEST:
    case REGISTER_REQUEST:
      return {
        ...state,
        isFetching: true,
        isAuthenticated: false,
        hasError: false
      };
    case UPDATE_SUCCESS:
      return { ...state, user: { ...action.newUser, onboarding: false } };

    case UPDATE_PROFILE_SUCCESS:
      return { ...state, user: { ...action.newUser } };

    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: true,
        user: action.user,
        registerSuccess: true
      };
    case REGISTER_FAILURE:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: false,
        registerErrorMessage: action.message,
        hasError: true
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: false,
        loginErrorMessage: action.message,
        hasError: true
      };
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: {},
        registerSuccess: false
      };
    default:
      return state;
  }
}

export default auth;
