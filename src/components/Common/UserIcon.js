import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const UserIcon = ({ size, iconSize, className, style, url, ...props }) => {
  if (url && url !== "" && url !== null) {
    return (
      <div
        style={{
          width: size,
          height: size,
          flexShrink: 0
        }}
        className={className}
      >
        <img
          src={url}
          style={{
            borderRadius: "50%",
            border: "1px solid rgba(0, 0, 0, .1)",
            height: "100%"
          }}
          alt="profile"
        />
      </div>
    );
  }
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: "grey",
        textAlign: "center",
        flexShrink: 0,
        ...style
      }}
      className={className}
      {...props}
    >
      <FontAwesomeIcon icon="user" className="user-svg" size={iconSize} />
    </div>
  );
};

export default UserIcon;
