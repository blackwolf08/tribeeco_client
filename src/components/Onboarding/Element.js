import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Scrollbar from "react-perfect-scrollbar";
import matchSorter from "match-sorter";

import Checkbox from "./Checkbox";

class Element extends React.Component {
  state = {
    items: this.props.passionList,
    input: "",
    selection: this.props.element || ""
  };
  componentDidMount() {
    this.setState({ items: this.props.passionList });
  }
  filterItems = input => {
    const newItems = input
      ? matchSorter(this.props.passionList, input, {
          keys: ["value"],
          threshold: matchSorter.rankings.WORD_STARTS_WITH
        })
      : this.props.passionList;
    this.setState({ items: newItems });
  };

  handleInput = e => {
    this.setState({ input: e.target.value });
    this.filterItems(e.target.value);
  };

  handleChange = selection => {
    this.setState({ selection });
    this.props.nextStep(selection);
  };

  render() {
    const { items, input, selection } = this.state;

    return (
      <>
        {/* <h3 className="text-uppercase font-weight-bold my-3 mt-md-5">
          Let's get started
        </h3> */}
        {/* <h3 className="">Choose your element!</h3> */}
        <div className="w-md-80 mt-3 mx-auto">
          <input
            placeholder="Search here"
            className="form-control"
            value={input}
            onChange={this.handleInput}
            maxLength="25"
          />
          <Scrollbar className="interests mt-3">
            {items && items.length > 0 ? (
              items.map((item, index) => (
                <Checkbox
                  key={index}
                  text={item.value}
                  selected={item.value == selection}
                  handleChange={() => this.handleChange(item.value)}
                />
              ))
            ) : (
              <div className="h6 mt-4">No such item</div>
            )}
          </Scrollbar>
        </div>
      </>
    );
  }
}

export default Element;
