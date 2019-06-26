import React from "react";

import ProfileCard from "../Common/ProfileCard";
import WithSearch from "./WithSearch";

const People = props => (
  <WithSearch {...props} url="searchpeople">
    {data =>
      data &&
      data.map((datum, idx) => (
        <ProfileCard data={datum} key={idx} showFollow={false} />
      ))
    }
  </WithSearch>
);

export default People;
