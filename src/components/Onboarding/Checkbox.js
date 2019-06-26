import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Checkbox = ({ text, selected, handleChange }) => (
  <div className={`item ${selected && "selected"}`} onClick={handleChange}>
    <span>{text}</span>
    <FontAwesomeIcon icon="check-circle" className="ml-3" />
  </div>
);

export default Checkbox;
