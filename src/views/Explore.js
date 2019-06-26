import React, { Component } from "react";

import TimeAgo from "timeago-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Loader from "../components/Common/Loader";
import Post from "../components/Dashboard/Post";

import axios from "../utils/axios";

const InternetItem = ({ data }) => (
  <div className="profile-about-card">
    <div className="text-uppercase">
      <a
        href={data.link}
        className="text-underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        {data.title}
      </a>
    </div>
    <div className="small">
      <TimeAgo live={false} datetime={data.pubDate} /> by {data.publisher}
    </div>
  </div>
);

const ProjectItem = ({ data }) => (
  <div className="mb-3">
    <div>Project Name {data}</div>
    <div className="text-muted">Long Description {data}</div>
  </div>
);

const NoDataAvailable = (
  <div className="card box-shadow bg-white p-3">No related posts found</div>
);

const PostsList = ({ type, localPosts, dataInternet }) => {
  if (type == "explorelocal") {
    return localPosts.length > 0
      ? localPosts.slice(0, 10).map((x, idx) => <Post key={idx} data={x} />)
      : NoDataAvailable;
  }

  return dataInternet.length > 0
    ? dataInternet
        .slice(0, 10)
        .map((x, idx) => <InternetItem key={idx} data={x} />)
    : NoDataAvailable;
};

class Explore extends Component {
  state = {
    type: "explorelocal",
    localPosts: [],
    dataInternet: [],
    dataLoading: true,
    localProjects: []
  };
  getData = type => {
    this.setState({ dataLoading: true });
    axios
      .get(`${type}/${this.props.match.params.id}`)
      .then(res => {
        console.log(type, res.data.relatedPosts);
        if (type == "explorelocal")
          this.setState({
            localPosts: res.data.relatedPosts,
            localProjects: res.data.relatedProjects
          });
        else
          this.setState({
            dataInternet: res.data
          });
        this.setState({ dataLoading: false });
      })
      .catch(err => {
        this.setState({ dataLoading: false });
        console.log(err);
      });
  };

  componentDidMount() {
    this.getData("explorelocal");
  }
  setType = type => {
    if (this.state.type !== type) {
      this.setState({ type });
      this.getData(type);
    }
  };

  render() {
    const {
      type,
      localPosts,
      localProjects,
      dataInternet,
      dataLoading
    } = this.state;
    return (
      <div className="container pt-3">
        <div className="d-flex justify-content-center my-3 text-uppercase">
          <button
            type="button"
            className={`btn px-4 py-2 bg-white rounded-pill text-primary mx-2 ${type ===
              "explorelocal" && "btn-outline-info"}`}
            onClick={() => this.setType("explorelocal")}
          >
            {type === "explorelocal" && <FontAwesomeIcon icon="check" />} {"  "}
            Tribeeco
          </button>
          <button
            type="button"
            className={`btn px-4 py-2 bg-white rounded-pill text-primary mx-2 ${type ===
              "explore" && "btn-outline-info"}`}
            onClick={() => this.setType("explore")}
          >
            {type === "explore" && <FontAwesomeIcon icon="check" />} {"  "}
            Internet
          </button>
        </div>
        {dataLoading ? (
          <Loader />
        ) : (
          <div className="row">
            {type == "explorelocal" ? (
              <>
                <div className="col-md-8 px-md-4">
                  <PostsList
                    loading={dataLoading}
                    type={type}
                    localPosts={localPosts}
                    dataInternet={dataInternet}
                  />
                </div>
                <div className="col-md-4">
                  <div className="card p-0 card-custom card-fade mb-3 box-shadow">
                    <div className="card-header">
                      Trending Projects <hr />
                    </div>
                    <div className="card-body">
                      {localProjects.length > 0
                        ? localProjects.map((x, idx) => (
                            <ProjectItem data={x} key={idx} />
                          ))
                        : "No related projects found."}
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="col-md-8 offset-md-2 pt-3">
                <PostsList
                  loading={dataLoading}
                  type={type}
                  localPosts={localPosts}
                  dataInternet={dataInternet}
                />
              </div>
            )}

            {/* <div className="col-md-4"> */}
            {/* {type === "explorelocal" && (
              <div className="card p-0 card-custom card-fade mb-3 box-shadow">
                <div className="card-header">
                  Trending Projects <hr />
                </div>
                <div className="card-body">
                  {[...Array(4)].map((x, idx) => (
                    <ProjectItem data={x} key={idx} />
                  ))}
                </div>
              </div>
            )} */}

            {/* <div className="card p-0 card-custom card-fade box-shadow">
              <div className="card-header">
                Related Topics <hr />
              </div>
              <div className="card-body">
                {[...Array(4)].map((x, idx) => (
                  <button
                    type="button"
                    className="btn btn-info btn-sm m-2"
                    key={idx}
                  >
                    Tag {idx}
                  </button>
                ))}
              </div>
            </div> 
            </div>*/}
          </div>
        )}
      </div>
    );
  }
}

export default Explore;
