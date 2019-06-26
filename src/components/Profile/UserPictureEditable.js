import React, { Component } from "react";
import { connect } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { setPicture } from "../../actions";

import axios from "../../utils/axios";

class UserPicture extends Component {
  state = {
    imageURL: ""
  };
  onChange = e => {
    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        imageURL: reader.result
      });
      const formData = new FormData();
      formData.append("file", file, file.name);
      axios
        .post("/profilepic", formData)
        .then(res => {
          this.props.dispatch(setPicture(res.data.profilepic));
        })
        .catch(err => {
          console.log(err);
        });
    };

    reader.readAsDataURL(file);
  };
  componentDidMount() {
    this.setState({ imageURL: this.props.url });
  }
  remove = () => {
    axios
      .patch("/removeprofilepic")
      .then(res => {
        console.log(res);
        this.setState({ imageURL: null });
      })
      .catch(err => {
        console.log(err);
      });
  };
  render() {
    const { imageURL } = this.state;
    return (
      <>
        {imageURL === "" || imageURL === null ? (
          <FontAwesomeIcon icon="user" />
        ) : (
          <img src={imageURL} alt="profile" />
        )}
        <label htmlFor="profile-picture" className="btn">
          <FontAwesomeIcon icon="user-plus" size="lg" />
        </label>
        <input
          id="profile-picture"
          type="file"
          accept="image/x-png,image/jpeg,image/jpg"
          onChange={this.onChange}
          hidden
        />
        {imageURL !== "" && imageURL !== null && (
          <button
            type="button"
            className="btn btn-remove"
            onClick={this.remove}
          >
            <FontAwesomeIcon icon="times" />
          </button>
        )}
      </>
    );
  }
}

export default connect()(UserPicture);
