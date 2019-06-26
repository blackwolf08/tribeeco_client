import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import ProfileCard from "../components/Common/ProfileCard";
import Loader from "../components/Common/Loader";

import axios from "../utils/axios";

const allFilters = [
  "all",
  "collaborators",
  "location",
  "interests",
  "projects",
  "profession"
];

class Connections extends React.Component {
  state = {
    loading: true,
    connections: [],
    noConnections: false,
    filter: "all",
    queryString: ""
  };
  componentDidMount() {
    axios
      .get("suggestions")
      .then(res => {
        if (res.data && res.data.length > 0) {
          this.setState({ connections: res.data, loading: false });
        } else {
          this.setState({ noConnections: true, loading: false });
        }
      })
      .catch(err => {
        console.log("err", err);
      });
  }

  selectFilter = filter => {
    if (this.state.filter === filter) {
      this.setState({ filter: "", connections: [] });
      return;
    }
    this.setState({ loading: true, filter: filter });
    let endpoint;
    if (filter === "all") endpoint = `suggestions`;
    else endpoint = `suggestions?filters=${filter}`;
    axios
      .get(endpoint)
      .then(res => {
        if (res.data && res.data.length > 0)
          this.setState({ connections: res.data, loading: false });
        else this.setState({ noConnections: true, loading: false });
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    const { loading, connections, filter, noConnections } = this.state;

    return (
      <div className="bg-white min-h">
        <div className="container py-5">
          <div className="text-center py-3">
            {allFilters.map((item, idx) => (
              <button
                type="button"
                className={`${
                  item === filter ? "btn-outline-info" : "btn-light"
                } btn rounded-pill text-capitalize m-2`}
                onClick={() => this.selectFilter(item)}
                key={idx}
              >
                {item === filter && <FontAwesomeIcon icon="check" />} {item}
              </button>
            ))}
          </div>

          <div className="d-flex flex-wrap justify-content-center align-items-baseline mt-3">
            {loading ? (
              <Loader />
            ) : noConnections ? (
              "No suggestions"
            ) : (
              connections.map((data, idx) => (
                <ProfileCard data={data} key={idx} showFollow={true} />
              ))
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Connections;
