import React, { Component } from "react";
import { Link } from "react-router-dom";

import ReactPaginate from "react-paginate";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Form from "react-bootstrap/Form";

import axios from "../../utils/axios";

const limit = 10;

class ProjectList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
      offset: 0,
      currentData: [],
      pageCount: Math.ceil(this.props.data.length / limit)
    };
  }
  handlePageClick = data => {
    const selected = data.selected;
    const offset = Math.ceil(selected * limit);
    const currentData = this.state.data.slice(offset, offset + limit);
    this.setState({ currentData: currentData, offset: offset });
  };

  handleSelect = (e) => {
    const value = e.target.value;
    const offset = this.state.offset

    let data = [...this.state.data]
    if (value === "name")
      data.sort((a, b) => a.name.localeCompare(b.name))
    else if (value === "completion")
      data.sort((a, b) => a.completion - b.completion)
    else if (value === "date")
      data.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))

    const currentData = data.slice(offset, offset + limit)
    this.setState({ currentData: currentData, data: data });

  }
  componentDidMount() {
    let currentData = this.state.data.slice(
      this.state.offset,
      this.state.offset + limit
    );
    this.setState({ currentData: currentData });
  }
  render() {
    return (
      <div className="bg-light-blue p-4">
        <div className="d-flex justify-content-between">
          <h5 className="align-self-center m-0">{this.props.title}</h5>
          <Form inline>
            <Form.Label>Sorted By</Form.Label>
            <Form.Control as="select" className="ml-2" onChange={this.handleSelect}>
              <option value="date">Newest First</option>
              <option value="name">Name</option>
              <option value="completion">Completion</option>
            </Form.Control>
          </Form>
        </div>
        <div>
          <div className="table-container my-4">
            <div className="table-row header">
              <div className="table-cell name">Name</div>
              <div className="table-cell date">Start Date</div>
              <div className="table-cell completion">Completion</div>
            </div>
            {this.state.currentData.map((data, idx) => (
              <div className="table-row" key={idx}>
                <div className="table-cell name"><Link to={`/project/${data.id}`} className="link">{data.title}</Link></div>
                <div className="table-cell date">{new Date(data.createdAt).toLocaleDateString()}</div>
                <div className="table-cell completion">{data.completion}%</div>
              </div>
            ))}
          </div>
          <ReactPaginate
            previousLabel={"previous"}
            nextLabel={"next"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={this.state.pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={this.handlePageClick}
            containerClassName={"pagination justify-content-center"}
            pageClassName={"page-item"}
            pageLinkClassName={"page-link"}
            previousClassName={"page-item"}
            nextClassName={"page-item"}
            nextLinkClassName={"page-link"}
            previousLinkClassName={"page-link"}
            activeClassName={"active"}
            disabledClassName={"disabled"}
          />
        </div>
      </div>
    );
  }
}

class ViewProjects extends Component {
  constructor() {
    super()
    this.state = {
      data1: null,
      data2: null
    };
  
  }
  componentDidMount() {
    axios
      .get("myprojects")
      .then(res => {        
        this.setState({
          data1: res.data
        })
      })
      .catch(err => {
        console.log(err);
      });
    axios
      .get("allprojects")
      .then(res => {
        this.setState({
          data2: res.data
        })
      })
      .catch(err => {
        console.log(err);
      });
  }
  render() {
    const { data1, data2 } = this.state
    return (
      <div className="bg-white">
        <div className="bg-info text-white p-2 p-md-3">
          <Link to="/projects">
            <FontAwesomeIcon
              icon="arrow-left"
              className="arrow-back"
              size="lg"
            />
          </Link>
          <span className="h4 ml-4 font-weight-bold">View Projects</span>
        </div>
        <div className="container">
          <div className="row mt-2 projects_view">
            <div className="col-lg-6 p-2">
              {
                data1 &&
                <ProjectList data={data1} title="Your Projects" />
              }
            </div>
            <div className="col-lg-6 p-2">
              {
                data2 &&
                <ProjectList data={data2} title="Tribe Projects" />
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ViewProjects;
