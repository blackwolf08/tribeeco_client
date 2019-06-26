import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Declaration = ({ tribe, finalStep }) => {
  useEffect(() => {
    setTimeout(() => {
      finalStep();
    }, 10000);
  }, []);

  return (
    <div className="text-center">
      <h3 className="text-center mt-5">
        Your tribe is <span className="text-primary">{tribe}</span>.
      </h3>

      <button
        type="button"
        className="btn btn-info btn-arrow rounded-pill mt-5"
        onClick={finalStep}
      >
        Go to your homepage <FontAwesomeIcon icon="arrow-right" />
      </button>
    </div>
  );
};
export default Declaration;
