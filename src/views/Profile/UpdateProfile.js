import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import TagsInput from "react-tagsinput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import axios from "../../utils/axios";

import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";

class UpdateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // id: null,
      data: null,
      socialLinks: [],
      updated: false
    };
  }
  componentDidMount() {
    axios
      .get(`profile/${this.props.id}`)
      .then(res => {
        // console.log(res.data);
        // console.log(JSON.parse(res.data.socialLinks[0]));
        let links;
        if (res.data.links) links = res.data.links;
        else links = [];
        // console.log(links);

        this.setState({ data: res.data, socialLinks: links });
      })
      .catch(err => {
        console.log(err);
      });
  }
  render() {
    const { updated, data, socialLinks } = this.state;
    // console.log(data)

    if (this.state.updated) {
      return <Redirect to={`/profile/${this.props.id}`} />;
    }

    return (
      <div className="profile p-4 bg-secondary">
        <div className="card update-profile-form card-custom box-shadow mb-4">
          <h5 className="card-header text-center">
            Update Profile <hr className="mx-auto" />
          </h5>
          <div className="card-body">
            {data && (
              <Formik
                initialValues={initialValues(data, socialLinks)}
                // validationSchema={signUpSchema}
                onSubmit={(values, { setSubmitting }) => {
                  console.log(values);

                  axios
                    .patch("updateprofile", values)
                    .then(res => {
                      console.log(res);
                      this.setState({ updated: true });
                    })
                    .catch(err => {
                      console.log(err);
                    });
                  setSubmitting(false);
                }}
              >
                {({ values, isSubmitting, setFieldValue }) => (
                  <Form className="p-4">
                    <div className="form-group">
                      <label htmlFor="about">About</label>
                      <Field
                        id="about"
                        type="text"
                        name="about"
                        className="form-control"
                      />
                      <ErrorMessage
                        name="about"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="city">City</label>
                      <Field
                        id="location"
                        type="text"
                        name="location"
                        className="form-control"
                      />
                      <ErrorMessage
                        name="location"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="country">Country</label>
                      <Field
                        id="country"
                        type="text"
                        name="country"
                        className="form-control"
                      />
                      <ErrorMessage
                        name="country"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="Professional_Headline">Headline</label>
                      <Field
                        id="Professional_Headline"
                        type="text"
                        name="Professional_Headline"
                        className="form-control"
                      />
                      <ErrorMessage
                        name="Professional_Headline"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="interests">Interests</label>
                      <div className=" p-0">
                        <TagsInput
                          id="interests"
                          value={values.interests}
                          onChange={value => setFieldValue("interests", value)}
                          onlyUnique={true}
                        />
                      </div>
                    </div>

                    <FieldArray
                      name="links"
                      render={arrayHelpers =>
                        Object.keys(values.links).map((item, idx) => (
                          <div className="form-group" key={idx}>
                            <label
                              htmlFor={`links.${idx}`}
                              className="text-capitalize"
                            >
                              {item}
                            </label>
                            <Field
                              id={`links.${item}`}
                              type="text"
                              name={`links.${item}`}
                              className="form-control"
                            />
                            <ErrorMessage
                              name={`links.${item}`}
                              component="div"
                              className="invalid-feedback"
                            />
                          </div>
                        ))
                      }
                    />
                    <div className="d-flex align-items-center mt-4">
                      <button
                        type="submit"
                        className="btn btn-info mx-3 btn-loading rounded-pill"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <FontAwesomeIcon icon="circle-notch" spin />
                        ) : (
                          "Update"
                        )}
                      </button>
                      {updated && (
                        <span className="text-success"> Profile Updated.</span>
                      )}
                    </div>
                  </Form>
                )}
              </Formik>
            )}
          </div>
        </div>
      </div>
    );
  }
}

function initialValues(data, links_) {
  return {
    about: data.about || "",
    location: data.location || "",
    country: data.country || "",
    interests: data.interests || [],
    Professional_Headline: data.Professional_Headline || "",
    links: {
      facebook: links_.facebook || "",
      linkedin: links_.linkedin || "",
      twitter: links_.twitter || "",
      github: links_.github || "",
      instagram: links_.instagram || "",
      website: links_.website || ""
    }
  };
}

function mapStateToProps(state) {
  const { auth } = state;
  const { user } = auth;
  const { id } = user;

  return {
    id
  };
}

export default connect(mapStateToProps)(UpdateProfile);
