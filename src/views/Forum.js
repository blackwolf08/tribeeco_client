import React, { Component } from "react";
// import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import UserIcon from "./../components/Common/UserIcon";
// import axios from "./../utils/axios";

import Loader from "./../components/Common/Loader";

class Project extends Component {
  state = {
    // data: null
    data: []
  };
  componentDidMount() {
    //     axios
    //       .get(`forum/${this.props.match.params.id}`)
    //       .then(res => {
    //         this.setState({
    //           data: res.data
    //         });
    //       })
    //       .catch(err => {
    //         console.log(err);
    //       });
  }
  render() {
    const { data } = this.state;
    if (data)
      return (
        <div className="min-h">
          <div className="p-2 p-md-3">
            <button
              type="button"
              className="btn"
              onClick={this.props.history.goBack}
            >
              <FontAwesomeIcon
                icon="arrow-left"
                className="arrow-back"
                size="lg"
              />
            </button>
            <span className="h4 ml-4 font-weight-bold">
              Project Name | Forum
            </span>
          </div>
          <div className="container">
            <div className="card box-shadow scroll-y h-max-75">
              <div className="card-body">
                <h4 className="mb-4">Forum</h4>
                {[...Array(8)].map((x, idx) => (
                  <div key={idx} className="mb-4">
                    <div className="d-flex align-items-center">
                      <UserIcon size="2rem" className="mr-3" />
                      <h6 className="mb-0 mr-3 font-weight-bold">
                        Team Member
                      </h6>
                      <h6 className="mb-0 small text-muted">6:17PM</h6>
                    </div>
                    <p className="ml-5 mt-2">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Nunc quis nunc mattis, pulvinar urna ac, ultricies enim.
                      Integer non enim quis nisi congue egestas. Aliquam eu
                      tincidunt leo, lacinia egestas ex.
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      );
    else
      return (
        <div className="min-h d-flex align-items-center">
          <Loader />
        </div>
      );
  }
}

export default Project;
