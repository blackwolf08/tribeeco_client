import React from "react";
import { Link } from "react-router-dom";

const Stats = () => (
  <div className="card card-custom box-shadow mb-3">
    <div className="card-header">Your Stats</div>
    <div className="card-body">
      <h6 className="text-uppercase font-weight-bold mb-4">Your Posts Reach</h6>

      {[...Array(2)].map((x, i) => (
        <div className="stats-post" key={i}>
          <span>Post 1 Title</span>
          <span>1.25k</span>
        </div>
      ))}

      <Link
        to="#"
        className="d-block text-uppercase mt-3 font-weight-bold link"
      >
        View More
      </Link>
    </div>
  </div>
);

export default Stats;
