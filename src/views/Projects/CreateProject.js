import React, { Component } from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Formik, Form, Field, FieldArray, ErrorMessage, getIn } from "formik";

import Autocomplete from "../../components/Common/Autocomplete";
import TagsInput from "react-tagsinput";

import axios from "../../utils/axios";
import { createProjectSchema } from "../../utils/validations";

const socialOptions = ["Facebook", "Github", "Twitter", "Instagram", "Youtube"];

const initialValues = {
  title: "",
  vision: "",
  body: "",
  tags: [],
  currentMember: { id: "", role: "member", fullname: "" },
  socialLinks: [{ name: "Facebook", url: "" }]
};

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
        // hidden
      />
    </>
  );
};
const SelectedMember = ({ member, removeMember }) => (
  <div className=" d-inline-flex p-1 pl-3 m-2 box-shadow-lg">
    <div>
      <h5>{member.fullname}</h5>
      <span>{member.role}</span>
    </div>
    <button
      type="button"
      className="btn"
      onClick={() => removeMember(member.id)}
    >
      <FontAwesomeIcon icon="times" />
    </button>
  </div>
);
class CreateProject extends Component {
  state = {
    step: 0,
    created: false,
    currentConnections: [],
    allConnections: [],
    projectId: null,
    previewURL: null,
    imageFile: null,
    selectedMembers: [],
    autoCompleteReset: false
  };
  componentDidMount() {
    axios
      .get("myconnections")
      .then(res => {
        this.setState({
          currentConnections: res.data,
          allConnections: res.data
        });
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
    if (values.fullname == "") return;
    const currentConnections = this.state.currentConnections.filter(
      item => item.id !== values.id
    );
    console.log(values, currentConnections);

    this.setState(prevState => ({
      selectedMembers: [...prevState.selectedMembers, values],
      currentConnections,
      autoCompleteReset: !prevState.autoCompleteReset
    }));
  };
  removeMember = id => {
    const member = this.state.allConnections.find(item => item.id === id);
    const selectedMembers = this.state.selectedMembers.filter(
      item => item.id !== id
    );

    this.setState(prevState => ({
      currentConnections: [...prevState.currentConnections, member],
      selectedMembers
    }));
  };
  render() {
    const {
      currentConnections,
      step,
      created,
      projectId,
      selectedMembers,
      previewURL
    } = this.state;
    const showFirst = step === 0;
    const showSecond = step === 1;

    return (
      <div className="min-h bg-secondary">
        <div className="project-form container">
          <div className="d-flex flex-wrap justify-content-center justify-content-md-between align-items-baseline">
            <h4 className="text-center font-weight-bold text-dark pr-sm-3 pt-3 my-3">
              Create a New Project
            </h4>
            <div className="steps">
              <Step stage={step} idx={0} />
              <div className="mx-4">
                <hr />
              </div>
              <Step stage={step} idx={1} />
            </div>
          </div>
          <Formik
            initialValues={initialValues}
            validationSchema={createProjectSchema}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              const selectedMembers = this.state.selectedMembers;
              let memberQuantity = selectedMembers.length;
              let { currentMember, ..._values } = values;

              if (_values.tags.length === 0) _values.tags = null;

              // if (_values.schedule[0].target === "") {
              //   _values.schedule = [];
              // }

              let socialLinks = _values.socialLinks.filter(
                item => item.url != ""
              );

              const payload = {
                ..._values,
                stage: [""],
                memberQuantity: memberQuantity,
                members: selectedMembers,
                socialLinks
              };

              const file = this.state.imageFile;

              axios
                .post("addproject", payload)
                .then(res => {
                  if (file) {
                    const formData = new FormData();
                    formData.append("files", file, file.name);
                    axios
                      .post(`addprojectimage/${res.data.id}`, formData)
                      .catch(err => {
                        console.log(err);
                      });
                  }
                  this.setState({ projectId: res.data.id, created: true });
                  // resetForm(initialValues);
                })
                .catch(err => {
                  console.log(err);
                });

              setSubmitting(false);
            }}
          >
            {({ values, setFieldValue, setFieldTouched, errors }) => (
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

                          <div className="form-group row mt-4">
                            <label
                              htmlFor=""
                              className="col-sm-3 col-form-label"
                            >
                              Cover Photo
                            </label>

                            <div className="col-sm-9 ">
                              <ImageUpload setImage={this.setImage} />
                              <br />
                              {previewURL && (
                                <img
                                  className="mt-3"
                                  style={{ width: "200px" }}
                                  src={previewURL}
                                  alt="cover preview"
                                />
                              )}
                            </div>
                          </div>
                          
                        </div>
                      )}

                      {showSecond && (
                        <div>
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
                                onChange={value => setFieldValue("tags", value)}
                                onlyUnique={true}
                              />
                            </div>
                          </div>
                          <div className="form-group row">
                            <label
                              htmlFor=""
                              className="col-sm-3 col-form-label"
                            >
                              Members
                            </label>
                            <div className="col-sm-9">
                              <div className=" d-flex">
                                <Autocomplete
                                  id="members"
                                  allItems={currentConnections}
                                  reset={this.state.autoCompleteReset}
                                  onChange={setFieldValue}
                                  className="flex-30"
                                />

                                <Field
                                  name="currentMember.role"
                                  component="select"
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
                                  <option value="ally">Ally</option>
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

                              <div className="mt-3">
                                {selectedMembers.length > 0 &&
                                  selectedMembers.map(item => (
                                    <SelectedMember
                                      member={item}
                                      key={item.id}
                                      removeMember={this.removeMember}
                                    />
                                  ))}
                              </div>
                            </div>
                          </div>

                          <FieldArray
                            name="socialLinks"
                            render={arrayHelpers => (
                              <div className="form-group row mt-3">
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
                                      values.socialLinks.map((link, index) => (
                                        <div key={index} className="d-flex mb-2">
                                          <Field
                                            name={`socialLinks[${index}].name`}
                                            component="select"
                                            className="form-control"
                                            default="facebook"
                                          >
                                            {socialOptions.map(item => (
                                              <option value={item}>
                                                {item}
                                              </option>
                                            ))}
                                            {/* <option value="Facebook" selected>
                                              Facebook
                                            </option>
                                            <option value="Github">
                                              Github
                                            </option>
                                            <option value="Twitter">
                                              Twitter
                                            </option>
                                            <option value="Instagram">
                                              Instagram
                                            </option>
                                            <option value="Youtube">
                                              Youtube
                                            </option> */}
                                          </Field>
                                          <Field
                                            name={`socialLinks[${index}].url`}
                                            className="form-control"
                                            placeholder={`Enter here`}
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
                                      ))
                                    ) : (
                                      <button
                                        type="button"
                                        className="btn btn-info"
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
                            type="submit"
                            className="btn btn-info btn-arrow ml-auto"
                            // onClick={this.handleSubmit}
                            form="create-project"
                          >
                            Create Project
                            <FontAwesomeIcon icon="arrow-right" />
                          </button>
                        </>
                      )}
                    </div>
                  </>
                )}
              </Form>
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
