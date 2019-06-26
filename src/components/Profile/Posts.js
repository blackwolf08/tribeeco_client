import React, { Component } from "react";

import Posts from "../../components/Dashboard/Posts";
import Loader from "../Common/Loader";

import axios from "../../utils/axios";

class PostsSection extends Component {
  state = {
    posts: [],
    loading: true
  };
  componentDidMount() {
    console.log("Posts Section", this.props);
    axios
      .get(`posts/${this.props.match.params.id}`)
      // .get(`feed/tribe`)
      .then(res => {
        this.setState({
          posts: res.data,
          loading: false
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({
          loading: false
        });
      });
  }

  render() {
    const { posts, loading } = this.state;

    if (loading) return <Loader />;

    return (
      <>
        {posts.length > 0 ? (
          <div style={{ maxWidth: 550, margin: "0 auto" }}>
            <Posts feed={posts} loaded />
          </div>
        ) : (
          <div className="profile-about-card">No posts yet</div>
        )}
      </>
    );
  }
}

export default PostsSection;
