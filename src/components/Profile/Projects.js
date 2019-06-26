import React, { Component } from "react";
import { Link } from "react-router-dom";

import axios from "../../utils/axios";

import Loader from "../Common/Loader";

class PostsSection extends Component {
  state = {
    projects: [],
    loading: true
  };
  componentDidMount() {
    console.log("Projects Section", this.props);
    axios
      .get(`projects/${this.props.match.params.id}`)
      .then(res => {
        this.setState({
          projects: res.data,
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
    const { projects, loading } = this.state;

    return (
      <>
        {loading ? (
          <Loader />
        ) : (
          <div className="profile-about-card">
            <h5 className="">Projects</h5>
            <div className="">
              {projects.length > 0
                ? projects.slice(0, 6).map((x, i) => (
                    <Link to={`/project/${x.id}`} key={i}>
                      <div className="project-card">
                        <h6 className="h6">{x.title}</h6>
                        <p>{x.vision}</p>
                      </div>
                    </Link>
                  ))
                : "No projects"}
            </div>
          </div>
        )}
      </>
    );
  }
}

export default PostsSection;
