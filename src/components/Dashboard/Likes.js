import React from "react";
import { Link } from "react-router-dom";

import UserIcon from "../Common/UserIcon";

const Likes = props => {
  return props.likesList.map(item => (
    <div key={item.id} className="d-flex align-items-center mb-2">
      <UserIcon size="2rem" iconSize="lg" url={item.user.profilepic} />
      <Link to={`/profile/${item.userId}`} className="link ml-3">
        {item.user.fullname}
      </Link>
    </div>
  ));
};

export default Likes;
