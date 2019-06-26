import React from "react";
import { Link } from "react-router-dom";

import UserIcon from "./UserIcon";

const smProfile = ({ name, headline, id, image, ...rest }) => (
  <div className="sm_profile" {...rest}>
    <div className="">
      <UserIcon size="2rem" iconSize="lg" url={image} />
    </div>
    <div className="sm_profile__text">
      <Link to={`/profile/${id}`} className="link">
        <h6>{name}</h6>
      </Link>
      <h6 className="small">{headline}</h6>
    </div>
  </div>
);

export default smProfile;
