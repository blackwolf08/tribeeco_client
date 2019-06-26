import React, { Component } from "react";
import { Link } from "react-router-dom";
import project from "../../assets/project.svg";

class Projects extends Component {
  render() {
    return (
      <>
        <div className="p-3 p-md-4">
          <div className="container">
            <h3 className="font-bold">Projects</h3>
            <h5 className="my-4">
              Contemporary business and science treat as a project ny
              undertaking, carried out individually or collaboraively and
              possibly involving research or design, that is carefully planned
              to achive a particular aim.
            </h5>
          </div>
        </div>
        <div className="container">
          <div className="row p-3">
            <div className="col-md-6 py-5 p-md-5">
              <img src={project} alt="Working" />
            </div>
            <div className="col-md-6 text-center py-5">
              <h3 className="font-bold">
                Start creating your masterpiece or look for existing ones.
              </h3>
              <div className="py-4">
                <Link
                  to="/project/new"
                  className="btn btn-info btn-lg btn-project text-white rounded-pill btn-block"
                >
                  Create a new Project
                </Link>
                <Link
                  to="/projects/list"
                  className="btn btn-outline-dark btn-lg btn-project rounded-pill btn-block"
                >
                  View an existing Project
                </Link>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Projects;
