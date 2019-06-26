import React, { Component } from "react";
import ProgressBar from "react-bootstrap/ProgressBar";

import Navbar from "../components/Navbar/Navbar";

import Element from "../components/Onboarding/Element";
import Subelement from "../components/Onboarding/Subelement";
import Objective from "../components/Onboarding/Objective";
import TribeDeclaration from "../components/Onboarding/TribeDeclaration";

import axios from "../utils/axios";
let now;
class Onboarding extends Component {
  constructor() {
    super();
    this.state = {
      isNext: false,
      tribe: null,
      stage: 1,
      element: ""
    };
  }
  setStage = stage => {
    this.setState({ stage });
  };

  setElement = element => {
    this.setState({ element });
  };
  handleSubmit = e => {
    e.preventDefault();

    const payload = {
      tribe: this.state.tribe
    };
    axios
      .patch("updateprofile", payload)
      .then(res => {
        this.setState({ isNext: true });
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleChange = e => {
    const val = e.target.value;
    this.setState({ tribe: val });
  };
  render() {
    return (
      <>
        <Navbar />
        <ProgressBar
          variant="primary"
          now={this.state.stage * 25}
          className="position-fixed w-100 bottom-0"
          label={`progress ${this.state.stage * 25}%`}
          srOnly
        />
        {this.state.stage === 1 && (
          <Element setStage={this.setStage} setElement={this.setElement} />
        )}
        {this.state.stage === 2 && (
          <Subelement setStage={this.setStage} element={this.state.element} />
        )}
        {this.state.stage === 3 && <Objective setStage={this.setStage} />}
        {this.state.stage === 4 && (
          <TribeDeclaration tribe={this.state.element} />
        )}
      </>
    );
  }
}

export default Onboarding;
