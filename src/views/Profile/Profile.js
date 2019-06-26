import React, { Component } from "react";
import { connect } from "react-redux";
import { Switch, Route, NavLink, Redirect, Link } from "react-router-dom";

import Badge from "react-bootstrap/Badge";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import axios from "../../utils/axios";
import Loader from "../../components/Common/Loader";
import { ROUTES } from "../../constants";

import About from "../../components/Profile/About";
import Experience from "../../components/Profile/Experience";
import PostsSection from "../../components/Profile/Posts";
import Projects from "../../components/Profile/Projects";

import UserPicture from "../../components/Profile/UserPicture";
import UserPictureEditable from "../../components/Profile/UserPictureEditable";

import NotFound from "../../views/NotFound";

class ProfilePage extends Component {
  state = {
    data: [],
    dataLoaded: false,
    userExists: true,
    requestSent: false
  };
  loadData() {
    this.setState({ dataLoaded: false });
    axios
      .get(`profile/${this.props.match.params.id}`)
      .then(res => {
        this.setState({ data: res.data, dataLoaded: true });
      })
      .catch(err => {
        if (err.response.status == 404) {
          this.setState({ userExists: false });
        }
        console.log(err.response);
      });
  }

  sendRequest = () => {
    const payload = {
      receiverId: this.props.match.params.id
    };
    axios
      .post("sendrequest", payload)
      .then(res => {
        console.log(res);
        this.setState({ requestSent: true });
      })
      .catch(err => {
        console.log(err);
      });
  };

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.loadData();
    }
  }
  render() {
    const { data, dataLoaded, requestSent, userExists } = this.state;
    const { match, location, currentUserId } = this.props;
    const currenUser = match.params.id == currentUserId;
    const userId = match.params.id;

    // console.log("connection_status", data.connection_status);
    const isConnected = data.connection_status == "connected";
    const isNotConnected = data.connection_status == null; // Change this from backend, null is kinda ambiguous
    const isRequestSent = data.connection_status == "sent";
    // Handle request received -> Add accept button

    if (!userExists) return <NotFound message="user" />;
    if (!dataLoaded) return <Loader className="mt-5 pt-5" />;

    if (location.pathname == `/profile/${userId}`)
      return <Redirect to={`/profile/${userId}/about`} />;

    return (
      <div className="profile container">
        <div className="row">
          <div className="col-lg-3">
            <div className="profile-sticky-left">
              <section className="profile-card card box-shadow mb-4">
                <div className="card-img-top">
                  {currenUser ? (
                    <UserPictureEditable url={data.profilepic} />
                  ) : (
                    <UserPicture url={data.profilepic} />
                  )}
                </div>
                <div className="card-body">
                  <h6 className="card-title">
                    {data.first_name + " " + data.last_name}
                  </h6>
                  <Badge variant="secondary">{data.tribe}</Badge>
                  <h6 className="small mt-1">{data.Professional_Headline}</h6>
                  <div className="small mt-1">
                    {/* <div>Member since 2017</div> */}
                    {data.location && (
                      <>
                        <FontAwesomeIcon icon="map-marker-alt" />{" "}
                        {data.location}
                      </>
                    )}
                  </div>

                  <div className="text-center">
                    {!currenUser && isConnected && (
                      <Link to={`/messages/${userId}`} className="btn btn-info">
                        Message
                      </Link>
                    )}

                    {!currenUser && !isConnected && isNotConnected && (
                      <button
                        type="button"
                        className="btn btn-sm btn-info rounded-pill mt-2"
                        onClick={this.sendRequest}
                        disabled={requestSent}
                      >
                        {requestSent ? "Request Sent" : "Connect"}
                      </button>
                    )}

                    {!isConnected && isRequestSent && "Request sent"}
                  </div>
                </div>
              </section>

              <section className="profile-about-card border-0 social-card mt-4">
                <h5 className="">Social Links</h5>

                <div className="">
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
              </section>
              {currenUser && (
                <div className="card box-shadow progress-card mb-4">
                  <div className="card-body">
                    <div className="text-muted text-center mb-3">
                      Answer more questions to complete your profile.
                    </div>
                    <Link
                      to="/profile/update"
                      className="d-block text-center mt-3 font-weight-bold link"
                    >
                      Complete Profile
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="col-lg-9">
            <div className="d-flex justify-content-center flex-wrap profile-tabs">
              <NavLink
                to={`${match.url}/about`}
                className="btn mb-2 mb-md-0"
                activeClassName="btn-outline-info"
              >
                <FontAwesomeIcon icon="check" />
                About
              </NavLink>
              <NavLink
                to={`${match.url}/experience`}
                className="btn mb-2 mb-md-0"
                activeClassName="btn-outline-info"
              >
                <FontAwesomeIcon icon="check" />
                Work Experience
              </NavLink>
              <NavLink
                to={`${match.url}/posts`}
                className="btn mb-2 mb-md-0"
                activeClassName="btn-outline-info"
              >
                <FontAwesomeIcon icon="check" />
                Posts
              </NavLink>
              <NavLink
                to={`${match.url}/projects`}
                className="btn mb-2 mb-md-0"
                activeClassName="btn-outline-info"
              >
                <FontAwesomeIcon icon="check" />
                Projects
              </NavLink>
            </div>
            <div className="mt-md-4 pl-md-3">
              <Switch>
                <Route
                  path={ROUTES.PROFILE_ABOUT}
                  render={() => <About data={data} />}
                  exact
                />
                <Route
                  path={ROUTES.PROFILE_EXPERIENCE}
                  render={() => <Experience data={data} />}
                  exact
                />
                <Route
                  path={ROUTES.PROFILE_POSTS}
                  component={PostsSection}
                  exact
                />
                <Route
                  path={ROUTES.PROFILE_PROJECTS}
                  component={Projects}
                  exact
                />
              </Switch>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const faMap = {
  Facebook: {
    name: "facebook-f",
    type: "fab"
  },
  Linkedin: {
    name: "linkedin-in",
    type: "fab"
  },
  Twitter: {
    name: "twitter",
    type: "fab"
  },
  Github: {
    name: "github",
    type: "fab"
  },
  Instagram: {
    name: "instagram",
    type: "fab"
  },
  Website: {
    name: "globe",
    type: "fa"
  }
};

function mapStateToProps(state) {
  return {
    currentUserId: state.auth.user.id
  };
}

export default connect(mapStateToProps)(ProfilePage);

/* <Card className="card-custom box-shadow mb-4">
              <div className="card-header">Honors/Achievements/Certifications</div>
              <div className="card-body">
                {[...Array(2)].map((x, i) => (
                  <div className="honor-card" key={i}>
                    <span className="text-dark h5">
                      Certificate Name {i + 1}
                    </span>
                    <h6 className="mt-2">October 2014, Organization Name</h6>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing.</p>
                  </div>
                ))}
              </div>
            </Card> */

/* 
            <div className="card card-custom box-shadow details-card mb-4">
              <div className="card-header">
                Details <hr />
              </div>
              <div className="card-body">
                <div>
                  <span>Rating:</span>
                  <span>
                    <FontAwesomeIcon icon="star" style={{ color: "#00bcd4" }} />
                    <FontAwesomeIcon icon="star" style={{ color: "#00bcd4" }} />
                    <FontAwesomeIcon icon="star" style={{ color: "#00bcd4" }} />
                    <FontAwesomeIcon icon="star" style={{ color: "#00bcd4" }} />
                    <FontAwesomeIcon icon="star" />
                    <Badge variant="info" className="ml-2 align-text-bottom">
                      {this.state.rating}
                    </Badge>
                  </span>
                </div>
              </div>
            </div>
            <div className="card card-custom box-shadow badge-card mb-4">
              <div className="card-header">
                Badges <hr />
              </div>
              <div className="card-body">
                <span>
                  <FontAwesomeIcon icon="magic" />
                </span>
                <span>
                  <FontAwesomeIcon icon="certificate" />
                </span>
                <span>
                  <FontAwesomeIcon icon="ribbon" size="lg" />
                </span>
                <span>
                  <FontAwesomeIcon icon="stroopwafel" size="lg" />
                </span>
              </div>
            </div>
           */
