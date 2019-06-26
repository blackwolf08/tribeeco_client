import React from "react";
import { connect } from "react-redux";
import TagsInput from "react-tagsinput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import MaskedInput from "react-input-mask";

import axios from "../../utils/axios";
import { updateProfileSchema } from "../../utils/validations";
import { updateProfile } from "../../actions";

import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";

const socialOptions = [
  "Facebook",
  "Linkedin",
  "Twitter",
  "Instagram",
  "Github"
];
const initialExperience = {
  idx: "",
  title: "",
  company: "",
  location: "",
  description: "",
  startDate: "",
  endDate: "",
  current: false
};

const UpdateProfile = ({ data, socialLinks, dispatch, id, history }) => {
  const handleDayChange = (name, value, setFieldValue) => {
    const date = new Date(value);
    setFieldValue(name, date.toLocaleDateString("en-US").replace(/\//g, "-"));
  };
  return (
    <div className="container profile-update p-4 bg-secondary">
      <div className="card card-custom box-shadow mb-4 p-4">
        <div className="card-header">
          <h3 className="font-weight-bold mb-2">About You</h3>
          <h6>
            Tell us who you are! You can modify your personal information here.
          </h6>
        </div>
        <div className="card-body pt-5">
          {data && (
            <Formik
              initialValues={initialValues(data, socialLinks)}
              validationSchema={updateProfileSchema}
              onSubmit={(values, { setSubmitting }) => {
                setSubmitting(true);

                let socialLinks_ = {};
                values.links.map(item => {
                  if (item.url != "") socialLinks_[item.name] = item.url;
                });

                console.log("values", values.experience);

                axios
                  .patch("updateprofile", { ...values, links: socialLinks_ })
                  .then(res => {
                    dispatch(updateProfile(res.data));

                    setTimeout(() => {
                      setSubmitting(false);
                      history.push(`/profile/${id}`);
                    }, 1500);
                  })
                  .catch(err => {
                    console.log(err);
                  });
              }}
            >
              {({ values, isSubmitting, setFieldValue }) => (
                <Form>
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label htmlFor="first_name">First Name</label>
                      <Field
                        id="first_name"
                        type="text"
                        name="first_name"
                        className="form-control"
                      />
                      <ErrorMessage
                        name="first_name"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>
                    <div className="form-group col-md-6">
                      <label htmlFor="last_name">Last Name</label>
                      <Field
                        id="last_name"
                        type="text"
                        name="last_name"
                        className="form-control"
                      />
                      <ErrorMessage
                        name="last_name"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label htmlFor="phone">Phone Number</label>
                      <Field
                        id="phone"
                        type="text"
                        name="phone"
                        className="form-control"
                      />
                      <ErrorMessage
                        name="phone"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>

                    <div className="form-group col-md-6">
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
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-6 ">
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

                    <div className="form-group col-md-6">
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
                  </div>
                  <div className="form-group">
                    <label htmlFor="about">About</label>
                    <Field
                      component="textarea"
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
                    <label htmlFor="interests">Interests</label>
                    <div className=" p-0">
                      <TagsInput
                        id="interests"
                        value={values.interests}
                        onChange={value => setFieldValue("interests", value)}
                        onlyUnique={true}
                        inputProps={{ placeholder: "Add an interest" }}
                      />
                    </div>
                  </div>

                  <FieldArray
                    name="links"
                    render={arrayHelpers => (
                      <div className="form-group row">
                        <label
                          htmlFor="links"
                          className="col-sm-3 col-form-label"
                        >
                          Social Links
                        </label>
                        <div className="col-sm-9 d-flex">
                          <div className="w-100">
                            {values.links && values.links.length > 0 ? (
                              values.links.map((link, index) => (
                                <div key={index} className="input-group mb-2">
                                  <Field
                                    name={`links[${index}].name`}
                                    component="select"
                                    className="form-control"
                                    default="facebook"
                                  >
                                    {socialOptions.map(item => (
                                      <option
                                        value={item}
                                        defaultValue={"Facebook"}
                                        // selected={
                                        //   item == values.links[index].name
                                        // }
                                      >
                                        {item}
                                      </option>
                                    ))}
                                  </Field>
                                  <Field
                                    name={`links[${index}].url`}
                                    className="form-control"
                                    placeholder={`Enter here`}
                                  />
                                  <div className="input-group-append">
                                    <button
                                      type="button"
                                      className="btn"
                                      onClick={() => arrayHelpers.remove(index)}
                                    >
                                      <FontAwesomeIcon
                                        icon="times-circle"
                                        style={{
                                          color: "#707070"
                                        }}
                                      />
                                    </button>
                                  </div>
                                </div>
                              ))
                            ) : (
                              <button
                                type="button"
                                className="btn btn-light"
                                onClick={() =>
                                  arrayHelpers.push({
                                    name: "Facebook",
                                    url: ""
                                  })
                                }
                              >
                                Add a link
                              </button>
                            )}
                          </div>
                          <button
                            type="button"
                            className="btn"
                            onClick={() =>
                              arrayHelpers.push({
                                name: "Facebook",
                                url: ""
                              })
                            }
                          >
                            <FontAwesomeIcon
                              icon="plus"
                              style={{ color: "#707070" }}
                            />
                          </button>
                        </div>
                      </div>
                    )}
                  />

                  <FieldArray
                    name="experience"
                    render={arrayHelpers => (
                      <div className="form-group row">
                        <label
                          htmlFor="experience"
                          className="col-sm-3 col-form-label"
                        >
                          Work Experience
                        </label>
                        <div className="col-sm-9 d-flex align-items-baseline">
                          <div className="flex-grow-1">
                            {values.experience &&
                            values.experience.length > 0 ? (
                              values.experience.map((experience, index) => (
                                <div
                                  key={index}
                                  className="d-flex mb-2 align-items-baseline"
                                >
                                  <div className="flex-grow-1">
                                    <div className="form-group">
                                      <label className="">Title</label>
                                      <Field
                                        name={`experience[${index}].title`}
                                        className="form-control "
                                        placeholder={``}
                                      />
                                    </div>

                                    <div className="form-group">
                                      <label>Company Name</label>
                                      <Field
                                        name={`experience[${index}].company`}
                                        className="form-control"
                                        placeholder={``}
                                      />
                                    </div>
                                    <div className="form-group">
                                      <label>Location</label>
                                      <Field
                                        name={`experience[${index}].location`}
                                        className="form-control"
                                        placeholder={``}
                                      />
                                    </div>
                                    <div className="form-group form-check">
                                      <Field
                                        name={`experience[${index}].current`}
                                        render={({ field }) => (
                                          <input
                                            {...field}
                                            id="checkbox-current"
                                            type="checkbox"
                                            className="form-check-input"
                                            checked={
                                              values.experience[index].current
                                            }
                                          />
                                        )}
                                      />
                                      <label
                                        className="form-check-label"
                                        for="checkbox-current"
                                      >
                                        I currently work here.
                                      </label>
                                    </div>

                                    <div className="form-group">
                                      <label className="mr-2">Start Date</label>
                                      <Field
                                        name={`experience.${index}.startDate`}
                                        type="date"
                                        render={({ field }) => (
                                          <DayPickerInput
                                            {...field}
                                            onDayChange={value =>
                                              handleDayChange(
                                                `experience.${index}.startDate`,
                                                value,
                                                setFieldValue
                                              )
                                            }
                                            inputProps={{
                                              className: "form-control"
                                            }}
                                          />
                                        )}
                                      />
                                    </div>
                                    {!experience.current && (
                                      <div className="form-group">
                                        <label className="mr-2">End Date</label>

                                        <Field
                                          name={`experience.${index}.endDate`}
                                          type="date"
                                          render={({ field }) => (
                                            <DayPickerInput
                                              {...field}
                                              onDayChange={value =>
                                                handleDayChange(
                                                  `experience.${index}.endDate`,
                                                  value,
                                                  setFieldValue
                                                )
                                              }
                                              inputProps={{
                                                className: "form-control"
                                              }}
                                            />
                                          )}
                                        />
                                      </div>
                                    )}

                                    <div className="form-group">
                                      <label>Description</label>
                                      <Field
                                        name={`experience[${index}].description`}
                                        className="form-control"
                                        placeholder={``}
                                      />
                                    </div>
                                  </div>
                                  <button
                                    type="button"
                                    className="btn"
                                    onClick={() => arrayHelpers.remove(index)}
                                  >
                                    <FontAwesomeIcon
                                      icon="times-circle"
                                      style={{
                                        color: "#707070"
                                      }}
                                    />
                                  </button>
                                </div>
                              ))
                            ) : (
                              <button
                                type="button"
                                className="btn btn-light"
                                onClick={() =>
                                  arrayHelpers.push(initialExperience)
                                }
                              >
                                Add a position
                              </button>
                            )}
                          </div>
                          <button
                            type="button"
                            className="btn"
                            onClick={() => arrayHelpers.push(initialExperience)}
                          >
                            <FontAwesomeIcon
                              icon="plus"
                              style={{ color: "#707070" }}
                            />
                          </button>
                        </div>
                      </div>
                    )}
                  />

                  <button
                    type="submit"
                    className="btn btn-info btn-loading rounded-pill mt-3"
                    disabled={isSubmitting}
                  >
                    Save Changes{" "}
                    {isSubmitting && (
                      <FontAwesomeIcon icon="circle-notch" spin />
                    )}
                  </button>
                  {/* {updated && (
                        <span className="text-success"> Profile Updated.</span>
                      )} */}
                </Form>
              )}
            </Formik>
          )}
        </div>
      </div>
    </div>
  );
};

function initialValues(data, links_) {
  let socialLinks = [];

  links_ &&
    Object.keys(links_).map(item => {
      socialLinks.push({ name: item, url: links_[item] });
    });

  const experience = [initialExperience];

  return {
    first_name: data.first_name,
    last_name: data.last_name,
    phone: data.phone,

    about: data.about || "",
    location: data.location || "",
    country: data.country || "",
    interests: data.interests || [],
    Professional_Headline: data.Professional_Headline || "",
    links: socialLinks,
    experience: data.experience
    // links: {
    //   facebook: links_.facebook || "",
    //   linkedin: links_.linkedin || "",
    //   twitter: links_.twitter || "",
    //   github: links_.github || "",
    //   instagram: links_.instagram || "",
    //   website: links_.website || ""
    // }
  };
}

function mapStateToProps(state) {
  const { auth } = state;
  const { user } = auth;
  const { id } = user;

  return {
    id,
    data: user,
    socialLinks: user.links
  };
}

export default connect(mapStateToProps)(UpdateProfile);
