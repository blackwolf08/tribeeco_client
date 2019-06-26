import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const About = ({ data }) => (
  <>
    <section className="profile-about-card">
      <h5 className="">About</h5>
      <div className="">{data.about}</div>
    </section>

    <section className="profile-about-card">
      <h5>Interests</h5>
      <div className="">
        {data.interests &&
          data.interests.map((x, i) => (
            <span
              className="badge badge-primary font-weight-600 p-2 m-1 "
              key={i}
            >
              {x}
            </span>
          ))}

        {data.subpassion &&
          data.subpassion.map((x, i) => (
            <span
              className="badge badge-primary font-weight-600 p-2 m-1 "
              key={i}
            >
              {x}
            </span>
          ))}
      </div>
    </section>
    <section className="profile-about-card">
      <h5>Objectives</h5>
      <div className="">
        {data.objectives &&
          data.objectives.map((x, i) => (
            <span
              className="badge badge-primary font-weight-600 p-2 m-1 "
              key={i}
            >
              {x}
            </span>
          ))}
      </div>
    </section>
    <section className="profile-about-card">
      {/* <h5>Details</h5> */}
      <div className="row">
        <div className="col-sm-6"> Email: {data.email}</div>
        {data.links && data.links.website && (
          <div className="col-sm-6"> Website: {data.links.website}</div>
        )}
      </div>
    </section>
  </>
);

export default About;
