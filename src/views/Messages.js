import React from "react";
// import { Switch, Route, NavLink, Redirect } from "react-router-dom";

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ConnectionsList from "../components/Messages/ConnectionsList";
import Chat from "../components/Messages/Chat";

import axios from "../utils/axios";

class Messages extends React.Component {
  state = {
    id: this.props.match.params.id,
    connections: [],
    receiver: null
  };
  // loadData() {}
  componentDidMount() {
    axios
      .get("myconnections")
      .then(res => {
        if (res.data && this.props.match.params.id) {
          const receiver = res.data.find(obj => {
            return obj.id === Number(this.props.match.params.id);
          });
          this.setState({ receiver: receiver });
        }
        this.setState({ connections: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.match.params.id !== prevState.id) {
      return {
        id: nextProps.match.params.id
      };
    }
    return null;
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.params.id !== this.state.id) {
      const receiver = this.state.connections.find(obj => {
        return obj.id === Number(this.props.match.params.id);
      });
      this.setState({ receiver });
      console.log("updated");
    }
  }
  render() {
    const { match } = this.props;
    const { connections, receiver } = this.state;
    return (
      <div className="container messages">
        <div className="row pt-4 flex-lg-nowrap">
          <div className="col-12 col-md-4">
            <ConnectionsList users={connections} />
          </div>
          <div className="col-12 col-md-8 mt-4 mt-md-0">
            <div className="bg-white box-shadow rounded h-100 d-flex flex-column">
              {receiver ? (
                <Chat
                  receiver={receiver}
                  receiverId={match.params.id}
                  key={match.params.id}
                />
              ) : (
                <h5 className="text-center mt-5 font-weight-bold">
                  You don’t have a message selected
                </h5>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Messages;
