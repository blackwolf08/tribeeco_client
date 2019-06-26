import React, { Component } from "react";
import { NavLink } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


import auth from "../utils/auth";
import { loginSchema } from "../utils/validations";

import { Formik, Form, Field, ErrorMessage } from "formik";

import { GoogleLogin } from "react-google-login";
// import LinkedinSDK from "react-linkedin-sdk";

// import { LinkedIn } from "react-linkedin-login-oauth2";

import axios from "../utils/axios";

class Login extends Component {
  state = {
    showError: false,
    isGoogleSubmitting: false,
    isLinkedinSubmitting: false
  };
  responseGoogle = res => {
    if (res.error) {
      console.log(res.error);
    } else {
      this.setState({ isGoogleSubmitting: true });
      console.log("res", res);
      axios
        .post("auth/token", {
          type: "google",
          code: res.Zi.id_token
        })
        .then(res => {
          console.log(res);
          return axios.get("myprofile");
        })
        .then(res => {
          this.setProfile(res.data);
          this.props.onSuccessfulLogin(res.data);
        })
        .catch(err => {
          console.log(err);
        });
    }
  };
  responseLinkedin = res => {
    this.setState({ isLinkedinSubmitting: true });
    console.log(res);
  };
  render() {
    return (
      <div className="auth-wrapper">
        <h2 className="text-center font-weight-bold mt-4">Login</h2>
        <h5 className="text-center" style={{ fontWeight: "500" }}>
          It's good to see you back!
        </h5>
        <div className="wrapper form-container pt-2 mt-3">
          <Formik
            initialValues={{
              email: "",
              password: ""
            }}
            validationSchema={loginSchema}
            onSubmit={(values, { setSubmitting }) => {
              auth
                .login(values)
                .then(res => {
                  this.props.onSuccessfulLogin(res.data);
                })
                .catch(err => {
                  console.log(err);
                  this.setState({
                    showError: true
                  });
                });
              setSubmitting(false);
            }}
          >
            {({ isSubmitting }) => (
              <Form className="form-signin p-4" noValidate>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <Field
                    id="email"
                    type="text"
                    placeholder="Enter email"
                    autoComplete="username"
                    name="email"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <Field
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    className="form-control"
                    autoComplete="current-password"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>
                {this.state.showError && (
                  <div className="error mb-3 text-red">
                    Wrong username/password. Please try again.
                  </div>
                )}
                <button
                  type="submit"
                  className="btn btn-info btn-block btn-lg btn-loading rounded-pill"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <FontAwesomeIcon icon="circle-notch" spin />
                  ) : (
                    "Login"
                  )}
                </button>
              </Form>
            )}
          </Formik>
          <h5 className="font-weight-600 delimiter-top mt-2 pt-3 text-center">
            Login with:
          </h5>
          <div className="text-center d-flex justify-content-around py-3">
            <GoogleLogin
              // clientId={process.env.GOOGLE_CLIENT_ID}
              clientId="353569807670-ljaj9pedb9aipbi6kr9c4nivjd1lrco3.apps.googleusercontent.com"
              // clientId="407408718192.apps.googleusercontent.com"
              buttonText="Google"
              onSuccess={this.responseGoogle}
              onFailure={this.responseGoogle}
              responseType="id_token"
            />
            {/* <LinkedIn
              clientId={process.env.LINKEDIN_CLIENT_ID}
              onFailure={this.responseLinkedin}
              onSuccess={this.responseLinkedin}
              buttonText=""
              redirectUri={`${window.location.origin}/linkedin`}
            >
              <FontAwesomeIcon
                icon={["fab", "linkedin-in"]}
                style={{ strokeWidth: "0" }}
                className="mr-2"
              />
              LinkedIn
            </LinkedIn> */}
          </div>
          <p className="text-center text-muted pt-2">
            Dont have an account? <NavLink to="/signup">Sign Up</NavLink>
          </p>
        </div>
      </div>
    );
  }
}
export default Login;
