import {
  GET_FEED_REQUEST,
  GET_FEED_SUCCESS,
  GET_FEED_ERROR,
  GET_FOLL_FEED_REQUEST,
  GET_FOLL_FEED_SUCCESS,
  GET_FOLL_FEED_ERROR
} from "../constants/actionTypes";

function posts(
  state = {
    recFetching: true,
    follFetching: true,
    recommendedFeed: [],
    followedFeed: []
  },
  action
) {
  const { payload } = action;
  switch (action.type) {
    case GET_FEED_REQUEST:
      return {
        ...state,
        recFetching: true
      };
    case GET_FEED_SUCCESS:
      return {
        ...state,
        recFetching: false,
        recommendedFeed: payload.posts
      };

    case GET_FEED_ERROR:
      return {
        ...state,
        recFetching: false,
        recommendedFeed: []
      };

    case GET_FOLL_FEED_REQUEST:
      return {
        ...state,
        follFetching: true
      };
    case GET_FOLL_FEED_SUCCESS:
      return {
        ...state,
        follFetching: false,
        followedFeed: payload.posts
      };

    case GET_FOLL_FEED_ERROR:
      return {
        ...state,
        follFetching: false,
        followedFeed: []
      };
    default:
      return state;
  }
}

export default posts;
