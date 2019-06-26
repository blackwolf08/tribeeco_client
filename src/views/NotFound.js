import React from "react";

const NotFound = props => (
  <div className="text-center m-5 p-5 text-uppercase font-weight-bolder">
    <h3 className="display-2">{props.statusCode ? props.statusCode : "404"}</h3>
    <h5 className="mb-2">
      We are sorry, the {props.message ? props.message : "page"} you requested
      was not found.
    </h5>
    <a href="/home" className="link">
      Go to home.
    </a>
  </div>
);
export default NotFound;
