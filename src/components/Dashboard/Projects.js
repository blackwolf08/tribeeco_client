import React from "react";
import { Link } from "react-router-dom";

import ProjectCollapse from "./ProjectCollapse";
import ContentLoader from "react-content-loader";

const ProjectLoader = () => (
  <div className="bg-white p-4">
    <ContentLoader
      height={160}
      width={360}
      speed={2}
      ariaLabel="Loading Projects"
      primaryColor="#f3f3f3"
      secondaryColor="#ecebeb"
    >
      <rect x="16" y="0" rx="4" ry="4" width="360" height="20" />
      <rect x="16" y="50" rx="4" ry="4" width="360" height="20" />
      <rect x="16" y="100" rx="4" ry="4" width="360" height="20" />
    </ContentLoader>
  </div>
);

const Projects = ({ loaded, list }) => {
  if (!loaded) return <ProjectLoader />;
  return (
    <div className="card card-custom box-shadow dashboard-projects">
      <div className="card-header">
        <span>Active Projects</span>
        <hr />
        {/* <span>Sort By</span> */}
      </div>
      <div className="card-body">
        {list.length > 0 ? (
          <>
            {list.slice(0, 5).map((x, i) => (
              <ProjectCollapse
                name={x.title}
                // likes=""
                description={x.body}
                id={x.id}
                key={i}
              />
            ))}

            <Link
              to="/project/new"
              className="d-block mt-3 font-weight-bold link"
            >
              Create a Project
            </Link>
            <Link to="/projects/list" className="d-block font-weight-bold link">
              View All Projects
            </Link>
          </>
        ) : (
          <>
            <Link to="/project/new" className="d-block font-weight-bold link">
              Create a Project
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Projects;
