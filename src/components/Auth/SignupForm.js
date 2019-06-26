import React from "react";
import { connect } from "react-redux";

import { Formik, Form, Field, ErrorMessage } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { signUpSchema } from "../../utils/validations";
import { registerUser } from "../../actions";

const SignUp = props => {
  return (
    <div className="px-2 px-lg-5 w-100" style={props.style}>
      <h2 className="text-center font-weight-bold mt-2">
        Create Account
      </h2>

      <div className="mt-1">
        <Formik
          initialValues={{
            first_name: "",
            last_name: "",
            password: "",
            email: "",
            passwordShow: false
          }}
          validationSchema={signUpSchema}
          onSubmit={values => {
            const username = values.email.substring(
              0,
              values.email.lastIndexOf("@")
            );

            props.dispatch(registerUser({ ...values, username: username }));
          }}
        >
          {({ values }) => (
            <Form className="p-4" noValidate>
              <div className="form-group">
                {/* <label htmlFor="first_name">Full Name</label> */}
                <div className="input-group">
                  <Field
                    type="text"
                    name="first_name"
                    className="form-control"
                    placeholder="First name"
                  />
                  <Field
                    type="text"
                    name="last_name"
                    className="form-control"
                    placeholder="Last name"
                  />
                </div>
                <div className="d-flex justify-content-start">
                  <ErrorMessage
                    name="first_name"
                    component="span"
                    className="invalid-feedback"
                  />
                  <ErrorMessage
                    name="last_name"
                    component="span"
                    className="invalid-feedback"
                  />
                </div>
              </div>

              <div className="form-group">
                {/* <label htmlFor="email">Email</label> */}
                <Field
                  id="email"
                  type="text"
                  name="email"
                  className="form-control"
                  placeholder="Email"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="invalid-feedback"
                />
              </div>
              <div className="form-group position-relative">
                {/* <label htmlFor="password">Password</label> */}
                <Field
                  // id="password"
                  type={values.passwordShow ? "text" : "password"}
                  name="password"
                  className="form-control"
                  placeholder="Password"
                  autoComplete="new-password"
                />
                <small id="passwordHelpBlock" className="form-text text-muted">
                  Use 8 or more characters with a mix of lowercase and uppercase
                  letters, numbers & symbols.
                </small>
                <ErrorMessage
                  name="password"
                  component="div"
                  className="invalid-feedback"
                />

                <label htmlFor="signup-passwordShow" className="password-show-icon">
                  <FontAwesomeIcon
                    icon={values.passwordShow ? "eye" : "eye-slash"}
                  />
                </label>
                <Field id="signup-passwordShow" name="passwordShow" type="checkbox"  className="password-show-checkbox"/>
              </div>
              {props.hasError && (
                <div className="error mb-3 text-red">
                  {props.registerErrorMessage}
                </div>
              )}
              <button
                type="submit"
                className="btn btn-primary btn-block btn-lg btn-loading rounded-pill"
                disabled={props.isFetching}
              >
                {props.isFetching ? (
                  <FontAwesomeIcon icon="circle-notch" spin />
                ) : (
                  "Sign Up"
                )}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  const { auth } = state;
  const {
    isFetching,
    isAuthenticated,
    hasError,
    registerErrorMessage
  } = auth;

  return {
    isFetching,
    isAuthenticated,
    hasError,
    registerErrorMessage
  };
}

export default connect(mapStateToProps)(SignUp);
