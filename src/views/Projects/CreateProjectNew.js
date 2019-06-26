import React, { Component } from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Formik, Form, Field, FieldArray, ErrorMessage, getIn } from "formik";
import MaskedInput from "react-input-mask";

import Autocomplete from "../../components/Common/Autocomplete";
import TagsInput from "react-tagsinput";

import SmProfileCard from "../../components/Common/SmProfileCard";

import axios from "../../utils/axios";
import { createProjectSchema } from "../../utils/validations";

const DateErrorMessage = ({ name }) => (
  <Field
    name={name}
    render={({ form }) => {
      const error = getIn(form.errors, name);
      const touch = getIn(form.touched, name);
      return touch && error ? (
        <div className="invalid-feedback">Invalid Date</div>
      ) : null;
    }}
  />
);
const ImageUpload = props => {
  const onChange = e => {
    let reader = new FileReader();
    let file = e.target.files[0];

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      props.setImage(reader.result, file);
    };
  };

  return (
    <>
      <input
        id="project-picture"
        type="file"
        onChange={onChange}
        accept="image/x-png,image/jpeg,image/jpg"
      />
    </>
  );
};

const initialValues = {
  title: "",
  vision: "",
  body: "",
  // resources: "",
  // stage: [""],
  schedule: [{ target: "", timeline: "" }],
  tags: [],
  // members: [{ name: "", id: "", role: "" }],
  currentMember: { id: "", role: "member", fullname: "" },
  socialLinks: [""]
};

