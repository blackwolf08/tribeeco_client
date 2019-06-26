import React, { Component } from "react";

import { Link } from "react-router-dom";

import ProgressBar from "react-bootstrap/ProgressBar";
import Badge from "react-bootstrap/Badge";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import axios from "../../utils/axios";

import UserPictureEditable from "../../components/Profile/UserPictureEditable";
import Loader from "../../components/Common/Loader";
import Posts from "../../components/Dashboard/Posts";

class MyProfile extends Component {
  state = {
    data: [],
    dataLoaded: false,
    projects: [],
    posts: []
  };
  loadData() {
    this.setState({ dataLoaded: false });
    axios
      .get(`myprofile`)
      .then(res => {
        this.setState({ data: res.data, dataLoaded: true });
      })
      .catch(err => {
        console.log(err);
      });
    axios
      .get(`posts/${this.props.id}`)
      .then(res => {
        this.setState({
          posts: res.data
        });
      })
      .catch(err => {
        console.log(err);
      });

    axios
      .get("myprojects")
      .then(res => {
        this.setState({
          projects: res.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
  componentDidMount() {
    this.loadData();
  }

  render() {
    const { projects, data, dataLoaded, posts } = this.state;

    if (!dataLoaded) return <Loader className="mt-5 pt-5" />;

    return (
      <div className="profile p-4 container">
        <div className="row">
          <div className="col-lg-3">
            <div className="profile-sticky-left">
              <div className="profile-card card box-shadow mb-4">
                <div className="card-img-top">
                  <UserPictureEditable url={data.profilepic} />
                </div>
                <div className="card-body">
                  <h6 className="card-title">
                    {data.first_name + " " + data.last_name}
                  </h6>
                  <h6 className="small">{data.headline}</h6>
                  <Badge variant="warning">{data.tribe}</Badge>
                  <div className="small">
                    {/* <div>Member since 2017</div> */}
                    {data.location && (
                      <div>
                        <FontAwesomeIcon icon="map-marker-alt" />{" "}
                        {data.location}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="card card-custom box-shadow about-card mb-4">
                <div className="card-header">
                  About <hr />
                </div>
                <div className="card-body">{data.about}</div>
              </div>
              <div className="card card-custom box-shadow social-card">
                <div className="card-header">
                  Social Links <hr />
                </div>
                <div className="card-body">
                  {data.links &&
                    Object.keys(data.links).map(
                      (x, idx) =>
                        data.links[x] && (
                          <a
                            href={data.links[x]}
                            key={idx}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <FontAwesomeIcon
                              icon={[faMap[x].type, faMap[x].name]}
                              size="lg"
                            />
                          </a>
                        )
                    )}
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            {posts.length > 0 ? (
              <Posts feed={posts} loaded />
            ) : (
              <div className="mt-5 text-center">No posts yet.</div>
            )}
          </div>
          <div className="col-lg-3">
            <div className="profile-sticky-right">
            
              <div className="card box-shadow progress-card mb-4">
                <div className="card-body">
                  <div className="text-muted text-center mb-3">
                    Answer more questions to complete your profile.
                  </div>
                  {/* <div className="progress-line">
                  <span>80%</span>
                  <ProgressBar now={80} variant="success" />
                </div> */}
                  <Link
                    to="/profile/update"
                    className="d-block text-center mt-3 font-weight-bold link"
                  >
                    Complete Profile
                  </Link>
                </div>
              </div>

              <div className="card card-custom box-shadow mb-4">
                <div className="card-header">
                  Interests <hr />
                </div>
                <div className="card-body">
                  <h5>
                    {data.interests ? (
                      data.interests.map((x, i) => (
                        <Badge variant="info p-2 m-1" key={i}>
                          {x}
                        </Badge>
                      ))
                    ) : (
                      <span>No interests yet.</span>
                    )}
                  </h5>
                </div>
              </div>

              <div className="card card-custom box-shadow mb-4 mt-4 mt-md-0">
                <div className="card-header">
                  Projects <hr />
                </div>
                <div className="card-body pt-4">
                  {projects &&
                    projects.slice(0, 6).map((x, i) => (
                      <Link to={`/project/${x.id}`} key={i}>
                        <div className="project-card">
                          <h6 className="h6">{x.title}</h6>
                        </div>
                      </Link>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const faMap = {
  facebook: {
    name: "facebook-f",
    type: "fab"
  },
  linkedin: {
    name: "linkedin-in",
    type: "fab"
  },
  twitter: {
    name: "twitter",
    type: "fab"
  },
  github: {
    name: "github",
    type: "fab"
  },
  instagram: {
    name: "instagram",
    type: "fab"
  },
  website: {
    name: "globe",
    type: "fa"
  }
};

export default MyProfile;
