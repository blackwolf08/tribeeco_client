import React from "react";
import { Switch, Route, NavLink, Redirect } from "react-router-dom";

import Security from "../components/Settings/Security";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "../styles/modules/Settings.module.scss";

const TabLink = ({ name, link, icon }) => (
  <NavLink to={`/Settings/${link}`} className={styles.link}>
    <div>
      <FontAwesomeIcon icon={icon} className={styles.icon} />
      {name}
    </div>
    <FontAwesomeIcon icon="chevron-right" className={styles.arrow} size="sm" />
  </NavLink>
);

const Settings = ({ match, location }) => {
  if (location.pathname == "/settings") {
    return <Redirect to="/Settings/security" />;
  } else {
    return (
      <div className="container settings min-h">
        <div className="row p-4">
          <div className="col-md-4">
            <div className="bg-white box-shadow">
              <h6 className="font-weight-bold px-3 py-4 text-muted">
                Settings
              </h6>
              <div className="body">
                <TabLink
                  name="Security & Login"
                  link="security"
                  icon="user-shield"
                />
                {/* <TabLink name="Privacy" link="privacy" icon="shield-alt" /> */}
              </div>
            </div>
          </div>
          <div className="col-md-8">
            <div className="bg-white box-shadow">
              <Switch>
                <Route
                  path={`${match.url}/security`}
                  component={Security}
                  exact
                />
                <Route
                  path={`${match.url}/privacy`}
                  render={() => (
                    <div className="p-4">
                      <h4>Privacy Settings</h4>
                    </div>
                  )}
                  exact
                />
              </Switch>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Settings;
