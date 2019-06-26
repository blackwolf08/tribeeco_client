import React from "react";

import "react-perfect-scrollbar/dist/css/styles.css";
import Scrollbar from "react-perfect-scrollbar";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Checkbox from "./Checkbox";

const Objective = props => {
  const handleChange = idx => {
    let items = [...props.allObjectives];
    let item = { ...items[idx] };
    item.selected = !item.selected;
    items[idx] = item;
    props.setObjectives(items);
  };
  const handleInput = e => {
    props.setInput(e.target.value);
  };
  return (
    <>
      <h3 className="mt-4">What are your objectives?</h3>

      <div className="w-md-80 mt-3 mx-auto">
        <Scrollbar
          className="objectives"
          style={{ maxHeight: "40vh", overflow: "hidden" }}
        >
          {props.allObjectives &&
            props.allObjectives
              .slice(0, props.allObjectives.length - 1)
              .map((item, index) => (
                <Checkbox
                  key={index}
                  text={item.text}
                  selected={item.selected}
                  handleChange={() => handleChange(index)}
                />
              ))}
          <div className="item">
            <input
              type="text"
              className="form-control border-0"
              placeholder="Enter your own"
              value={props.input}
              onChange={handleInput}
              maxLength="50"
            />
          </div>
        </Scrollbar>
      </div>
    </>
  );
};

export default Objective;
