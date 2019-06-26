import React from "react";

import ProjectCard from "../Common/ProjectCard";
import WithSearch from "./WithSearch";

const Projects = props => (
  <WithSearch {...props} url="searchprojects">
    {data =>
      data &&
      data.map((datum, idx) => (
        <ProjectCard data={datum} key={idx} className="m-2" />
      ))
    }
  </WithSearch>
);

export default Projects;
