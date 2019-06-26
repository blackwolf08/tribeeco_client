import React from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import axios from "../../utils/axios";
import styles from "../../styles/modules/SmProfileCard.module.scss";

import UserIcon from "../Common/UserIcon";

class ConnectionsProfile extends React.Component {
  handleClick = e => {
    const payload = {
      receiverId: this.props.id
    };
    axios
      .post("sendrequest", payload)
      .then(res => {
        this.props.removeItem(this.props.id);
      })
      .catch(err => {
        console.log(err);
      });
  };
  render() {
    const { name, headline, profilepic, id, style } = this.props;
    return (
      <div className={styles.card} style={style}>
        <div className="d-flex align-items-center">
          <UserIcon size="2rem" iconSize="lg" url={profilepic} />
          <div className="text-capitalize px-2">
            <Link to={`/profile/${id}`} className="link">
              <h6 className="font-weight-6 mb-1">{name}</h6>
            </Link>
            <h6 className="small">{headline}</h6>
            {/* <h6 className="text-muted">Full stack developer</h6> */}
          </div>
        </div>
        <button
          // className={`btn btn-light btn-sm ${
          //   this.state.sent ? styles.check : styles.plus
          // }`}
          className={`btn btn-light btn-sm ${styles.plus}`}
          onClick={this.handleClick}
          // disabled={this.state.sent}
        >
          <FontAwesomeIcon icon="plus" />
          {/* <FontAwesomeIcon icon={this.state.sent ? "check" : "plus"} /> */}
        </button>
      </div>
    );
  }
}

export default ConnectionsProfile;
