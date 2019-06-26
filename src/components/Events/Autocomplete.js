import React from "react";
import Downshift from "downshift";
import styles from "../../styles/modules/Autocomplete.module.scss";
import matchSorter from "match-sorter";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ArrowIcon({ isOpen }) {
  return (
    <svg
      viewBox="0 0 20 20"
      preserveAspectRatio="none"
      width={16}
      fill="transparent"
      stroke="#979797"
      strokeWidth="1.1px"
      transform={isOpen ? "rotate(180)" : undefined}
    >
      <path d="M1,6 L10,15 L19,6" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      preserveAspectRatio="none"
      width={12}
      fill="transparent"
      stroke="#979797"
      strokeWidth="1.1px"
    >
      <path d="M1,1 L19,19" />
      <path d="M19,1 L1,19" />
    </svg>
  );
}

const itemToString = i => (i ? i.fullname : "");

class Autocomplete extends React.Component {
  state = {
    selectedMember: "",
    inputValue: "",
    isOpen: false,
    seclectedItem: {}
  };
  componentDidUpdate(prevProps) {
    if (prevProps.reset !== this.props.reset) {
      this.clearSelection();
    }
  }

  getItems(filter) {
    const { allItems } = this.props;
    return filter
      ? matchSorter(allItems, filter, {
          keys: ["fullname"],
          threshold: matchSorter.rankings.WORD_STARTS_WITH
        })
      : allItems;
  }

  changeHandler = selectedMember => {
    if (selectedMember) {
      this.setState({
        selectedMember,
        seclectedItem: selectedMember,
        isOpen: false
      });
    }
  };

  stateChangeHandler = changes => {
    let {
      selectedItem = this.state.selectedMember,
      isOpen = this.state.isOpen,
      inputValue = this.state.inputValue,
      type
    } = changes;
    isOpen =
      type === Downshift.stateChangeTypes.mouseUp ? this.state.isOpen : isOpen;
    this.setState({
      selectedMember: selectedItem,
      isOpen,
      inputValue
    });
  };

  handleInputChange = event => {
    const { value } = event.target;
    const nextState = { inputValue: value };
    // if (this.items.includes(value)) {
    //   nextState.selectedMember = value
    // }
    this.setState(nextState);
  };

  clearSelection = () => {
    this.setState({ inputValue: "", selectedMember: {} });

    // this.props.onChange(this.props.fieldName, {});
  };

  toggleMenu = () => {
    this.setState(({ isOpen }) => ({ isOpen: !isOpen }));
  };

  add = () => {
    // this.props.onChange(this.props.allFieldName, );
    console.log("addt", this.state.selectedItem);
    this.setState({ inputValue: "" });
    if (this.state.inputValue != "") this.props.push(this.state.selectedMember);
  };

  render() {
    return (
      <div className="d-flex flex-column">
        <Downshift
          itemToString={itemToString}
          selectedItem={this.state.selectedMember}
          isOpen={this.state.isOpen}
          inputValue={this.state.inputValue}
          onChange={this.changeHandler}
          onStateChange={this.stateChangeHandler}
        >
          {({
            inputValue,
            getInputProps,
            getLabelProps,
            getMenuProps,
            getItemProps,
            getToggleButtonProps,
            selectedItem,
            highlightedIndex,
            isOpen,
            clearSelection
          }) => {
            return (
              <div
                className="m-auto position-relative d-flex"
                style={{ minWidth: "200px" }}
              >
                <div className="position-relative">
                  <input
                    className={`form-control ${styles.input}`}
                    {...getInputProps({
                      style: {
                        borderBottomLeftRadius: isOpen ? "0" : null,
                        borderBottomRightRadius: isOpen ? "0" : null
                      },
                      placeholder: "Select",
                      onChange: this.state.handleInputChange
                    })}
                  />
                  {selectedItem ? (
                    <button
                      className={styles.button}
                      onClick={clearSelection}
                      aria-label="clear selection"
                    >
                      <XIcon />
                    </button>
                  ) : (
                    <button
                      className={styles.button}
                      {...getToggleButtonProps()}
                    >
                      <ArrowIcon isOpen={isOpen} />
                    </button>
                  )}
                </div>
                <ul
                  className={styles.ul}
                  {...getMenuProps({
                    style: {
                      border: isOpen ? null : "none"
                    }
                  })}
                >
                  {isOpen ? (
                    this.getItems(inputValue).length > 0 ? (
                      this.getItems(inputValue).map((item, index) => (
                        <li
                          className={styles.item}
                          key={item.id}
                          {...getItemProps({
                            item,
                            index,
                            style: {
                              color:
                                highlightedIndex === index ||
                                selectedItem === item
                                  ? "rgba(0,0,0,.95)"
                                  : null,
                              backgroundColor:
                                highlightedIndex === index
                                  ? "rgba(0,0,0,.03)"
                                  : null,
                              fontWeight:
                                selectedItem === item ? "rgba(0,0,0,.95)" : null
                            }
                          })}
                        >
                          {itemToString(item)}
                        </li>
                      ))
                    ) : (
                      <p className="p-2">No connections</p>
                    )
                  ) : null}
                </ul>

                <button type="button" className="btn" onClick={this.add}>
                  <FontAwesomeIcon icon="plus" style={{ color: "#707070" }} />
                </button>
              </div>
            );
          }}
        </Downshift>
      </div>
    );
  }
}

export default Autocomplete;
