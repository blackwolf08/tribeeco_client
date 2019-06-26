import React, { Component } from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import TagsInput from "react-tagsinput";
import Flatpickr from "react-flatpickr";

import Autocomplete from "../../components/Events/Autocomplete";

import ImageUpload from "../../components/Common/ImageUpload";

import axios from "../../utils/axios";
import { createEventSchema } from "../../utils/validations";

import "flatpickr/dist/themes/airbnb.css";

const initialSchedule = { time: "", name: "" };
const initialValues = {
  eventName: "",
  date: "",
  venue: "",
  about: "",
  tags: [],
  hosts: [],
  cohosts: [],
  schedule: []
};

class CreateEvent extends Component {
  state = {
    eventKey: 0,
    currentConnections: [],
    allConnections: [],
    draftClick: false,
    draftSaved: false,
    draft: false,
    eventId: null,
    previewURL: null,
    imageFile: null,
    prevImage: ""
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

  handleDraft = submitForm => {
    this.setState({ draftClick: true });
    submitForm();
  };
  handlePublish = submitForm => {
    this.setState({ draftClick: false });
    submitForm();
  };
  handleAnotherEvent = () => {
    this.setState(prevState => ({ eventKey: prevState.eventKey + 1 }));
  };
  addHost = value => {
    if (value.id)
      this.setState(prevState => ({
        hosts: [...prevState.hosts, value]
      }));
  };

  addCohost = value => {
    if (value.id)
      this.setState(prevState => ({
        cohosts: [...prevState.cohosts, value]
      }));
  };

  setImage = (previewURL, imageFile) => {
    this.setState({ previewURL, imageFile });
  };
  uploadImage = id => {
    const { imageFile: file, prevImage } = this.state;

    if (file && prevImage != file.name) {
      const formData = new FormData();
      formData.append("files", file, file.name);
      axios
        .post(`addeventimage/${id}`, formData)
        .then(res => {
          this.setState({ prevImage: file.name });
        })
        .catch(err => {
          console.log(err);
        });
    }
  };
  render() {
    const { draftSaved, eventCreated, eventId, draft, previewURL } = this.state;
    if (eventCreated)
      return (
        <div className="text-center mt-4">
          <h3 className="font-weight-bold mb-3">Event Created</h3>
          <Link to={`/event/${eventId}`} className="link">
            Got to event
          </Link>
        </div>
      );
    return (
      <Formik
        key={this.state.eventKey}
        initialValues={initialValues}
        validationSchema={createEventSchema}
        onSubmit={values => {
          let { date, hosts, cohosts, tags, ...rest } = values;

          if (date == "") date = null;
          hosts = hosts.map(item => item.id);
          cohosts = cohosts.map(item => item.id);
          let tags_ = tags.length > 0 ? tags : null;

          if (!draft)
            axios
              .post("addevent", {
                ...rest,
                date,
                hosts,
                cohosts,
                tags: tags_,
                published: !this.state.draftClick
              })
              .then(res => {
                this.setState({ eventId: res.data.id });
                this.uploadImage(res.data.id);

                if (this.state.draftClick) {
                  this.setState({
                    draftSaved: true,
                    draft: true
                  });
                  setTimeout(() => {
                    this.setState({ draftSaved: false });
                  }, 1500);
                } else this.setState({ eventCreated: true });
              })
              .catch(err => {
                console.log("event add error", err);
              });
          else
            axios
              .patch(`updateevent/${this.state.eventId}`, {
                ...rest,
                date,
                hosts,
                cohosts,
                tags: tags_,
                published: !this.state.draftClick
              })
              .then(res => {
                this.uploadImage(res.data.id);

                if (this.state.draftClick) {
                  this.setState({ draftSaved: true });
                  setTimeout(() => {
                    this.setState({ draftSaved: false });
                  }, 1500);
                } else this.setState({ eventCreated: true });
              })
              .catch(err => {
                console.log("event add error", err);
              });
        }}
      >
        {({ values, setFieldValue, submitForm }) => (
          <Form className="event-form p-3">
            <Field
              id="eventName"
              type="text"
              name="eventName"
              placeholder="Event Name"
              className="form-control"
              maxLength="40"
            />
            <ErrorMessage
              name="eventName"
              component="div"
              className="invalid-feedback"
            />

            <div className="row mt-4 mb-3">
              <div className="col-md-6 form-group row">
                <label htmlFor="date" className="col-sm-4 col-form-label">
                  Date / Time
                </label>
                <div className="col-sm-8">
                  <Field
                    name="date"
                    render={({ field }) => (
                      <Flatpickr
                        data-enable-time
                        className="form-control"
                        {...field}
                        onChange={date => {
                          setFieldValue("date", date[0]);
                        }}
                      />
                    )}
                  />
                  <ErrorMessage
                    name="date"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>
              </div>

              <div className="col-md-6 form-group row">
                <label htmlFor="venue" className="col-sm-4 col-form-label">
                  Venue
                </label>
                <div className="col-sm-8">
                  <Field id="venue" name="venue" className="form-control" />
                  <ErrorMessage
                    name="venue"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>
              </div>
            </div>

            <div className="form-group row">
              <label className="col-sm-2 col-form-label">Description</label>
              <Field
                name="about"
                component="textarea"
                className="form-control col-sm-10"
                maxLength="200"
                rows="4"
                placeholder={``}
              />
            </div>

            <div className="form-group row">
              <label htmlFor="tags" className="col-sm-2 col-form-label">
                Tags
              </label>
              <div className="col-sm-10 p-0">
                <TagsInput
                  id="tags"
                  value={values.tags}
                  onChange={value => setFieldValue("tags", value)}
                  onlyUnique={true}
                />
              </div>
            </div>

            <div className="row mt-4 mb-3">
              <div className="col-md-6 form-group row">
                <label htmlFor="" className="col-sm-4 col-form-label">
                  Host
                </label>
                <div className="col-sm-8 d-flex">
                  <FieldArray
                    name="hosts"
                    render={arrayHelpers => (
                      <div className="">
                        <div>
                          {this.state.allConnections && (
                            <Autocomplete
                              push={arrayHelpers.push}
                              // fieldName="currentHost"
                              // allFieldName="hosts"
                              allItems={this.state.allConnections}
                              // onChange={setFieldValue}
                            />
                          )}
                        </div>
                        {values.hosts &&
                          values.hosts.length > 0 &&
                          values.hosts.map((item, index) => (
                            <div
                              className="d-inline-block box-shadow p-2"
                              key={index}
                            >
                              {item.fullname}
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
                          ))}
                      </div>
                    )}
                  />
                </div>
              </div>

              <div className="col-md-6 form-group row">
                <label htmlFor="" className="col-sm-4 col-form-label">
                  Cohost
                </label>
                <div className="col-sm-8 d-flex align-items-start">
                  <FieldArray
                    name="cohosts"
                    render={arrayHelpers => (
                      <div className="">
                        <div>
                          {this.state.allConnections && (
                            <Autocomplete
                              push={arrayHelpers.push}
                              // fieldName="currentCohost"
                              // allFieldName="cohosts"
                              allItems={this.state.allConnections}
                              // onChange={setFieldValue}
                            />
                          )}
                        </div>
                        {values.cohosts &&
                          values.cohosts.length > 0 &&
                          values.cohosts.map((item, index) => (
                            <div
                              className="d-inline-block box-shadow p-2"
                              key={index}
                            >
                              {item.fullname}
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
                          ))}
                      </div>
                    )}
                  />
                </div>
              </div>
            </div>

            <div className="form-group row mt-4">
              <label htmlFor="" className="col-sm-2 col-form-label">
                Photo
              </label>

              <div className="col-sm-10">
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

            <FieldArray
              name="schedule"
              render={arrayHelpers => (
                <>
                  <div className="mt-3 d-flex flex-wrap align-items-start">
                    {values.schedule.length == 0 ? (
                      <button
                        className="btn btn-secondary"
                        type="button"
                        onClick={() => arrayHelpers.push(initialSchedule)}
                      >
                        Add Schedule
                      </button>
                    ) : (
                      <>
                        <label className="mt-2 mr-2 mr-md-4">Schedule</label>
                        <div>
                          {values.schedule.map((item, index) => (
                            <div className="d-flex">
                              <Field
                                name={`schedule[${index}].name`}
                                className="form-control mr-2"
                                placeholder="Item Name"
                              />
                              <Field
                                name={`schedule[${index}].time`}
                                render={({ field }) => (
                                  <Flatpickr
                                    data-enable-time
                                    data-no-calendar
                                    className="form-control"
                                    placeholder="Time"
                                    options={{
                                      dateFormat: "H:i"
                                    }}
                                    // defaultDate={values.date}
                                    {...field}
                                    onChange={date => {
                                      setFieldValue(
                                        `schedule[${index}].time`,
                                        date[0].toLocaleTimeString()
                                      );
                                    }}
                                  />
                                )}
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
                          ))}
                        </div>

                        <button
                          type="button"
                          className="btn"
                          onClick={() => arrayHelpers.push(initialSchedule)}
                        >
                          <FontAwesomeIcon
                            icon="plus"
                            style={{ color: "#707070" }}
                          />
                        </button>
                      </>
                    )}
                  </div>
                </>
              )}
            />

            {draftSaved && (
              <span className="text-success d-md-none">Saved</span>
            )}
            <div className="d-flex justify-content-end align-items-center my-3 mt-md-4">
              {draftSaved && (
                <span className="text-success d-none d-md-inline">Saved</span>
              )}
              <button
                type="button"
                className="btn btn-outline-info mx-3"
                onClick={() => this.handleDraft(submitForm)}
                // form="create-project"
              >
                Save as a draft
              </button>

              <button
                type="button"
                className="btn btn-info btn-arrow"
                onClick={() => this.handlePublish(submitForm)}
                // onClick={this.handleSubmit}
                // form="create-project"
              >
                Save and Create
                <FontAwesomeIcon icon="arrow-right" />
              </button>
            </div>
          </Form>
        )}
      </Formik>
    );
  }
}

export default CreateEvent;
