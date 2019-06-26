import React, { Component } from "react";
import { connect } from "react-redux";

import Badge from "react-bootstrap/Badge";
import TimeAgo from "timeago-react";

import SmProfile from "../../components/Common/smProfile";
import axios from "../../utils/axios";

import Loader from "../../components/Common/Loader";
import NotFound from "../NotFound";

class Project extends Component {
  state = {
    data: null,
    userData: null,
    memberData: [],
    socialLinks: [],
    projectExists: true,
    dataLoaded: false
  };
  componentDidMount() {
    axios
      .get(`project/${this.props.match.params.id}`)
      .then(res => {
        let socialLinks = res.data.project.socialLinks;

        console.log("this.state.", this.state.dataLoaded);

        this.setState({
          data: res.data.project,
          userData: res.data.project.user,
          memberData: res.data.members,
          socialLinks,
          dataLoaded: true
        });
      })
      .catch(err => {
        if (err.response && err.response.status == 404)
          this.setState({ projectExists: false });
        else console.log(err);
      });
  }
  render() {
    const {
      data,
      userData,
      memberData,
      socialLinks,
      projectExists,
      dataLoaded
    } = this.state;
    const { currentUser } = this.props;

    if (!projectExists) return <NotFound message="project" />;
    if (!dataLoaded) return <Loader className="mt-5 pt-5" />;

    return (
      <div className="container">
        <div className="row pt-2">
          <div className="col-md-7 p-3 p-md-3 project_details">
            <div className="card-custom box-shadow bg-white p-3 p-md-3">
              <h4 className="my-2 mb-3">{data.title}</h4>
              <p className="text-muted mb-3">
                by {userData.fullname}{" "}
                <TimeAgo live={false} datetime={data.createdAt} />
              </p>
              <div>
                {data.file && (
                  <img
                    src={data.file}
                    alt="project cover"
                    style={{ width: "auto", maxWidth: "100%" }}
                  />
                )}
              </div>
              <p className="">{data.vision}</p>

              <p className="my-3 space-pre">{data.body}</p>

              {socialLinks.length > 0 && (
                <>
                  <h5>Find out more at:</h5>
                  <p>
                    {socialLinks.map((x, idx) => (
                      <div key={idx} className="my-1">
                        {x.name} :
                        <a
                          href={x.url}
                          className="link ml-1"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {x.url}
                        </a>
                      </div>
                    ))}
                  </p>
                </>
              )}
            </div>
          </div>
          <div className="col-md-5 p-3 p-md-3">
            <div className="card card-custom box-shadow">
              <h5 className="card-header">
                Team Members <hr />
              </h5>
              <div
                className="card-body d-flex flex-column flex-wrap"
                style={{ maxHeight: "450px" }}
              >
                {memberData.length > 0
                  ? currentUser.id == data.userId
                    ? memberData.map(x => (
                        <SmProfile
                          key={x.id}
                          name={x.user.fullname}
                          headline={x.role}
                          id={x.user.id}
                          image={x.user.profilepic}
                          style={{
                            opacity: x.status === "connected" ? 1 : 0.5
                          }}
                        />
                      ))
                    : memberData
                        .filter(item => item.status === "connected")
                        .map(x => (
                          <SmProfile
                            key={x.id}
                            name={x.user.fullname}
                            headline={x.role}
                            id={x.user.id}
                            image={x.user.profilepic}
                          />
                        ))
                  : "No members"}
              </div>
            </div>
            {data.tags && (
              <div className="card card-custom box-shadow mt-4">
                <h5 className="card-header">
                  Tags <hr />
                </h5>

                <div className="card-body">
                  {data.tags.map((x, i) => (
                    <Badge pill variant="primary p-2 m-1" key={i}>
                      {x}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { currentUser: state.auth.user };
}

export default connect(mapStateToProps)(Project);
