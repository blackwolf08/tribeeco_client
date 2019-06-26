import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Experience = ({ data }) => {
  return (
    <>
      {data.experience && data.experience.length > 0 ? (
        data.experience.map((item, index) => (
          <section className="profile-about-card p-3" key={index}>
            <ExperienceDetails item={item} />
          </section>
        ))
      ) : (
        <div className="profile-about-card">No work Experience</div>
      )}
    </>
  );
};

class ExperienceDetails extends React.Component {
  render() {
    const { item } = this.props;

    let startDate = new Date(item.startDate);
    startDate = startDate.toLocaleString("en-us", {
      month: "long",
      year: "numeric"
    });

    let endDate = new Date(item.endDate);
    endDate = startDate.toLocaleString("en-us", {
      month: "long",
      year: "numeric"
    });
    // console.log("item", item);
    return (
      <>
        <h4 className="font-bold-600">{item.title}</h4>
        <div>{item.company}</div>
        {item.current ? (
          <>{startDate}- Present </>
        ) : (
          <>
            {startDate} - {endDate}
          </>
        )}
        <div className="text-muted">{item.location}</div>
        <div className="small">{item.description}</div>
      </>
    );
  }
}

export default Experience;
