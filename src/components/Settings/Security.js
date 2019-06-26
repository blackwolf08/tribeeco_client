import React from "react";

import { Formik, Form, Field, ErrorMessage } from "formik";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import axios from "../../utils/axios";
import { changePasswordSchema } from "../../utils/validations";

const initialValues = { passwordOld: "", newpassword: "", passwordConfirm: "" };

const Security = () => (
  <div className="">
    <h4 className="p-4 border-bottom">Security and Login</h4>
    <div className="px-4 py-4">
      <h5 className="font-weight-bold">Change Password</h5>
      <Formik
        initialValues={initialValues}
        validationSchema={changePasswordSchema}
        onSubmit={(values, { setSubmitting, resetForm, setStatus }) => {
          console.log(values);
          axios
            .patch("updatepassword", values)
            .then(res => {
              resetForm(initialValues);
              setStatus({ submitted: true });
            })
            .catch(err => {
              console.log(err);
            });
          setSubmitting(false);
        }}
      >
        {({ isSubmitting, status }) => (
          <Form className="my-4">
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="passwordOld">Old Password</label>
                <Field
                  id="passwordOld"
                  type="password"
                  name="passwordOld"
                  className="form-control"
                />
                <ErrorMessage
                  name="passwordOld"
                  component="div"
                  className="invalid-feedback"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="newpassword">New Password</label>
                <Field
                  id="newpassword"
                  type="password"
                  name="newpassword"
                  className="form-control"
                />
                <ErrorMessage
                  name="newpassword"
                  component="div"
                  className="invalid-feedback"
                />
              </div>

              <div className="form-group col-md-6">
                <label htmlFor="passwordConfirm">Confirm Password</label>
                <Field
                  id="passwordConfirm"
                  type="password"
                  name="passwordConfirm"
                  className="form-control"
                />
                <ErrorMessage
                  name="passwordConfirm"
                  component="div"
                  className="invalid-feedback"
                />
              </div>
            </div>
            <small className="form-text text-muted mb-3">
              Use 8 or more characters with a mix of lowercase and uppercase
              letters, numbers & symbols.
            </small>

            <button
              type="submit"
              className="btn btn-info"
              disabled={isSubmitting}
            >
              {isSubmitting && <FontAwesomeIcon icon="circle-notch" spin />}{" "}
              Update Password
            </button>
            {status && status.submitted && (
              <div className="text-success mt-3">Password updated.</div>
            )}
          </Form>
        )}
      </Formik>

      {/* <h5 className="font-weight-bold delimiter-top mt-5 mb-3 pt-5 text-danger">
        Delete Account
      </h5>
      <p>
        This wont't delete your account permanently. You can restore your
        account within 30 days.
      </p>
      <button type="button" className="btn btn-danger mt-3">
        Delete Account
      </button> */}
    </div>
  </div>
);
export default Security;
