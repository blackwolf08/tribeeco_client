import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import ContentLoader from "react-content-loader";
import { Transition } from "react-spring/renderprops";

import Profile from "./ConnectionsProfile.js";

import axios from "../../utils/axios";

const ConnectionLoader = () => (
  <div className="bg-white p-4">
    <ContentLoader
      height={60}
      width={360}
      speed={2}
      ariaLabel="Loading Connections"
      primaryColor="#f3f3f3"
      secondaryColor="#ecebeb"
    >
      <rect x="70" y="8.57" rx="4" ry="4" width="218.79" height="11.97" />
      <rect x="70" y="30.93" rx="3" ry="3" width="210" height="10.18" />
      <circle cx="30" cy="30" r="30" />
      <rect x="303.69" y="-0.33" rx="0" ry="0" width="56" height="52" />
      <rect x="107.69" y="35.67" rx="0" ry="0" width="0" height="0" />
    </ContentLoader>
  </div>
);

const Connections = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("suggestions")
      .then(res => {
        setList(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);
  const removeItem = id => {
    let newList = list.filter(item => item.id !== id);
    setList(newList);
  };
  if (loading)
    return (
      <>
        <ConnectionLoader /> <ConnectionLoader />
      </>
    );
  return (
    <div className="card card-custom box-shadow mb-3 dashboard-connections">
      <div className="card-header">
        Suggested Connections
        <hr />
      </div>
      <div className="card-body">
        {list.length > 0 ? (
          <Transition
            items={list.slice(0, 5)}
            keys={item => item.id}
            enter={{ opacity: 1, transform: "translateX(0px)" }}
            leave={{ opacity: 0, transform: "translateX(20px)" }}
          >
            {item => props => (
              <Profile
                style={props}
                key={item.id}
                name={item.fullname}
                headline={item.professional_headline}
                id={item.id}
                status={item.connection_status}
                profilepic={item.profilepic}
                removeItem={removeItem}
              />
            )}
          </Transition>
        ) : (
          "No suggestions"
        )}

        <Link to="/connections" className="d-block mt-3 font-weight-bold link">
          View All Suggestions
        </Link>
      </div>
    </div>
  );
};

export default Connections;
