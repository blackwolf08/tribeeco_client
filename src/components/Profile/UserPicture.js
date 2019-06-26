import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const UserPicture = ({ url }) => {
  if (url === null || url === "") return <FontAwesomeIcon icon="user" />;
  return <img src={url} alt="profile" />;
};

export default UserPicture;
