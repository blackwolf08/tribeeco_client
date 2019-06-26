import React from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// import axios from "../../utils/axios";
import styles from "../../styles/modules/SmProfileCard.module.scss";

//  REMOVE FROM COMMON AND MOVE INTO PROJECTS

class smProfileCard extends React.Component {
  state = {
    sent: false
  };

  componentDidMount() {
    this.setState({ sent: this.props.status === "sent" });
  }

  handleClick = () => {
    // this.props.handleClick(this.props.id);
    // this.props.handleClick(`members.`)
    // this.setState({sent:true})
  };
  render() {
    const { name, headline, image, id } = this.props;
    return (
      <div className={styles.card}>
        <div className="d-flex">
          <div className={styles.icon}>
            {image ? (
              <img src={image} alt="User Profile" />
            ) : (
              <FontAwesomeIcon icon="user" />
            )}
          </div>
          <div className={styles.text}>
            <Link to={`/profile/${id}`} className="link">
              <h6 className="font-weight-6">{name}</h6>
            </Link>
            <h6 className="small">{headline}</h6>
          </div>
        </div>
        <button
          className={`btn ${this.state.sent ? styles.check : styles.plus}`}
          onClick={this.handleClick}
          disabled={this.state.sent}
        >
          <FontAwesomeIcon icon={this.state.sent ? "check" : "plus"} />
        </button>
      </div>
    );
  }
}

export default smProfileCard;