class CreateProject extends Component {
  state = {
    step: 2,
    created: false,
    connections: [],
    projectId: null,
    previewURL: null,
    imageFile: null,
    selectedMembers: []
  };
  componentDidMount() {
    axios
      .get("myconnections")
      .then(res => {
        this.setState({ connections: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  }
  handleSuggestionsAdd = id => {
    console.log(id);
  };
  previousStep = () => {
    this.setState(prevState => ({ step: prevState.step - 1 }));
  };

  toSecondStep = (setFieldTouched, values) => {
    if (values.title === "" || values.vision === "") {
      setFieldTouched("title");
      setFieldTouched("vision");
    } else this.setState({ step: 1 });
  };
  nextStep = () => {
    this.setState({ step: 2 });
  };

  setImage = (previewURL, imageFile) => {
    this.setState({ previewURL, imageFile });
  };
  addMember = values => {
    console.log(values);
    this.setState(prevState => ({
      selectedMembers: [...prevState.selectedMembers, values]
    }));
  };
  render() {
    const {
      connections,
      step,
      created,
      projectId,
      selectedMembers
    } = this.state;
    const showFirst = step === 0;
    const showSecond = step === 1;
    const showThird = step === 2;
    console.log("selectedMembers", selectedMembers);
    return (
      <div className="min-h bg-secondary">
        <h4 className="text-center font-weight-bold text-dark pt-3 my-3">
          Create a New Project
        </h4>

        <div className="project-form container">
          <Formik
            // validateOnBlur={false}
            initialValues={initialValues}
            validationSchema={createProjectSchema}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              let _values = { ...values };

              if (_values.tags.length === 0) _values.tags = [""];

              if (_values.schedule[0].target === "") {
                _values.schedule = [];
              }

              const payload = {
                ..._values,
                stage: [""]
              };
              const file = this.state.imageFile;

              axios
                .post("addproject", payload)
                .then(res => {
                  console.log(res);

                  if (file) {
                    const formData = new FormData();
                    formData.append("files", file, file.name);

                    axios
                      .post(`addprojectimage/${res.data.id}`, formData)
                      .then(res => {
                        console.log("image", res);
                      })
                      .catch(err => {
                        console.log(err);
                      });
                  }

                  this.setState({ projectId: res.data.id, created: true });
                  resetForm(initialValues);
                })
                .catch(err => {
                  console.log(err);
                });

              setSubmitting(false);
            }}
          >
            {({ values, setFieldValue, setFieldTouched, errors }) => (
              <>
                <div className="steps">
                  <Step stage={step} idx={0} />

                  <div className="mx-4">
                    <hr />
                  </div>
                  <Step stage={step} idx={1} />
                  <div className="mx-4">
                    <hr />
                  </div>
                  <Step stage={step} idx={2} />
                </div>

                <Form className="card box-shadow mt-4" id="create-project">
                  {created ? (
                    <div className="text-center font-weight-bold pt-5">
                      <h4 className="mb-3">Project created successfully</h4>
                      <Link to={`/project/${projectId}`} className="link">
                        Go to project page
                      </Link>
                    </div>
                  ) : (
                    <>
                      <div className="card-body p-md-5">
                        {showFirst && (
                          <div>
                            <div className="form-group row">
                              <label
                                htmlFor="title"
                                className="col-sm-3 col-form-label"
                              >
                                Title
                              </label>
                              <div className="col-sm-9 p-0">
                                <Field
                                  id="title"
                                  type="text"
                                  name="title"
                                  className="form-control"
                                  maxLength="60"
                                />
                                <ErrorMessage
                                  name="title"
                                  component="div"
                                  className="invalid-feedback"
                                />
                              </div>
                            </div>

                            <div className="form-group row">
                              <label
                                htmlFor="vision"
                                className="col-sm-3 col-form-label"
                              >
                                Short Description
                              </label>
                              <div className="col-sm-9 p-0">
                                <Field
                                  id="vision"
                                  component="textarea"
                                  name="vision"
                                  className="form-control"
                                  maxLength="150" // Do this by yum with messages
                                  rows="4"
                                />
                                <ErrorMessage
                                  name="vision"
                                  component="div"
                                  className="invalid-feedback"
                                />
                              </div>
                            </div>

                            <div className="form-group row">
                              <label
                                htmlFor="tags"
                                className="col-sm-3 col-form-label"
                              >
                                Tags
                              </label>
                              <div className="col-sm-9 p-0">
                                <TagsInput
                                  id="tags"
                                  value={values.tags}
                                  onChange={value =>
                                    setFieldValue("tags", value)
                                  }
                                  onlyUnique={true}
                                />
                              </div>
                            </div>

                            <div className="form-group row">
                              <label
                                htmlFor="body"
                                className="col-sm-3 col-form-label"
                              >
                                Full Description
                              </label>
                              <Field
                                id="body"
                                component="textarea"
                                name="body"
                                className="form-control col-sm-9"
                                rows="4"
                              />
                              <ErrorMessage
                                name="body"
                                component="div"
                                className="invalid-feedback"
                              />
                            </div>
                          </div>
                        )}

                        {showSecond && (
                          <div>
                            <FieldArray
                              name="schedule"
                              render={arrayHelpers => (
                                <div className="form-group row">
                                  <label
                                    htmlFor="schedule"
                                    className="col-sm-3 col-form-label"
                                  >
                                    Stages
                                  </label>
                                  <div className="col-sm-9 d-flex justify-content-between">
                                    <div>
                                      {values.schedule &&
                                      values.schedule.length > 0 ? (
                                        values.schedule.map((item, index) => (
                                          <div
                                            key={index}
                                            className="d-md-flex flex-wrap mb-2"
                                          >
                                            <Field
                                              name={`schedule.${index}.target`}
                                              className="form-control flex-30"
                                              placeholder={`Target ${index +
                                                1}`}
                                            />
                                            <div>
                                              <Field
                                                name={`schedule.${index}.timeline`}
                                                render={({ field }) => (
                                                  <MaskedInput
                                                    {...field}
                                                    mask="99-99-9999"
                                                    placeholder="MM-dd-yyyy"
                                                    className="form-control flex-30"
                                                    autoComplete="off"
                                                  />
                                                )}
                                              />
                                              <DateErrorMessage
                                                name={`schedule.${index}.timeline`}
                                              />
                                            </div>
                                            <Field
                                              name={`schedule.${index}.achieved`}
                                              component="select"
                                              placeholder="Achieved"
                                              className="form-control flex-30"
                                              defaultValue=""
                                            >
                                              <option value="" disabled hidden>
                                                Achieved
                                              </option>
                                              <option value="yes">Yes</option>
                                              <option value="no">No</option>
                                            </Field>
                                          </div>
                                        ))
                                      ) : (
                                        <button
                                          type="button"
                                          className="btn btn-info"
                                          onClick={() =>
                                            arrayHelpers.push({
                                              target: "",
                                              timeline: "",
                                              achieved: ""
                                            })
                                          }
                                        >
                                          Add a target
                                        </button>
                                      )}
                                    </div>
                                    <button
                                      type="button"
                                      className="btn"
                                      onClick={() =>
                                        arrayHelpers.push({
                                          target: "",
                                          timeline: "",
                                          achieved: ""
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
                              name="socialLinks"
                              render={arrayHelpers => (
                                // <div className="form-group d-flex justify-content-between align-items-baseline">
                                <div className="form-group row">
                                  <label
                                    htmlFor="socialLinks"
                                    className="col-sm-3 col-form-label"
                                  >
                                    Social Links
                                  </label>
                                  <div className="col-sm-9 d-flex">
                                    <div className="w-100">
                                      {values.socialLinks &&
                                      values.socialLinks.length > 0 ? (
                                        values.socialLinks.map(
                                          (link, index) => (
                                            <div
                                              key={index}
                                              className="input-group mb-2"
                                            >
                                              <Field
                                                name={`socialLinks.${index}`}
                                                className="form-control"
                                                placeholder={`Link ${index +
                                                  1}`}
                                              />
                                              <div className="input-group-append">
                                                <button
                                                  type="button"
                                                  className="btn"
                                                  onClick={() =>
                                                    arrayHelpers.remove(index)
                                                  }
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
                                          )
                                        )
                                      ) : (
                                        <button
                                          type="button"
                                          className="btn btn-info"
                                          onClick={() => arrayHelpers.push("")}
                                        >
                                          Add a link
                                        </button>
                                      )}
                                    </div>{" "}
                                    <button
                                      type="button"
                                      className="btn"
                                      onClick={() => arrayHelpers.push("")}
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
                            <div className="form-group row ">
                              <label
                                htmlFor=""
                                className="col-sm-3 col-form-label"
                              >
                                Cover Photo
                              </label>

                              <div className="col-sm-9 ">
                                <ImageUpload setImage={this.setImage} />
                              </div>
                            </div>
                          </div>
                        )}

                        {showThird && (
                          <div className="row">
                            <div className="form-group col-md-7">
                              <label
                                htmlFor="members"
                                className="col-sm-3 col-form-label"
                              >
                                Team
                              </label>
                              <div className="col-sm-9 d-flex">
                                <Autocomplete
                                  // key={index}
                                  id="members"
                                  allItems={connections}
                                  value={values.currentMember} // ????
                                  // index={index}
                                  onChange={setFieldValue}
                                  className="flex-30"
                                />

                                <Field
                                  name="currentMember.role"
                                  component="select"
                                  // className="form-control flex-30"
                                  className="form-control"
                                  style={{ width: "130px" }}
                                >
                                  <option value="member" default>
                                    Member
                                  </option>
                                  <option value="creator">Creator</option>
                                  <option value="collaborator">
                                    Collaborator
                                  </option>
                                  <option value="allies">Allies</option>
                                </Field>
                                <button
                                  type="button"
                                  className="btn"
                                  onClick={() =>
                                    this.addMember(values.currentMember)
                                  }
                                >
                                  <FontAwesomeIcon
                                    icon="plus"
                                    style={{ color: "#707070" }}
                                  />
                                </button>
                              </div>
                              <div className="mt-5">
                                <h5>Selected Members</h5>
                                {selectedMembers.length > 0 &&
                                  selectedMembers.map(item => (
                                    <div className="d-flex">
                                      {item.fullname}, {item.role}
                                    </div>
                                  ))}
                              </div>
                            </div>

                            <div className="col-md-5">
                              <div className="card card-custom p-2 suggestions-card mb-3">
                                <h5 className="card-header">
                                  Suggested Teammates
                                </h5>
                                <div className="card-body">
                                  {connections && connections.length > 0 ? (
                                    connections
                                      .slice(0, 5)
                                      .map((x, i) => (
                                        <SmProfileCard
                                          key={i}
                                          name={x.fullname}
                                          headline={x.Professional_Headline}
                                          id={x.id}
                                          handleClick={setFieldValue}
                                        />
                                      ))
                                  ) : (
                                    <>Empty</>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="card-footer d-flex justify-content-between">
                        {showFirst && (
                          <button
                            type="button"
                            className="btn btn-info btn-arrow ml-auto"
                            onClick={() =>
                              this.toSecondStep(setFieldTouched, values)
                            }
                            //   disabled={disableNext}
                          >
                            Next <FontAwesomeIcon icon="arrow-right" />
                          </button>
                        )}
                        {showSecond && (
                          <>
                            <button
                              type="button"
                              className="btn btn-outline-info"
                              onClick={this.previousStep}
                            >
                              Previous
                            </button>
                            <button
                              type="button"
                              className="btn btn-info btn-arrow ml-auto"
                              onClick={() =>
                                this.nextStep(setFieldTouched, values)
                              }
                              //   disabled={disableNext}
                            >
                              Next <FontAwesomeIcon icon="arrow-right" />
                            </button>
                          </>
                        )}
                        {showThird && (
                          <>
                            <button
                              type="button"
                              className="btn btn-outline-info"
                              onClick={this.previousStep}
                            >
                              Previous
                            </button>
                            <button
                              type="submit"
                              className="btn btn-info btn-arrow ml-auto"
                              onClick={this.handleSubmit}
                              form="create-project"
                            >
                              Create Project{" "}
                              <FontAwesomeIcon icon="arrow-right" />
                            </button>
                          </>
                        )}
                      </div>
                    </>
                  )}
                </Form>
              </>
            )}
          </Formik>
        </div>
      </div>
    );
  }
}

const Step = ({ stage, idx }) => (
  <div className={`step ${stage === idx && "selected"}`}>
    <div className="step-icon ">
      {stage > idx ? <FontAwesomeIcon icon="check" /> : idx + 1}
    </div>
  </div>
);

export default CreateProject;
