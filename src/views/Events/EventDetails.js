import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

// import ProgressBar from "react-bootstrap/ProgressBar";
// import Badge from "react-bootstrap/Badge";
import Modal from "react-bootstrap/Modal";
import Dropdown from "react-bootstrap/Dropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// import TimeAgo from "timeago-react";

// import SmProfile from "../../components/Common/smProfile";
import axios from "../../utils/axios";
import { getDate, getTime } from "../../utils";

import Loader from "../../components/Common/Loader";
import NotFound from "../NotFound";
import UserIcon from "../../components/Common/UserIcon";
import CopyInput from "../../components/Common/CopyInput";

class Project extends Component {
  state = {
    event: null,
    eventExists: true,
    hosts: [],
    cohosts: [],
    dataLoaded: false,
    showShare: false,
    showSchedule: false
  };

  componentDidMount() {
    axios
      .get(`event/${this.props.match.params.id}`)
      .then(res => {
        console.log(res);
        let hosts_ = [];
        let cohosts = [];
        const { hosts, ...rest } = res.data;

        hosts &&
          hosts.length > 0 &&
          hosts.map(item => {
            if (item.eventhost.role == "host") hosts_.push(item);
            else cohosts.push(item);
          });

        this.setState({
          hosts: hosts_,
          cohosts,
          event: rest,
          dataLoaded: true
        });
      })
      .catch(err => {
        if (err.response && err.response.status)
          this.setState({ eventExists: false });
        else console.log(err);
      });
  }
  handleOpen = () => {
    this.setState({ showSchedule: true });
  };
  handleClose = () => {
    this.setState({ showSchedule: false });
  };
  handleShareOpen = () => {
    this.setState({ showShare: true });
  };
  handleShareClose = () => {
    this.setState({ showShare: false });
  };
  render() {
    const { event, eventExists, dataLoaded, hosts, cohosts } = this.state;
    const { currentUser } = this.props;

    if (!eventExists) return <NotFound message="event" />;
    if (!dataLoaded) return <Loader className="mt-5 pt-5" />;

    return (
      <div className="container event-page">
        <div className="row h-100 pt-md-5 p-3">
          <div className="col-md-3 p-3 p-lg-4 bg-primary text-white">
            {event.image && (
              <img
                src={event.image}
                alt="event cover"
                className="event-image"
              />
            )}
            <h3 className="mb-3">{event.eventName}</h3>
            <div className="mt-4 ml-md-2">
              <div className="mb-3">
                <FontAwesomeIcon className="mr-3" icon="calendar-alt" />{" "}
                <span>{getDate(event.date)}</span>
              </div>
              <div className="mb-3">
                <FontAwesomeIcon className="mr-3" icon="clock" />{" "}
                <span>{getTime(event.date)}</span>
              </div>
              <div className="mb-3">
                <FontAwesomeIcon className="mr-3" icon="map-marker-alt" />{" "}
                <span>{event.venue}</span>
              </div>
            </div>
          </div>
          <div className="col-md-9 p-3 pl-md-5 p-md-4 bg-white d-flex flex-column justify-content-between">
            <div className="">
              <h5 className="font-weight-bold text-uppercase mb-2">About</h5>
              <p>{event.about}</p>
              {event.tags && (
                <>
                  <h5 className="font-weight-bold text-uppercase mt-3 mb-2">
                    Tags
                  </h5>
                  {event.tags.map((tag, idx) => (
                    <span
                      className="badge badge-primary font-weight-600 p-2 m-1"
                      key={idx}
                    >
                      {tag}
                    </span>
                  ))}
                </>
              )}
              <div className="row  mt-3">
                {hosts.length > 0 && (
                  <div className="col-md-6">
                    <h5 className="font-weight-bold text-uppercase mb-2">
                      Hosts
                    </h5>
                    <div class="d-flex flex-column mt-2">
                      {hosts.map((host, idx) => (
                        <Host host={host} key={idx} />
                      ))}
                    </div>
                  </div>
                )}

                {cohosts.length > 0 && (
                  <div className="col-md-6">
                    <h5 className="font-weight-bold text-uppercase mb-2">
                      Cohosts
                    </h5>
                    <div class="d-flex flex-column mt-2">
                      {cohosts.map((cohost, idx) => (
                        <Cohost cohost={cohost} key={idx} />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {event.schedule.length > 0 && (
                <div>
                  <button
                    type="button"
                    className="btn btn-secondary mt-3"
                    onClick={this.handleOpen}
                  >
                    View Schedule
                  </button>
                </div>
              )}
            </div>
            {currentUser.id == event.userId && (
              <div className="d-flex justify-content-end">
                <Link to={`/event/edit/${event.id}`} className="btn btn-info">
                  Edit
                </Link>
                <button
                  type="button"
                  className="btn btn-secondary ml-3 rounded-circle"
                  onClick={this.handleShareOpen}
                >
                  <FontAwesomeIcon icon="ellipsis-v" />
                </button>

                {/* <Dropdown 
        drop="top">
                  <Dropdown.Toggle
                    variant="dropdown"
                    aria-label="event options"
                  >
                    <FontAwesomeIcon icon="ellipsis-v" />
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={this.handleShareOpen}>
                      Share link
                    </Dropdown.Item>
                    <Dropdown.Divider />
                  </Dropdown.Menu>
                </Dropdown> */}
              </div>
            )}
          </div>
        </div>

        <Modal show={this.state.showSchedule} onHide={this.handleClose}>
          <Modal.Header className="bg-primary text-white" closeButton>
            <h5>Schedule</h5>
          </Modal.Header>
          <Modal.Body className="p-3 p-md-5">
            <Timeline
              schedule={event.schedule}
              length={event.schedule.length}
            />
          </Modal.Body>
        </Modal>

        <Modal show={this.state.showShare} onHide={this.handleShareClose}>
          <Modal.Header className="bg-primary text-white" closeButton>
            <h5>Copy Link</h5>
          </Modal.Header>
          <Modal.Body className="p-3 p-md-5">
            <CopyInput inputValue={`event/${event.id}`} />
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

const Timeline = ({ schedule, length }) => {
  return (
    <div className="timeline">
      {schedule.map((item, index) => (
        <div className="item" key={index}>
          {item.name} - {getTime(item.time)}
        </div>
      ))}
    </div>
  );
};

const Host = ({ host }) => (
  <Link className="m-2" to={`/profile/${host.id}`}>
    <div className="d-inline-flex align-items-center box-shadow p-2">
      <UserIcon size="2.2rem" iconSize="lg" url={host.profilepic} />
      <h6 className="ml-3">{host.fullname}</h6>
    </div>
  </Link>
);

const Cohost = ({ cohost }) => (
  <Link className="m-2" to={`/profile/${cohost.id}`}>
    <div className="d-inline-flex align-items-center box-shadow p-2">
      <UserIcon size="2.2rem" iconSize="lg" url={cohost.profilepic} />
      <h6 className="ml-3">{cohost.fullname}</h6>
    </div>
  </Link>
);

function mapStateToProps(state) {
  return { currentUser: state.auth.user };
}

export default connect(mapStateToProps)(Project);
