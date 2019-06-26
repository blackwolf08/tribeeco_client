import React from "react";
import { Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { Spring, Transition, config } from "react-spring/renderprops";
import Media from "react-media";

import NavBar from "../components/Navbar/Navbar";
import LoginForm from "../components/Auth/LoginForm";
import SignupForm from "../components/Auth/SignupForm";

import { ROUTES } from "../constants";

class Auth extends React.Component {
  state = { selected: this.props.selected };

  onClick = name => () => this.setState({ selected: name });

  render() {
    const { selected } = this.state;
    const login = selected === "login";

    if (this.props.isAuthenticated) {
      if (this.props.location.pathname !== "/signup")
        return <Redirect to={{ pathname: ROUTES.HOME }} />;
    }

    if (this.props.registerSuccess) {
      return <Redirect to={ROUTES.NEW_USER} />;
    }

    return (
      <>
        <NavBar />
        <div className="login-page">
          <Media query="(min-width: 992px)">
            {matches =>
              matches ? (
                <div className="box-back d-flex">
                  <div className="w-50">
                    <Transition
                      items={login}
                      from={{
                        position: "absolute",
                        transform: !login
                          ? "translateX(500px)"
                          : "translateX(400px)"
                      }}
                      enter={{
                        transform: !login
                          ? "translateX(0px)"
                          : "translateX(600px)"
                      }}
                      leave={{
                        transform: !login
                          ? "translateX(300px)"
                          : "translateX(300px)"
                      }}
                    >
                      {login =>
                        !login
                          ? props => (
                              <div style={props}>
                                <h4 className="text-uppercase font-weight-bold">
                                  Welcome back!
                                </h4>
                                <div>It's good to see you again!</div>
                                <button
                                  className="btn btn-outline-primary rounded-pill mt-3"
                                  onClick={this.onClick("login")}
                                >
                                  Log In
                                </button>
                              </div>
                            )
                          : props => (
                              <div className="text-right" style={props}>
                                <h4 className="text-uppercase font-weight-bold">
                                  Hello there!
                                </h4>
                                <div className="">Join your tribe.</div>
                                <button
                                  className="btn btn-outline-primary rounded-pill mt-3"
                                  onClick={this.onClick("signup")}
                                >
                                  Sign Up
                                </button>
                              </div>
                            )
                      }
                    </Transition>
                  </div>
                  <Spring to={{ x: login ? 0 : 300 }} config={config.slow}>
                    {props => (
                      <div
                        className="box-front box-shadow"
                        style={{
                          transform: `translateX(${props.x}px)`
                        }}
                      >
                        <Transition
                          items={login}
                          from={{
                            position: "absolute",
                            left: login ? "-500px" : "500px"
                          }}
                          enter={{ left: "0px" }}
                          leave={{ display: "none" }}
                        >
                          {login =>
                            login
                              ? props => <LoginForm style={props} />
                              : props => <SignupForm style={props} />
                          }
                        </Transition>
                      </div>
                    )}
                  </Spring>
                </div>
              ) : (
                <>
                  <div className="box-front box-shadow">
                    <Transition
                      items={login}
                      from={{
                        position: "absolute",
                        transform: login
                          ? "translateX(-500px)"
                          : "translateX(500px)"
                      }}
                      enter={{ transform: "translateX(0px)" }}
                      leave={{ display: "none" }}
                    >
                      {login =>
                        login
                          ? props => <LoginForm style={props} />
                          : props => <SignupForm style={props} />
                      }
                    </Transition>
                  </div>

                  <div className="text-center mt-3">
                    {login ? (
                      <>
                        Dont have an account?
                        <button
                          className="btn btn-link text-primary"
                          onClick={this.onClick("signup")}
                        >
                          Sign Up
                        </button>
                      </>
                    ) : (
                      <>
                        Already registered?
                        <button
                          className="btn btn-link text-primary"
                          onClick={this.onClick("login")}
                        >
                          Log In
                        </button>
                      </>
                    )}
                  </div>
                </>
              )
            }
          </Media>
        </div>
      </>
    );
  }
}
function mapStateToProps(state) {
  const { auth } = state;
  const { isAuthenticated, registerSuccess } = auth;

  return { isAuthenticated, registerSuccess };
}

export default withRouter(connect(mapStateToProps)(Auth));
