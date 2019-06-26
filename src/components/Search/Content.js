import React from "react";

import PostCard from "./PostCard";
import WithSearch from "./WithSearch";

const Content = props => (
  <WithSearch {...props} url="searchposts">
    {data =>
      data && data.map((datum, idx) => <PostCard data={datum} key={idx} />)
    }
  </WithSearch>
);

export default Content;
