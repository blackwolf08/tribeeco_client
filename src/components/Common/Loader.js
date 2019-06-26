import React from "react";
import PropTypes from "prop-types";

const Loader = ({ className }) => (
  <div className={`spinner ${className}`}>
    <div className="bounce1" />
    <div className="bounce2" />
    <div className="bounce3" />
  </div>
);
Loader.propTypes = {
  className: PropTypes.string
};

export default Loader;
