import React from "react";
import PropTypes from "prop-types";

const ImageUpload = props => {
  const onChange = e => {
    let reader = new FileReader();
    let file = e.target.files[0];

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      props.setImage(reader.result, file);
    };
  };

  return (
    <input
      id="project-picture"
      type="file"
      onChange={onChange}
      accept="image/x-png,image/jpeg,image/jpg"
      // hidden
    />
  );
};
ImageUpload.propTypes = {
  setImage: PropTypes.func.isRequired
};

export default ImageUpload;
