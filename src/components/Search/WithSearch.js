import React from "react";

import axios from "../../utils/axios";
import Loader from "../Common/Loader";

const CancelToken = axios.CancelToken;
let cancel;

class WithSearch extends React.Component {
  state = {
    data: [],
    loading: true,
    noData: false
  };
  loadData() {
    if (this.props.query && this.props.query !== "") {
      this.setState({ loading: true });
      axios
        .get(`${this.props.url}/?q=${this.props.query}`, {
          cancelToken: new CancelToken(function executor(c) {
            cancel = c;
          })
        })
        .then(res => {
          if (res.data && res.data.length > 0)
            this.setState({ data: res.data, noData: false });
          else this.setState({ noData: true });
          this.setState({ loading: false });
        })
        .catch(err => {
          console.log(err);
          this.setState({ loading: false, noData: true });
        });
    }
  }
  componentDidMount() {
    this.loadData();
  }
  componentWillUnmount() {
    cancel();
  }
  componentDidUpdate(prevProps) {
    if (prevProps.query !== this.props.query) this.loadData();
  }
  render() {
    const { loading, data, noData } = this.state;
    if (loading) return <Loader />;
    if (noData) return <h6 className="text-center">No matching results.</h6>;
    return (
      <div className="d-flex flex-wrap justify-content-center align-items-baseline mt-3">
        {this.props.children(data)}
      </div>
    );
  }
}

export default WithSearch;
