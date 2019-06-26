import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";

import UserIcon from "../Common/UserIcon";
import Loader from "../Common/Loader";
import axios from "../../utils/axios";

import styles from "../../styles/modules/Post.module.scss";

import TimeAgo from "timeago-react";

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
      liked: this.props.data.liked,
      showComments: false,
      // likeCount: this.props.data.likes.length,
      comment: "",
      // commentCount: this.props.data.comments.length,
      comments: null,
      commentsLoaded: false
    };
  }
  handleLike = e => {
    axios
      .post(`like/${this.state.data.id}`, {})
      .then(res => {
        if (this.state.liked) {
          this.setState(prevState => ({
            liked: false,
            likeCount: prevState.likeCount - 1
          }));
        } else {
          this.setState(prevState => ({
            liked: true,
            likeCount: prevState.likeCount + 1
          }));
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  openComments = e => {
    axios.get(`comments/${this.state.data.id}`).then(res => {
      if (res.data && res.data.comments)
        this.setState({ comments: res.data.comments });
      this.setState({ commentsLoaded: true });
    });
    this.setState(prevState => ({ showComments: !prevState.showComments }));
  };
  handleChange = e => {
    const elem = e.target;
    this.setState({
      [elem.name]: elem.value
    });
  };
  postComment = e => {
    e.preventDefault();
    const payload = {
      body: this.state.comment
    };
    axios
      .post(`comment/${this.state.data.id}`, payload)
      .then(res => {
        let comments = [];
        const datetime = new Date();
        if (this.state.comments) {
          comments = [
            ...this.state.comments,
            {
              id: this.props.user.id,
              body: this.state.comment,
              user: { fullname: this.props.user.fullname },
              createdAt: datetime
            }
          ];
        } else {
          comments = [
            {
              id: this.props.user.id,
              body: this.state.comment,
              user: { fullname: this.props.user.fullname },
              createdAt: datetime
            }
          ];
        }

        this.setState(prevState => ({
          comment: "",
          commentCount: prevState.commentCount + 1,
          comments: comments
        }));
      })
      .catch(err => {
        console.log(err);
      });
  };
  render() {
    const data = this.state.data;
    return (
      <div className={`card mb-3 ${styles.card}`}>
        <div className={`card-header ${styles.header}`}>
          <UserIcon size="3rem" iconSize="2x" />
          <div className="flex-grow-1 pl-3 pr-2">
            <h6>
              <Link
                to={`profile/${data.userId}`}
                className="font-weight-bold link"
              >
                {data.user.fullname}{" "}
              </Link>
              <span className="small">{data.user.Professional_Headline}</span>
            </h6>
            <h6 className="small text-lowercase">
              <TimeAgo live={false} datetime={data.createdAt} />
            </h6>
          </div>
          <Dropdown>
            <Dropdown.Toggle variant="dropdown" aria-label="Options">
              <FontAwesomeIcon icon="ellipsis-h" />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Header>Options</Dropdown.Header>
              <Dropdown.Item>Save</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item>Report</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div className="card-body">
          <h4>{data.title}</h4>
          <p className="mb-1">{data.body}</p>

          {/* <Link to="#" className="pl-0">
                Read More...
                </Link> */}
          <div className="my-2">
            <span className="mr-3">{this.state.likeCount} Likes </span>
            <span>{this.state.commentCount} Comments</span>
          </div>
        </div>
        <div
          className={`card-footer d-flex justify-content-around ${
            styles.footer
          }`}
        >
          <button
            variant="link"
            className={`btn btn-link ${styles.btn} ${
              this.state.liked ? "liked" : ""
            }`}
            onClick={this.handleLike}
          >
            <FontAwesomeIcon icon="star" /> Like
          </button>
          <button
            variant="link"
            className={`btn btn-link ${styles.btn}`}
            onClick={this.openComments}
          >
            <FontAwesomeIcon icon="comment" inverse />
            Comment
          </button>
          <Link
            to={`/explore/${data.id}`}
            className={`btn btn-link ${styles.btn}`}
          >
            <FontAwesomeIcon icon="info-circle" /> Explore
          </Link>
          {/* <div className="flex-grow-1" /> */}
          {/* <Button variant="link" className={styles.btn}>
                <FontAwesomeIcon icon="share-alt" />
                Share
              </Button> */}
        </div>
        {this.state.showComments && (
          <div className="card-footer">
            <Form
              onSubmit={this.postComment}
              className="d-flex align-items-stretch mb-3"
            >
              <div className="d-flex align-items-center">
                <UserIcon size="2rem" iconSize="lg" />
              </div>
              <Form.Control
                placeholder="Add comment"
                name="comment"
                value={this.state.comment}
                onChange={this.handleChange}
                className="form-control mx-2"
                autoComplete="off"
              />
              <button type="submit" className="btn btn-outline-dark">
                Send
              </button>
            </Form>
            {this.state.commentsLoaded ? (
              this.state.comments &&
              this.state.comments.map((x, i) => (
                <div className="comment my-3" key={i}>
                  <div className="d-flex">
                    <div className="d-flex align-items-center">
                      <UserIcon size="2rem" />
                    </div>
                    <div className="d-flex flex-column ml-3">
                      <Link to={`/profile/${x.id}`} className="link pr-3">
                        {x.user.fullname}
                      </Link>
                      <TimeAgo
                        live={false}
                        className="small"
                        datetime={x.createdAt}
                      />
                    </div>
                  </div>
                  <div className="rounded-pill bg-comment py-1 px-3 ml-5">
                    {x.body}
                  </div>
                </div>
              ))
            ) : (
              <Loader />
            )}
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { auth } = state;
  const { user } = auth;

  return { user };
}

export default connect(mapStateToProps)(Post);
