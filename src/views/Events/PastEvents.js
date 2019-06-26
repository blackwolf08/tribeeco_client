import React from "react";
import { Link } from "react-router-dom";
import axios from "../../utils/axios";
import Loader from "../../components/Common/Loader";

import { getDate, getTime } from "../../utils";

class Drafts extends React.Component {
  state = {
    dataLoaded: false,
    data: []
  };
  componentDidMount() {
    axios
      .get("/myevents")
      .then(res => {
        console.log(res);
        this.setState({ dataLoaded: true, data: res.data });
      })
      .then(err => {
        console.log(err);
      });
  }
  render() {
    const { dataLoaded, data } = this.state;

    if (!dataLoaded) return <Loader />;
    return (
      <>
        <h5 className="font-weight-600 text-uppercase my-3">Past Events</h5>

        {data.length > 0 ? (
          data.map(event => (
            <div key={event.id} className="my-2">
              <Link
                to={`/event/${event.id}`}
                className="text-primary h5 text-underline mr-2"
              >
                {event.eventName}
              </Link>
              <span>{getDate(event.date)}</span>
            </div>
          ))
        ) : (
          <h5 className="my-3">No drafts</h5>
        )}
      </>
    );
  }
}

export default Drafts;
