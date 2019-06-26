import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Transition } from "react-spring/renderprops";

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import axios from "../../utils/axios";
// import socket from "../../utils/socket";

import UserIcon from "../Common/UserIcon";
import Loader from "../Common/Loader";

import {
  fetchNotifications,
  // onNotification,
  acceptConnectionReq,
  acceptProjectReq
} from "../../actions";

class NotificationMenu extends Component {
  state = {
    accepted: []
  };

  // componentDidMount() {
  //   socket.connect();
  //   console.log("socket on");

  //   socket.emit("connectUser", { userId: this.props.userId });

  //   socket.on("incomingNotification", notification => {
  //     console.log("notification");
  //     console.log("notification", notification);
  //     // this.props.dispatch(onNotification(notification));
  //   });
  // }
  componentDidUpdate(prevProps) {
    if (this.props.opened !== prevProps.opened) {
      if (this.props.opened) {
        this.props.fetch();
      }
    }
  }

  // componentWillUnmount() {
  //   socket.close();
  // }
  render() {
    const { notificationsById, isFetching } = this.props.notifications;

    let notifications = Object.values(notificationsById);
    let hasNotifications = notifications.length > 0;

    if (isFetching) return <Loader />;

    if (!hasNotifications)
      return <div className="p-4 text-center">No Notifications</div>;

    return (
      <>
        <Transition
          items={notifications.slice(0, 5)}
          keys={item => item.index}
          enter={{ opacity: 1 }}
          leave={{ opacity: 0, transform: "translateX(20px)" }}
        >
          {item => props => (
            <Notification
              key={item.id}
              item={item}
              style={props}
              acceptRequest={this.props.acceptRequest}
              acceptProjectRequest={this.props.acceptProjectRequest}
            />
          )}
        </Transition>
        <div className="text-center bg-secondary p-2">
          {/* <Link to="/notifications" className="link">
            All Notifications
          </Link> */}
        </div>
      </>
    );
  }
}

const Notification = ({ item, style, acceptProjectRequest, acceptRequest }) => {
  if (item.projectId)
    return (
      <div className="notifications" style={style}>
        <UserIcon
          size="2rem"
          iconSize="lg"
          url={item.project.user.profilepic}
        />
        <div className="flex-grow-1 pl-2">
          <div className="">
            <span>
              <Link className="link" to={`/profile/${item.project.user.id}`}>
                {item.project.user.fullname}
              </Link>{" "}
              wants you to be a {item.role} of{" "}
              <Link className="link" to={`/project/${item.project.id}`}>
                {item.project.title}
              </Link>
            </span>
            )
          </div>

          <button
            type="button"
            className="btn btn-sm btn-outline-info"
            onClick={() => acceptProjectRequest(item.projectId, item.index)}
          >
            Accept
          </button>
        </div>
      </div>
    );

  if (item.senderId)
    return (
      <div className="notifications" style={style}>
        <UserIcon size="2rem" iconSize="lg" url={item.user.profilepic} />
        <div className="flex-grow-1 pl-2">
          <div className="">
            <Link className="link" to={`/profile/${item.senderId}`}>
              {item.user.fullname}
            </Link>
          </div>

          <button
            type="button"
            className="btn btn-sm btn-outline-info"
            onClick={() => acceptRequest(item.senderId, item.index)}
          >
            Accept
          </button>
        </div>
      </div>
    );

  if (item.hasOwnProperty("status"))
    return (
      <div className="notifications" style={style}>
        <UserIcon size="2rem" iconSize="lg" url={item.user.profilepic} />

        <div className="flex-grow-1 pl-2">
          <Link className="link" to={`/profile/${item.user.id}`}>
            {item.user.fullname}
          </Link>{" "}
          marked your post as {item.status ? "relevant" : "irrelevant"}.
        </div>
      </div>
    );

  return (
    <div className="notifications" style={style}>
      <UserIcon size="2rem" iconSize="lg" url={item.user.profilepic} />

      <div className="flex-grow-1 pl-2">
        <Link className="link" to={`/profile/${item.user.id}`}>
          {item.user.fullname}
        </Link>{" "}
        commented on your post.
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    notifications: state.notifications,
    userId: state.auth.user.id
  };
}
function mapDispatchToProps(dispatch) {
  return {
    acceptRequest: (senderId, index) =>
      dispatch(acceptConnectionReq(senderId, index)),

    acceptProjectRequest: (projectId, index) =>
      dispatch(acceptProjectReq(projectId, index)),

    fetch: () => dispatch(fetchNotifications())
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationMenu);
