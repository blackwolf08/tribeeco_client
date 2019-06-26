import React from "react";
import { Switch, Route, Redirect, NavLink } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Content from "../components/Search/Content";
import Projects from "../components/Search/Projects";
import People from "../components/Search/People";
import All from "../components/Search/All";

const filters = ["people", "content", "projects"];

function getQueryString(location) {
  const searchParams = new URLSearchParams(location.search);
  return searchParams.get("q") || "";
}
function setParams({ query = "" }) {
  const searchParams = new URLSearchParams();
  searchParams.set("q", query);
  return searchParams.toString();
}

class Search extends React.Component {
  state = {
    input: getQueryString(this.props.location),
    queryString: getQueryString(this.props.location)
  };

  handleChange = e => {
    this.setState({ input: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();

    const url = setParams({ query: this.state.input });
    const history = this.props.history;
    history.push(`?${url}`);

    this.setState({ queryString: this.state.input });
  };
  render() {
    const { queryString, input } = this.state;
    const { match, location } = this.props;

    if (location.pathname == "/search") return <Redirect to="/Search/people" />;
    else
      return (
        <div className="px-5 bg-white min-h">
          <div className="container py-3">
            <form onSubmit={this.handleSubmit}>
              <div className="input-group  w-50 mb-3 m-auto rounded-pill">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search"
                  value={input}
                  onChange={this.handleChange}
                  aria-label="Search"
                  aria-describedby="btn-full-search"
                />
                <div className="input-group-append">
                  <button
                    className="btn btn-outline-info"
                    type="submit"
                    id="btn-full-search"
                  >
                    <FontAwesomeIcon icon="search" />
                  </button>
                </div>
              </div>
            </form>

            <div className="text-center py-3">
              {filters.map((item, idx) => (
                <NavLink
                  key={idx}
                  to={{
                    pathname: `${match.url}/${item}`,
                    search: this.props.location.search
                  }}
                  className="btn-light btn rounded-pill text-capitalize m-2"
                  activeClassName="btn-outline-info"
                >
                  {item}
                </NavLink>
              ))}
            </div>

            <div>
              <Switch>
                <Route path={`${match.url}/all`} render={() => <All />} exact />
                <Route
                  path={`${match.url}/people`}
                  render={() => <People query={queryString} />}
                  exact
                />
                <Route
                  path={`${match.url}/content`}
                  render={() => <Content query={queryString} />}
                  exact
                />
                <Route
                  path={`${match.url}/projects`}
                  render={() => <Projects query={queryString} />}
                  exact
                />
              </Switch>
            </div>
          </div>
        </div>
      );
  }
}

export default Search;
