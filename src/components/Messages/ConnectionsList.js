import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

import "react-perfect-scrollbar/dist/css/styles.css";
import Scrollbar from "react-perfect-scrollbar";

import matchSorter from "match-sorter";

import UserIcon from "../Common/UserIcon";

const Connection = ({ data }) => (
  <NavLink
    to={`/messages/${data.id}`}
    className="connection d-flex align-items-center justify-content-start my-1 p-1"
  >
    <UserIcon size="2.5rem" iconSize="lg" />
    <div className="ml-3">
      <div className="">{data.fullname}</div>
    </div>
  </NavLink>
);

const onInputChange = (e, users, setUsers) => {
  let newUsers = e.target.value
    ? matchSorter(users, e.target.value, {
        keys: ["fullname"],
        threshold: matchSorter.rankings.WORD_STARTS_WITH
      })
    : users;
  console.log(users, newUsers);
  setUsers(newUsers);
};
const ConnectionsList = ({ users }) => {
  const [filteredUsers, setUsers] = useState(users);
  useEffect(() => {
    setUsers(users);
  }, [users]);

  return (
    <div className="bg-white box-shadow rounded overflow-hidden h-100">
      <h6 className="p-3 text-center mb-0 font-weight-bold text-uppercase">
        Connections
      </h6>
      <input
        type="text"
        placeholder="Search connections"
        name="query"
        className="form-control"
        autoComplete="off"
        onChange={e => onInputChange(e, users, setUsers)}
      />
      {users.length > 0 ? (
        <Scrollbar className="p-3" style={{ maxHeight: "85%" }}>
          {filteredUsers.map((item, idx) => (
            <Connection data={item} key={idx} />
          ))}
        </Scrollbar>
      ) : (
        <p className="text-center mt-4">No connections</p>
      )}
    </div>
  );
};

export default ConnectionsList;
