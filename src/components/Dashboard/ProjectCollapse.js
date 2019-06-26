import React, { useState } from "react";
import Collapse from "react-bootstrap/Collapse";
import { Link } from "react-router-dom";

const ProjectCollapse = props => {
  const [open, setOpen] = useState(false);
  
  return (
    <div className="project-collapse">
      <div
        className="collapse__header"
        onClick={() => setOpen(!open)}
        aria-controls={`collapse-${props.id}`}
        aria-expanded={open}
      >
        <span>{props.name}</span>
        {/* <span>{props.likes}</span> */}
      </div>
      <Collapse in={open}>
        <div id={`collapse-${props.id}`} className="collapse__body">
          <p className="p-2 mb-1">{props.vision}</p>
          <Link to={`/project/${props.id}`} className="p-2 m-2 link">
            More
          </Link>
        </div>
      </Collapse>
    </div>
  );
};

export default ProjectCollapse;
