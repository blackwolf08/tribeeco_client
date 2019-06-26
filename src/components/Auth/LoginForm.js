import React from "react";
import { connect } from "react-redux";
import { loginUser } from "../../actions";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { loginSchema } from "../../utils/validations";

import { Formik, Form, Field, ErrorMessage } from "formik";

const Login = props => (
  <div className="px-2 px-lg-5 w-100" style={props.style}>
    <h2 className="text-center font-weight-bold mt-4">
      Sign in to Tribeeco
    </h2>
    <div className="pt-2 mt-1">
      <Formik
        initialValues={{
          email: "",
          password: "",
          passwordShow: false
        }}
        validationSchema={loginSchema}
        onSubmit={values => {
          props.dispatch(loginUser(values));
        }}
      >
        {({ values }) => (
          <Form className="p-4" noValidate>
            <div className="form-group">
              {/* <label htmlFor="email">Email</label> */}
              <Field
                id="email"
                type="text"
                placeholder="Email"
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

            <div className="form-group position-relative">
              {/* <label htmlFor="password">Password</label> */}
              <Field
              
                type={values.passwordShow ? "text" : "password"}
                name="password"
                placeholder="Password"
                className="form-control"
                autoComplete="current-password"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="invalid-feedback"
              />

              <label htmlFor="login-passwordShow" className="password-show-icon">
                <FontAwesomeIcon
                  icon={values.passwordShow ? "eye" : "eye-slash"}
                />
              </label>
              <Field id="login-passwordShow" name="passwordShow" type="checkbox" className="password-show-checkbox"/>
            </div>
            {props.hasError && (
              <div className="error mb-3 text-red">{props.loginErrorMessage}</div>
            )}
            <button
              type="submit"
              className="btn btn-primary btn-block btn-lg btn-loading rounded-pill mt-4"
              disabled={props.isFetching}
            >
              {props.isFetching ? (
                <FontAwesomeIcon icon="circle-notch" spin />
              ) : (
                "Login"
              )}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  </div>
);

function mapStateToProps(state) {
  const { auth } = state;
  const { isFetching, isAuthenticated, hasError, loginErrorMessage } = auth;

  return {
    isFetching,
    isAuthenticated,
    hasError,
    loginErrorMessage
  };
}

export default connect(mapStateToProps)(Login);
