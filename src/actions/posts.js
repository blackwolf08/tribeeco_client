import axios from "../utils/axios";

import {
  GET_FEED_REQUEST,
  GET_FEED_SUCCESS,
  GET_FEED_ERROR,
  GET_FOLL_FEED_REQUEST,
  GET_FOLL_FEED_SUCCESS,
  GET_FOLL_FEED_ERROR
} from "../constants/actionTypes";

const recommendedTypes = {
  request: GET_FEED_REQUEST,
  success: GET_FEED_SUCCESS,
  error: GET_FEED_ERROR
};
const followedTypes = {
  request: GET_FOLL_FEED_REQUEST,
  success: GET_FOLL_FEED_SUCCESS,
  error: GET_FOLL_FEED_ERROR
};

export function fetchFeed(type) {
  return (dispatch, getState) => {
    const state = getState();
    const isTypeRecommended = type == "recommendedFeed";

    if (isTypeRecommended && state.posts.recommendedFeed.length > 0) return;
    if (!isTypeRecommended && state.posts.followedFeed.length > 0) return;

    // const url = isTypeRecommended ? "recommendposts" : "feed/following";
    const url = isTypeRecommended ? "feed/tribe" : "feed/following";
    const types = isTypeRecommended ? recommendedTypes : followedTypes;
    dispatch({ type: types.request });

    axios
      .get(url)
      .then(res => {
        dispatch({
          type: types.success,
          payload: { posts: res.data }
        });
      })
      .catch(err => {
        dispatch({
          type: types.error
        });
      });
  };
}
