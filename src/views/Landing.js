import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

import Typist from "react-typist";

import UserIcon from "../components/Common/UserIcon";

// import logo from "../assets/logo.png";
import grow from "../assets/landing/grow.png";
import aStart from "../assets/landing/astart.png";
import explore from "../assets/landing/explore.png";
import mainWebp from "../assets/landing/main.webp";
import mainPng from "../assets/landing/main.png";
// Use useref
const Landing = props => {
  let scrollRef = React.createRef();
  const [state, setState] = useState({
    1: false,
    2: false,
    3: false
  });
  const scrollToMain = () =>
    scrollRef.current.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="landing-page">
      <Navbar expand="md" className="py-3" id="nav-bg">
        <div className="container">
          <Navbar.Brand href="/" className="font-weight-bold">
            {/* <img src={logo} style={{ width: "60px" }} alt="logo" /> */}
            <span className="ml-3">TRIBEECO</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-landing" />
          <Navbar.Collapse
            className="justify-content-end pr-md-5"
            id="navbar-landing"
          >
            <Nav>
              {props.isAuthenticated ? (
                <Link
                  to="/home"
                  className="d-flex align-items-center text-white py-1 pl-3 pr-1 bg-primary rounded-pill"
                >
                  <div className="pr-2">{props.user.fullname}</div>
                  <UserIcon
                    size="2rem"
                    iconSize="lg"
                    className="bg-white"
                    url={props.user.profilepic}
                  />
                </Link>
              ) : (
                <>
                  <Link
                    className="btn btn-outline-info rounded-pill my-3 my-md-0 px-4 mx-2"
                    to="/login"
                  >
                    LOG IN
                  </Link>
                  <Link
                    className="btn btn-info rounded-pill px-4 mx-2"
                    to="/signup"
                  >
                    SIGN UP
                  </Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </div>
      </Navbar>
      <header className="container position-relative">
        <div className="p-3 px-md-0 pt-5 w-md-80">
          <h1 className="font-weight-bold title mt-md-5">
            <Typist avgTypingDelay={100} cursor={{ hideWhenDone: true }}>
              It’s about the{" "}
              <span className="text-info">
                THRIVE
                <Typist.Backspace count={6} delay={1000} />
                DRIVE
                <Typist.Backspace count={5} delay={1000} />
                TRIBE.
              </span>
            </Typist>

            {/* It’s about the <Typist cursor={{show:false}}>THRIVE</Typist>. It’s about the <Typist cursor={{show:false}}>DRIVE</Typist>. It’s about the <Typist cursor={{show:false}}>TRIBE</Typist>. */}
          </h1>
          <button
            type="button"
            className="btn btn-lg btn-cta btn-info rounded-pill my-3 mt-md-5"
            onClick={scrollToMain}
          >
            Learn More
          </button>
          {/* <Link
            to="/login"
            className="btn btn-lg btn-cta btn-info rounded-pill mt-5 mb-3"
          >
            Login
          </Link>
          <Link
            to="/login"
            className="btn btn-lg btn-cta btn-outline-info rounded-pill"
          >
            Sign up
          </Link> */}
        </div>
        <picture>
          <source srcSet={mainWebp} type="image/webp" />
          <source srcSet={mainPng} type="image/jpeg" />
          <img
            src={mainPng}
            className="hero animated fadeInRight"
            alt="background"
          />
        </picture>
      </header>

      <main className="container mt-md-3 mb-5 px-3 p-md-0" ref={scrollRef}>
        <section className="my-md-5 mx-0 p-4 p-md-5 box-sh rounded sec-desc">
          <h3 className="font-weight-600 py-2 text-uppercase">
            What’s a TRIBE here ?
          </h3>
          <hr />
          <p className="w-md-80 mt-4">
            It’s a group of free individuals with the passion & drive same as
            yours, people who are committed to making : their dream - their
            reality, their passion - their profession. People who believe that
            helping others achieve their dreams is the key to finding
            themselves. People just like YOU!
          </p>
        </section>

        <hr className="vertical" />

        <section className="row my-md-5 mx-0 p-3 p-md-5 box-sh rounded sec-desc">
          <div className="col-md-6 text-center">
            <img className="img-fluid" src={explore} alt="explore" />
          </div>
          <div className="col-md-6 overflow-hidden">
            <h3 className="font-weight-600 text-uppercase mt-4 mt-md-0 mb-3 sec-title">
              Explore and Prepare
            </h3>
            <hr className="primary" />
            <div className="font-1">
              <p>
                Finding yourselves and sharing knowledge is the foundation on
                which TRIBEECO stands.
              </p>
            </div>
            <button
              type="button"
              className="btn btn-info btn-arrow show mt-5"
              aria-label="Dive In"
              onClick={() => setState(prevState => ({ ...prevState, 1: true }))}
            >
              Dive In
              <FontAwesomeIcon icon="long-arrow-alt-right" />
            </button>
            <div
              className={`card-reveal p-3 hide-right ${state["1"] && "show"}`}
            >
              <button
                type="button"
                className="btn close"
                data-hide="reveal"
                aria-label="Close"
                onClick={() =>
                  setState(prevState => ({ ...prevState, 1: false }))
                }
              >
                <FontAwesomeIcon icon="times-circle" />
              </button>
              <p className="p-3">
                Here is some more information about this product that is only
                revealed once clicked on.
              </p>
            </div>
          </div>
        </section>

        <hr className="vertical" />
        <section className="row flex-column-reverse flex-md-row my-md-5 mx-0 p-3 p-md-5 box-sh rounded sec-desc">
          <div className="col-md-6 overflow-hidden">
            <h3 className="font-weight-600 text-uppercase mt-4 mt-md-0 mb-3 sec-title">
              Start and Fight
            </h3>
            <hr className="primary" />
            <div className="font-1">
              <p>
                The 1st step, is what it’s all about. Take that leap of faith &
                see the world backing you up instead of competing with you.
              </p>
            </div>
            <button
              type="button"
              className="btn btn-info btn-arrow show mt-5"
              aria-label="Dive In"
              onClick={() => setState(prevState => ({ ...prevState, 2: true }))}
            >
              Dive In <FontAwesomeIcon icon="long-arrow-alt-right" />
            </button>
            <div
              className={`card-reveal p-3 hide-left ${state["2"] && "show"}`}
            >
              <button
                type="button"
                className="btn close"
                data-hide="reveal"
                aria-label="Close"
                onClick={() =>
                  setState(prevState => ({ ...prevState, 2: false }))
                }
              >
                <FontAwesomeIcon icon="times-circle" />
              </button>
              <p className="p-3">
                Here is some more information about this product that is only
                revealed once clicked on.
              </p>
            </div>
          </div>
          <div className="col-md-6 text-center">
            <img className="img-fluid" src={aStart} alt="make a start" />
          </div>
        </section>

        <hr className="vertical" />
        <section className="row my-md-5 mx-0 p-3 p-md-5 box-sh rounded sec-desc">
          <div className="col-md-6 text-center">
            <img className="img-fluid" src={grow} alt="grow" />
          </div>
          <div className="col-md-6 overflow-hidden">
            <h3 className="font-weight-600 text-uppercase mt-4 mt-md-0 mb-3 sec-title">
              Grow and Shine
            </h3>
            <hr className="primary" />
            <div className="font-1">
              <p>
                And once you have the direction you need, just GROW LIKE A
                BANYAN TREE !
              </p>
            </div>
            <button
              type="button"
              className="btn btn-info btn-arrow show mt-5"
              aria-label="Dive In"
              onClick={() => setState(prevState => ({ ...prevState, 3: true }))}
            >
              Dive In <FontAwesomeIcon icon="long-arrow-alt-right" />
            </button>
            <div
              className={`card-reveal p-3 hide-right ${state["3"] && "show"}`}
            >
              <button
                type="button"
                className="btn close"
                data-hide="reveal"
                aria-label="Close"
                onClick={() =>
                  setState(prevState => ({ ...prevState, 3: false }))
                }
              >
                <FontAwesomeIcon icon="times-circle" />
              </button>
              <p className="p-3">
                Here is some more information about this product that is only
                revealed once clicked on.
              </p>
            </div>
          </div>
        </section>

        <hr className="vertical" />
        <section className="container text-center my-md-5">
          <h3 className="font-weight-bold text-uppercase mt-5">
            Take a dive with us, to a new world!
          </h3>

          <div className="mt-4 contact">
            <input
              className="form-control rounded mr-3"
              type="email"
              placeholder="Enter your email"
            />
            <button type="button" className="btn btn-info ml-3">
              Submit
            </button>
          </div>
        </section>
      </main>

      <footer className="footer mt-5 p-3">
        <div className="container">
          <span>copyright@tribeeco</span>
        </div>
      </footer>
    </div>
  );
};

function mapStateToProps(state) {
  const { auth } = state;
  const { isAuthenticated, user } = auth;

  return { isAuthenticated, user };
}

export default connect(mapStateToProps)(Landing);
