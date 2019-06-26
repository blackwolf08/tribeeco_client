import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Dropdown from "react-bootstrap/Dropdown";

import UserIcon from "../Common/UserIcon";
import Loader from "../Common/Loader";
import axios from "../../utils/axios";
import Likes from "./Likes";

import styles from "../../styles/modules/Post.module.scss";

import TimeAgo from "timeago-react";

import { getDate, getTime } from "../../utils";

//  MAKE INTO SMALLER COMPONENTS, SEPARATE COMMENTS

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
      status: this.props.data.status,
      showComments: false,
      commentsOpened: false,
      //   likeCount: this.props.data.likes.length,
      comment: "",
      //   commentCount: this.props.data.comments.length,
      comments: [],
      commentsLoaded: false,
      noComments: false,
      showModal: false,
      likesList: [],
      likesOpened: false,
      relevantCount: 0,
      irrelevantCount: 0
    };
  }
  componentDidMount() {
    let irrelevantCount = 0;
    let relevantCount = 0;
    // this.props.data.likes.map(item => {
    //   if (item.status == true) relevantCount += 1;
    //   else if (item.status == false) irrelevantCount += 1;
    // });
    this.setState({ relevantCount, irrelevantCount });
  }
  handleRelevant = e => {
    if (this.state.status != "interested")
      axios
        .post(`interested/${this.state.data.id}`, {})
        .then(res => {
          if (this.state.status == "notinterested")
            this.setState(prevState => ({
              status: "interested",
              relevantCount: prevState.relevantCount + 1,
              irrelevantCount: prevState.irrelevantCount - 1
            }));
          else
            this.setState(prevState => ({
              status: "interested",
              relevantCount: prevState.relevantCount + 1
            }));
        })
        .catch(err => {
          console.log(err);
        });
  };
  handleIrrelevant = e => {
    if (this.state.status != "notinterested")
      axios
        .post(`notinterested/${this.state.data.id}`, {})
        .then(res => {
          if (this.state.status == "interested")
            this.setState(prevState => ({
              status: "notinterested",
              irrelevantCount: prevState.irrelevantCount + 1,
              relevantCount: prevState.relevantCount - 1
            }));
          else
            this.setState(prevState => ({
              status: "notinterested",
              irrelevantCount: prevState.irrelevantCount + 1
            }));
        })
        .catch(err => {
          console.log(err);
        });
  };
  openComments = e => {
    if (!this.state.commentsOpened) {
      axios
        .get(`eventcomments/${this.state.data.id}`)
        .then(res => {
          if (res.data && res.data.comments)
            this.setState({ comments: res.data.comments });
          else this.setState({ noComments: true });
          this.setState({ commentsLoaded: true, commentsOpened: true });
        })
        .catch(err => {
          console.log(err);
        });
    }
    this.setState(prevState => ({ showComments: !prevState.showComments }));
  };
  //   openLikes = e => {
  //     if (!this.state.likesOpened) {
  //       axios
  //         .get(`likes/${this.state.data.id}`)
  //         .then(res => {
  //           if (res.data && res.data.likes)
  //             this.setState({ likesList: res.data.likes, likesOpened: true });
  //         })
  //         .catch(err => {
  //           console.log(err);
  //         });
  //     }
  //     this.setState({ showModal: true });
  //   };
  //   handleClose = () => {
  //     this.setState({ showModal: false });
  //   };

  handleChange = e => {
    const elem = e.target;
    this.setState({
      [elem.name]: elem.value
    });
  };
  postComment = e => {
    e.preventDefault();
    if (this.state.comment == "") return;
    const payload = {
      body: this.state.comment
    };
    axios
      .post(`eventcomment/${this.state.data.id}`, payload)
      .then(res => {
        const comments = [
          {
            ...res.data,
            user: { ...this.props.currentUser }
          },
          ...this.state.comments
        ];

        console.log(comments);
        this.setState(prevState => ({
          comment: "",
          commentCount: prevState.commentCount + 1,
          comments,
          noComments: false
        }));
      })
      .catch(err => {
        console.log(err);
      });
  };
  render() {
    const { data, likesList, status } = this.state;

    return (
      <div
        className={`card box-shadow-lg mb-3 ${styles.card}`}
        style={this.props.style}
      >
        <div
          className={`card-header d-flex pl-1 align-items-start ${
            styles.header
          }`}
        >
          <div className="p-1">
            {data.image && (
              <img
                src={data.image}
                alt="post"
                className="mt-2 event-image"
                style={{ maxWidth: 140 }}
              />
            )}
          </div>
          <div className="flex-grow-1 pt-3 pl-2">
            <h6 className="mb-3">
              <Link to={`/event/${data.id}`} className="font-weight-bold link">
                {data.eventName}
              </Link>
            </h6>

            <div className="mb-3">
              <FontAwesomeIcon className="mr-3" icon="calendar-alt" />
              <span className="mr-4">{getDate(data.date)}</span>

              <FontAwesomeIcon className="mr-3" icon="clock" />
              <span>{getTime(data.date)}</span>
            </div>
            <div className="mb-3">
              <FontAwesomeIcon className="mr-3" icon="map-marker-alt" />
              <span>{data.venue}</span>
            </div>
          </div>

          <Dropdown>
            <Dropdown.Toggle variant="dropdown" aria-label="Options">
              <FontAwesomeIcon icon="ellipsis-h" />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>
                <Link to={`/event/${data.id}`}>View Details</Link>
              </Dropdown.Item>
              <Dropdown.Item>Share link</Dropdown.Item>
              {/* <Dropdown.Item>DM Creator</Dropdown.Item> */}
              {/* <Dropdown.Item>Save</Dropdown.Item> */}
              <Dropdown.Divider />
              <Dropdown.Item>Report</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>

        {/* 
          <p
            className="overflow-hidden mb-1"
            dangerouslySetInnerHTML={{ __html: data.body }}
          />*/}
        {/* <div className="my-1 px-2">
          <button
            className="btn btn-link text-muted"
            // onClick={this.state.likeCount > 0 ? this.openLikes : null}
          >
            {this.state.relevantCount} Relevant
          </button>
          <button
            className="btn btn-link text-muted"
            // onClick={this.state.likeCount > 0 ? this.openLikes : null}
          >
            {this.state.irrelevantCount} Irrelevant
          </button>
          <button
            className="btn btn-link text-muted"
            onClick={this.openComments}
          >
            {this.state.commentCount} Comments
          </button>
        </div> */}
        <div className={`d-flex justify-content-end ${styles.footer}`}>
          <button
            className={`btn btn-info btn-sm ${styles.btn} ${
              status == "interested" ? "interested" : ""
            }`}
            onClick={this.handleRelevant}
          >
            {/* <FontAwesomeIcon icon="thumbs-up" />  */}
            Interested
          </button>
          <button
            className={`btn btn-info btn-sm ${styles.btn} ${
              status == "notinterested" ? "interested" : ""
            }`}
            onClick={this.handleIrrelevant}
          >
            {/* <FontAwesomeIcon icon="thumbs-down" />  */}
            Not Interested
          </button>
          <button
            className={`btn btn-info btn-sm ${styles.btn}`}
            onClick={this.openComments}
          >
            {/* <FontAwesomeIcon icon="comment" inverse /> */}
            Comment
          </button>
        </div>
        {this.state.showComments && (
          <div className={styles.footer}>
            <Form
              onSubmit={this.postComment}
              className="d-flex align-items-stretch mb-3"
            >
              <div className="d-flex align-items-center">
                <UserIcon
                  size="2rem"
                  iconSize="lg"
                  url={
                    this.props.currentUser && this.props.currentUser.profilepic
                  }
                />
              </div>
              <Form.Control
                placeholder="Add comment"
                name="comment"
                value={this.state.comment}
                onChange={this.handleChange}
                className="form-control mx-2"
                autoComplete="off"
              />
              <button type="submit" className="btn btn-outline-info">
                Send
              </button>
            </Form>
            <div className={styles.comments}>
              {this.state.commentsLoaded ? (
                !this.state.noComments ? (
                  this.state.comments.map((x, i) => (
                    <div className="comment my-3" key={i}>
                      <div className="d-flex">
                        <div className="d-flex align-items-center">
                          <UserIcon
                            size="2rem"
                            iconSize="lg"
                            url={x.user && x.user.profilepic}
                          />
                        </div>
                        <div className="d-flex align-items-center ml-3">
                          <Link
                            to={`/profile/${x.userId}`}
                            className="link pr-2"
                          >
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
                  <div className="text-center">No comments</div>
                )
              ) : (
                <Loader />
              )}
            </div>
          </div>
        )}
        {/* <Modal show={this.state.showModal} onHide={this.handleClose}>
          <Modal.Header className="bg-light-blue" closeButton>
            <h5>All Likes</h5>
          </Modal.Header>
          <Modal.Body>
            <Likes likesList={likesList} />
          </Modal.Body>
        </Modal> */}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { currentUser: state.auth.user };
}

export default connect(mapStateToProps)(Post);
