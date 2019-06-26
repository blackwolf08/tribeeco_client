/* eslint-disable import/first */

import React, { Suspense, lazy } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
// import { hot } from "react-hot-loader";
import { Provider, connect } from 'react-redux';
import configureStore from './store';

import './App.scss';

// const LoginNew = lazy(() => import("./components/Auth/LoginNew"));

const Landing = lazy(() => import('./views/Landing'));
const Dashboard = lazy(() => import('./views/Dashboard'));
const Connections = lazy(() => import('./views/Connections'));

// const Profile = lazy(() => import("./components/Profile/ProfilePage"));
const Profile = lazy(() => import('./views/Profile/Profile'));
// Change this location

const UpdateProfile = lazy(() => import('./views/Profile/UpdateProfileNew'));
const ViewProjects = lazy(() => import('./views/Projects/ViewProjects'));
const Project = lazy(() => import('./views/Projects/Project'));
// const Projects = lazy(() => import("./views/Projects/Projects"));
const CreateProject = lazy(() => import('./views/Projects/CreateProject'));
const Forum = lazy(() => import('./views/Forum'));
const Settings = lazy(() => import('./views/Settings'));
const Notifications = lazy(() => import('./views/Notifications'));
const Explore = lazy(() => import('./views/Explore'));
const Search = lazy(() => import('./views/Search'));
const NotFound = lazy(() => import('./views/NotFound'));
const Messages = lazy(() => import('./views/Messages'));
const Auth = lazy(() => import('./views/Auth'));
const Onboarding = lazy(() => import('./views/Onboarding'));

const Event = lazy(() => import('./views/Events/Event'));
const EventDetails = lazy(() => import('./views/Events/EventDetails'));

import MainNavbar from './components/Navbar/MainNavbar';
import Loader from './components/Common/Loader';
import ErrorBoundary from './components/ErrorBoundary';

import library from './utils/fontawesome';

// import { LinkedInPopUp } from "react-linkedin-login-oauth2";

import { ROUTES } from './constants';

import ReactGA from 'react-ga';

if (process.env.NODE_ENV === 'production') {
  ReactGA.initialize('UA-131738176-1');
  ReactGA.pageview(window.location.pathname + window.location.search);
  // this.props.history.listen((newLocation) => {
  //   ga("send", "pageview", newLocation.pathname);
  // });\
}

// if (process.env.NODE_ENV === "development") {
// const a11y = require('react-a11y').default;
// a11y(React, ReactDOM, {
//   rules: {
//     'img-uses-alt': 'warn',
//     'redundant-alt': [ 'warn', [ 'image', 'photo', 'foto', 'bild' ]]
//   }
// });
// }

const store = configureStore();

const App = () => (
  <Provider store={store}>
    <ErrorBoundary>
      <Suspense fallback={<Loader classname='main' />}>
        <Switch>
          <Route path={ROUTES.LANDING} component={Landing} exact />
          <AppRoute path={ROUTES.HOME} component={Dashboard} exact />
          <AppRoute path={ROUTES.PROFILE_DETAILS} component={Profile} />
          <AppRoute
            path={ROUTES.PROFILE_UPDATE}
            component={UpdateProfile}
            exact
          />
          {/* <AppRoute path={ROUTES.PROJECTS} component={Projects} exact /> */}
          <AppRoute
            path={ROUTES.PROJECTS_LIST}
            component={ViewProjects}
            exact
          />
          <AppRoute path={ROUTES.PROJECT_NEW} component={CreateProject} exact />
          <AppRoute path='/project/:id(\d+)' component={Project} exact />
          <AppRoute path='/forum/:id(\d+)' component={Forum} exact />
          <AppRoute path='/explore/:id(\d+)' component={Explore} />
          <AppRoute path={ROUTES.MESSAGES} component={Messages} exact />
          <AppRoute path='/messages/:id(\d+)' component={Messages} />
          <AppRoute path={ROUTES.CONNECTIONS} component={Connections} exact />
          <AppRoute path={ROUTES.SETTINGS} component={Settings} />
          <AppRoute path={ROUTES.SEARCH} component={Search} />
          <AppRoute
            path={ROUTES.EVENT_DETAILS}
            component={EventDetails}
            exact
          />
          <AppRoute path={ROUTES.EVENT} component={Event} />
          <AppRoute
            path={ROUTES.NOTIFICATIONS}
            component={Notifications}
            exact
          />
          <Route path={ROUTES.NEW_USER} component={Onboarding} exact />
          {/* <Route path={ROUTES.LOG_IN_NEW} component={LoginNew} exact /> */}
          <Route
            path={ROUTES.LOG_IN}
            render={props => <Auth selected='login' key='login' {...props} />}
            exact
          />
          <Route
            path={ROUTES.SIGN_UP}
            render={props => <Auth selected='signup' key='signup' {...props} />}
            exact
          />
          <Route component={NotFound} />
          {/* <Route exact path="/linkedin" component={LinkedInPopUp} /> */}
        </Switch>
      </Suspense>
    </ErrorBoundary>
  </Provider>
);

const UnconnectedAppRoute = ({
  component: Component,
  isAuthenticated,
  user,
  ...rest
}) => (
  <Route
    {...rest}
    render={props =>
      !isAuthenticated ? (
        <>
          {console.log('in app route', rest)}
          <Redirect to={{ pathname: '/' }} />
        </>
      ) : user.onboarding ? (
        <>
          <MainNavbar />
          <main className='min-h bg-secondary'>
            <Component {...props} />
          </main>
        </>
      ) : (
        <Redirect to={{ pathname: '/new' }} />
      )
    }
  />
);

function mapStateToProps(state) {
  const { auth } = state;
  const { isAuthenticated, user } = auth;

  return { isAuthenticated, user };
}

const AppRoute = connect(mapStateToProps)(UnconnectedAppRoute);

// export default hot(module)(App);
export default App;
