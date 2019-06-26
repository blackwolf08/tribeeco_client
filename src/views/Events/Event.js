import React from "react";
import { Switch, Route, Link } from "react-router-dom";

import CreateEvent from "./CreateEvent";
import Drafts from "./Drafts";
import EditEvent from "./EditEvent";
import PastEvents from "./PastEvents";
import { ROUTES } from "../../constants";

const Event = () => (
  <div className="container pt-4 ">
    <div className="row box-shadow rounded event-pages">
      <div className="col-md-3 border-right p-3 bg-white mb-3 mb-md-0">
        <Link className="btn btn-link" to={ROUTES.EVENT_NEW}>
          Create Another Event
        </Link>
        <Link className="btn btn-link" to={ROUTES.EVENT_PAST}>
          View Past Events
        </Link>
        <Link className="btn btn-link" to={ROUTES.EVENT_DRAFTS}>
          View and Edit Drafts
        </Link>
      </div>
      <div className="col-md-9 p-3 bg-white">
        <Switch>
          <Route
            path={ROUTES.EVENT_NEW}
            render={props => <CreateEvent {...props} key={Math.random()} />} // Use something else, maybe add state
            exact
          />
          <Route path={ROUTES.EVENT_DRAFTS} component={Drafts} exact />
          <Route path={ROUTES.EVENT_EDIT} component={EditEvent} exact />
          <Route path={ROUTES.EVENT_PAST} component={PastEvents} exact />
        </Switch>
      </div>
    </div>
  </div>
);

export default Event;
