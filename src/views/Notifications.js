import React, { Component } from "react";
import { Link } from "react-router-dom";
import Loader from "../components/Common/Loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import axios from "../utils/axios";

class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      accepted: [],
      isDataAvailable: true
    };
  }
  componentDidMount() {
    axios
      .get("notifications")
      .then(res => {
        if (res.data && res.data.length > 0)
          this.setState({
            data: res.data
          });
        else {
          this.setState({
            isDataAvailable: false
          });
        }
      })
      .catch(err => {
        console.log(err);
        this.setState({
          isDataAvailable: false
        });
      });
  }
  acceptRequest = (e, id, idx) => {
    const payload = {
      senderId: id
    };
    axios
      .patch("acceptrequest", payload)
      .then(res => {
        const accepted = [...this.state.accepted];
        accepted[idx] = true;
        this.setState({ accepted: accepted });
      })
      .catch(err => {
        console.log(err);
      });
  };
  render() {
    const { data, isDataAvailable } = this.state;

    return (
      <>
        <h4 className="text-center font-weight-bold pt-4 mb-4">
          Respond to your connection requests
        </h4>
        {this.state.data && this.state.data.length > 0 ? (
          this.state.data.map((x, idx) => (
            <div key={idx} className="notifications notifications-page">
              <div className="sm_profile__image">
                <FontAwesomeIcon icon="user" className="sm_profile__icon m-0" />
              </div>
              <div className="flex-grow-1 pl-2">
                <div className="">
                  <Link to={`/profile/${x.id}`} className="link">
                    {x.fullname}
                  </Link>
                </div>
                <button
                  type="button"
                  className="btn btn-sm btn-outline-info"
                  onClick={e => this.acceptRequest(e, x.id, idx)}
                  disabled={this.state.accepted[idx]}
                >
                  {this.state.accepted[idx] ? "Accepted" : "Accept"}
                </button>
              </div>
            </div>
          ))
        ) : this.state.isDataAvailable ? (
          <Loader />
        ) : (
          <div className="p-4 text-center">No notifications yet.</div>
        )}
      </>
    );
  }
}

export default Notification;
