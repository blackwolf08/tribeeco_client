import React, { Component } from "react";
import { NavLink, Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Dropdown from "react-bootstrap/Dropdown";

import NotificationMenu from "./Notification";
import SearchBar from "./Search";

import { logoutUser } from "../../actions";

class MainNavbar extends Component {
  state = {
    opened: false
  };
  setOpen = isOpen => {
    if (isOpen) {
      this.setState({ opened: true });
    }
  };
  logout = () => {
    this.props.dispatch(logoutUser());
  };
  render() {
    const { match } = this.props;
    return (
      <Navbar
        expand="lg"
        className="main-nav py-2 py-lg-0"
        fixed="top"
        collapseOnSelect={true}
      >
        <Navbar.Brand>
          <Link to="/home">
            <FontAwesomeIcon icon="home" />
          </Link>
        </Navbar.Brand>
        {match.path !== "/search" && <SearchBar />}

        <Navbar.Toggle aria-controls="main-navbar">
          <FontAwesomeIcon icon="bars" />
        </Navbar.Toggle>
        <Navbar.Collapse id="main-navbar" className="justify-content-end">
          <Nav>
            {/* <Nav.Link className="nav-link" to="#">
              <FontAwesomeIcon icon="exchange-alt" />
              Switch Tribe
            </Nav.Link>

            <Nav.Link className="nav-link" to="#">
              <FontAwesomeIcon icon="envelope" />
              Messages
            </Nav.Link> */}

            <NavLink className="nav-link" to="/messages">
              <FontAwesomeIcon icon="envelope" />
              Messages
            </NavLink>

            <Dropdown onToggle={this.setOpen}>
              <Dropdown.Toggle as={Nav.Link}>
                <FontAwesomeIcon icon="bell" />
                Notification
              </Dropdown.Toggle>

              <Dropdown.Menu className="notification-menu pb-0">
                <NotificationMenu opened={this.state.opened} />
              </Dropdown.Menu>
            </Dropdown>

            <NavLink className="nav-link" to="/projects/list">
              <FontAwesomeIcon icon="project-diagram" />
              Projects
            </NavLink>

            <NavLink className="nav-link" to={`/profile/${this.props.user.id}`}>
              <FontAwesomeIcon icon="user" />
              {this.props.user.first_name}
            </NavLink>

            <Dropdown alignRight>
              <Dropdown.Toggle as={Nav.Link}>
                <FontAwesomeIcon icon="cog" />
                Options
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item as={NavLink} to="/settings">
                  Settings
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={this.logout}>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

function mapStateToProps(state) {
  const { auth } = state;
  const { user } = auth;

  return { user };
}

export default withRouter(connect(mapStateToProps)(MainNavbar));
