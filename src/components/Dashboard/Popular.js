import React from "react";

const Contributors = () => (
  <div className="card card-custom box-shadow mb-3">
    <div className="card-header">Popular Topics</div>
    <div className="card-body">
      <h6 className="text-uppercase font-weight-bold mb-4">
        Currently Trending in Tribe
      </h6>

      <div className="d-flex justify-content-around flex-wrap">
        <button className="btn btn-secondary">Topic 1</button>
        <button className="btn btn-secondary">Topic 2</button>
      </div>
    </div>
  </div>
);

export default Contributors;
