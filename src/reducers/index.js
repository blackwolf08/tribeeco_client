import auth from "./auth";
import notifications from "./notifications";
import posts from "./posts";
import { combineReducers } from "redux";

export default combineReducers({
  auth,
  notifications,
  posts
});
