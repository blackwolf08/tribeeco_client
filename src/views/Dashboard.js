import React from "react";
import { connect } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Connections from "../components/Dashboard/Connections";
import Projects from "../components/Dashboard/Projects";
import Events from "../components/Dashboard/Events";
import Posts from "../components/Dashboard/Posts";
import Post from "../components/Dashboard/Post.js";
import CreatePost from "../components/Dashboard/CreatePost";

import axios from "../utils/axios";
import { fetchFeed } from "../actions";

class Dashboard extends React.Component {
  state = {
    tribeData: [],
    followingData: [],
    feedLoaded: false,
    projects: [],
    projectsLoaded: false,
    newPosts: [],
    feedType: "recommendedFeed"
  };
  addPostToFeed = post => {
    let newPosts = [...this.state.newPosts];
    newPosts.unshift(post);
    this.setState({ newPosts });
  };
  componentDidMount() {
    this.props.dispatch(fetchFeed("recommendedFeed"));
    axios
      .get("allprojects")
      .then(res => {
        this.setState({ projects: res.data.trending, projectsLoaded: true });
      })
      .catch(err => {
        this.setState({ projectsLoaded: true });
        console.log(err);
      });
  }
  toggleFeed = type => {
    if (this.state.feedType !== type) {
      this.props.dispatch(fetchFeed(type));
      this.setState({ feedType: type, newPosts: [] });
    }
  };

  render() {
    const { newPosts, feedType } = this.state;
    const {
      recFetching,
      follFetching,
      recommendedFeed,
      followedFeed
    } = this.props.posts;
    const isRecFeed = feedType == "recommendedFeed";

    return (
      <div className="container dashboard pt-3 p-md-3">
        <div className="row">
          <div className="col-lg-3 px-2">
            <Connections />
          </div>

          <div className="col-lg-6 px-2">
            <CreatePost addPostToFeed={this.addPostToFeed} />
            <div className="d-flex justify-content-center mb-3">
              <button
                type="button"
                className={`btn btn-outline-info rounded-pill text-uppercase mx-2 ${isRecFeed &&
                  "btn-info"}`}
                onClick={() => this.toggleFeed("recommendedFeed")}
              >
                {this.props.tribe}
                {isRecFeed && <FontAwesomeIcon icon="check" className="ml-3" />}
              </button>
              <button
                type="button"
                className={`btn btn-outline-info rounded-pill text-uppercase mx-2 mt-0 ${!isRecFeed &&
                  "btn-info"}`}
                onClick={() => this.toggleFeed("followedFeed")}
              >
                Following
                {!isRecFeed && (
                  <FontAwesomeIcon icon="check" className="ml-3" />
                )}
              </button>
            </div>

            {newPosts.length > 0 &&
              isRecFeed &&
              newPosts.map(item => <Post data={item} key={item.id} />)}

            {isRecFeed ? (
              <Posts loaded={!recFetching} feed={recommendedFeed} />
            ) : (
              <Posts loaded={!follFetching} feed={followedFeed} />
            )}
          </div>
          <div className="col-lg-3 px-2">
            <Projects
              loaded={this.state.projectsLoaded}
              list={this.state.projects}
            />
            <Events />
          </div>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    tribe: state.auth.user.tribe,
    posts: state.posts
  };
}

export default connect(mapStateToProps)(Dashboard);
