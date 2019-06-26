import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Loader from "../Common/Loader";
import axios from "../../utils/axios";
import UserIcon from "../Common/UserIcon";
import debounce from "debounce-fn";

import styles from "../../styles/modules/Search.module.scss";

class Search extends Component {
  state = {
    open: false,
    loading: true,
    query: "",
    data: [],
    noData: false
  };
  //   componentDidUpdate(prevProps) {
  //     if (this.props.opened !== prevProps.opened) {
  //       if (this.props.opened) {
  //         this.loadData();
  //       }
  //     }
  //   }
  loadData = debounce(() => {
    this.setState({ loading: true, noData: false });
    axios
      .get(`searchpeople/?q=${this.state.query}`)
      .then(res => {
        if (res.data && res.data.length > 0) {
          this.setState({ data: res.data, noData: false });
        } else {
          this.setState({ noData: true });
        }
        this.setState({ loading: false });
      })
      .catch(err => {
        console.log(err);
      });
  }, 1000);
  handleSubmit = e => {
    e.preventDefault();
    const query = this.state.query;
    this.setState({ open: false, query: "" });
    this.props.history.push(`/search/people/?q=${query}`);
  };
  handleChange = e => {
    this.setState({ query: e.target.value });
    if (e.target.value) this.loadData();
    if (!this.state.open) this.setState({ open: true });
  };
  onFocus = () => {
    if (this.state.query) this.setState({ open: true });
  };

  goToProfile = id => {
    this.setState({ open: false });
    this.props.history.push(`/profile/${id}`);
  };
  redirect = () => {
    this.setState({ open: false });
    const query = this.state.query;
    this.setState({ open: false, query: "" });
    this.props.history.push(`/search/people/?q=${query}`);
  };
  close = () => {
    this.setState({ open: false });
  };

  render() {
    const { loading, data, noData } = this.state;
    return (
      <div className="position-relative">
        <form
          className={`form-inline ${styles.form}`}
          onSubmit={this.handleSubmit}
          onBlur={this.onBlur}
        >
          <FontAwesomeIcon icon="search" className={styles.svg} />
          <input
            placeholder="Search"
            aria-label="Search"
            aria-describedby="search-bar"
            className={`form-control ${styles.input}`}
            value={this.state.query}
            onChange={this.handleChange}
            onFocus={this.onFocus}
          />
        </form>
        <div
          style={{ display: this.state.open ? "block" : "none" }}
          className={`px-3 pt-2 ${styles.container}`}
          tabIndex="-1"
        >
          {loading ? (
            <Loader />
          ) : noData ? (
            <h6 className="text-center p-3">No matching results.</h6>
          ) : (
            data &&
            data.slice(0, 8).map((item, idx) => (
              <div
                key={idx}
                className={`d-flex align-items-center p-2 ${styles.element}`}
                onClick={() => this.goToProfile(item.id)}
              >
                <UserIcon size="2rem" iconSize="lg" url={item.profilepic} />
                <div className="ml-3">{item.fullname}</div>
                <div className="text-muted ml-2">
                  {item.Professional_Headline}
                </div>
              </div>
            ))
          )}
          <div className="border-top p-2 d-flex justify-content-between">
            <button onClick={this.redirect} className="btn link">
              See all results for "{this.state.query}"
            </button>
            <button
              onClick={this.close}
              type="button"
              className="btn btn-close"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Search);
