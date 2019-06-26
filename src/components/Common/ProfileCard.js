import React, { useState } from "react";
import { Link } from "react-router-dom";

import axios from "../../utils/axios"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "../../styles/modules/ProfileCard.module.scss";

import UserIcon from "./UserIcon";

const Profile = ({ data, showFollow }) => {
  const [sent, setSent] = useState(false);

  const sendRequest = () => {
    const payload = {
      receiverId: this.props.match.params.id
    };
    axios
      .post("sendrequest", payload)
      .then(res => {
        console.log(res);
        setSent(true)
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div className={styles.card}>
      <div className={styles.image}>
        <UserIcon size="7rem" iconSize="5x" url={data.profilepic} />
      </div>
      <div className="card-body p-2 text-center">
        <Link to={`/profile/${data.id}`}>
          <h5 className={styles.h5}>{data.fullname}</h5>
        </Link>
        {/* <h6>{data.Professional_Headline}</h6> */}
        <div className="my-1">
          {/* {data.socialLinks &&
          data.socialLinks.map(
            (x, idx) =>
              x.link && (
                <a href={x.link} key={idx} className={styles.link}>
                  <FontAwesomeIcon icon={[x.type, x.name]} />
                </a>
              )
          )} */}
        </div>
      </div>
      {showFollow && (
        <div className="card-footer bg-white text-center">
          <button
            type="button"
            className="btn btn-info rounded-pill"
            onClick={sendRequest}
            disabled={sent}
          >
            Connect
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;
