import React from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/modules/ProjectCard.module.scss";

const ProjectCard = ({ data, ...props }) => (
  <Link to={`/project/${data.id}`} {...props}>
    <div className={styles.box}>
      <div className={styles.img}>
        {/* <img src="" alt="Project Background"/> */}
      </div>
      <h6 className="mt-2">{data.title}</h6>
      {/* <h6 className="small">{data.user.fullname}</h6> */}
    </div>
  </Link>
);
export default ProjectCard;
