import React from "react";
import SmProfile from "../Common/smProfile.js";

const Contributors = () => (
  <div className="card card-custom box-shadow mb-3">
    <div className="card-header">Top Contributors</div>
    <div className="card-body">
      {[...Array(2)].map((x, i) => (
        <SmProfile
          key={i}
          name="Yash Kesarwani"
          headline="Designer"
          id=""
          image=""
        />
      ))}
    </div>
  </div>
);

export default Contributors;
