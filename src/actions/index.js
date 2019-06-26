import {
  loginUser,
  logoutUser,
  registerUser,
  setOnboarding,
  setPicture,
  updateUser,
  updateProfile
} from "./auth";

import {
  fetchNotifications,
  onNotification,
  acceptConnectionReq,
  acceptProjectReq
} from "./notifications";
import { fetchFeed } from "./posts";

export {
  loginUser,
  logoutUser,
  registerUser,
  setOnboarding,
  setPicture,
  updateUser,
  updateProfile,
  fetchNotifications,
  onNotification,
  acceptConnectionReq,
  acceptProjectReq,
  fetchFeed
};
