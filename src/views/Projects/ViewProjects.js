import React, { Component } from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import axios from "../../utils/axios";

import ProjectCard from "../../components/Common/ProjectCard";
import Loader from "../../components/Common/Loader";

const categories = ["trending", "recommended", "latest"];

const ProjectList = ({ data }) =>
  data.map((item, idx) => (
    <ProjectCard className="m-2" data={item} key={idx} />
  ));

class ViewProjects extends Component {
  state = {
    dataTrending: null,
    dataRecommended: null,
    dataLatest: null,
    isDataTrending: false,
    isDataRecommended: false,
    isDataLatest: false,
    dataLoaded: false,
    currentCategory: "trending"
  };

  componentDidMount() {
    axios
      .get("allprojects")
      .then(res => {
        if (res.data.trending.length > 0)
          this.setState({ isDataTrending: true });
        if (res.data.recommended.length > 0)
          this.setState({ isDataRecommended: true });
        if (res.data.latest.length > 0) this.setState({ isDataLatest: true });

        this.setState({
          dataTrending: res.data.trending,
          dataRecommended: res.data.recommended,
          dataLatest: res.data.latest,
          dataLoaded: true
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({
          dataLoaded: true
        });
      });
  }
  setCategory = currentCategory => {
    this.setState({ currentCategory });
  };
  render() {
    const {
      dataTrending,
      dataRecommended,
      dataLatest,
      isDataLatest,
      isDataRecommended,
      isDataTrending,
      currentCategory,
      dataLoaded
    } = this.state;
    return (
      <div className="pt-4">
        <div className="container">
          <div className="text-center py-3">
            {categories.map((item, idx) => (
              <button
                type="button"
                className={`${
                  item === currentCategory ? "btn-outline-info" : "btn-light"
                } btn rounded-pill text-capitalize m-2`}
                onClick={() => this.setCategory(item)}
                key={idx}
              >
                {item === currentCategory && <FontAwesomeIcon icon="check" />}{" "}
                {item}
              </button>
            ))}
          </div>
          {dataLoaded ? (
            <div className="d-flex flex-wrap justify-content-center mt-3">
              {currentCategory == "trending" && isDataTrending && (
                <ProjectList data={dataTrending} />
              )}

              {currentCategory == "recommended" && isDataRecommended && (
                <ProjectList data={dataRecommended} />
              )}

              {currentCategory == "latest" && isDataLatest && (
                <ProjectList data={dataLatest} />
              )}
              <Link
                to="/project/new"
                className="bg-white m-2 box-shadow rounded text-primary text-center"
                style={{ width: "200px", height: "120px", lineHeight: "120px" }}
              >
                Create a new Project
              </Link>
            </div>
          ) : (
            <Loader />
          )}
        </div>
      </div>
    );
  }
}

export default ViewProjects;
