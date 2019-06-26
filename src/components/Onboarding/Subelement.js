import React from "react";

import Scrollbar from "react-perfect-scrollbar";
import matchSorter from "match-sorter";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import axios from "../../utils/axios";

import Checkbox from "./Checkbox";

function getItem(value, length) {
  return { index: length, selected: true, value: value };
}

class Subelement extends React.Component {
  state = {
    items: this.props.allSubelements,
    input: ""
  };
  addItem = () => {
    const { input } = this.state;
    if (input == "") return;
    let newItems = [];
    if (this.props.allSubelements) newItems = [...this.props.allSubelements];

    const newItem = getItem(input, newItems.length + 1);
    newItems.unshift(newItem);
    this.setState({ items: newItems, input: "" });
    this.props.setSubelements(newItems);

    axios
      .patch(`addsubpassion/?element=${this.props.element}`, {
        subpassion: input
      })
      .then(res => {
        // console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  filterItems = input => {
    let allItems = this.props.allSubelements;
    const newItems = allItems
      ? matchSorter(allItems, input, {
          keys: ["selected", "value"],
          threshold: matchSorter.rankings.WORD_STARTS_WITH
        })
      : allItems;
    this.setState({ items: newItems });
  };

  handleInput = e => {
    this.setState({ input: e.target.value });
    this.filterItems(e.target.value);
  };

  handleChange = idx => {
    let allItems = this.props.allSubelements;
    allItems.map((item, key) => {
      if (item.index === idx) {
        let obj = item;
        obj.selected = !obj.selected;
        return obj;
      }
    });

    this.setState({ allItems });

    this.props.setSubelements(allItems);
  };

  render() {
    const { items, input } = this.state;

    return (
      <>
        {/* <h5 className="w-50 mx-auto my-3">
          Let's narrow it down a bit to help us to know you better and help in
          your journey.
        </h5> */}
        <div className="w-md-80 mt-3 mx-auto">
          <input
            placeholder="Enter here"
            className="form-control"
            value={input}
            onChange={this.handleInput}
            maxLength="25"
          />

          <Scrollbar className="subelements mt-3">
            {items && items.length > 0 ? (
              items.map((item, index) => (
                <Checkbox
                  key={index}
                  text={item.value}
                  selected={item.selected}
                  handleChange={() => this.handleChange(item.index)}
                />
              ))
            ) : input !== "" ? (
              <button
                type="button"
                className="btn btn-block btn-success mt-3"
                onClick={this.addItem}
              >
                Add
              </button>
            ) : (
              "No subelements. Add one"
            )}
          </Scrollbar>
        </div>
      </>
    );
  }
}
export default Subelement;
