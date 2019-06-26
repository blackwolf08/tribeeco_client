const ROUTES = {
  LANDING: '/',
  HOME: '/home',
  SIGN_UP: '/signup',
  LOG_IN: '/login',
  LOG_IN_NEW: '/loginnew',
  PROFILE_DETAILS: '/profile/:id(\\d+)',
  PROFILE_ABOUT: '/profile/:id(\\d+)/about',
  PROFILE_EXPERIENCE: '/profile/:id(\\d+)/experience',
  PROFILE_POSTS: '/profile/:id(\\d+)/posts',
  PROFILE_PROJECTS: '/profile/:id(\\d+)/projects',
  PROFILE_UPDATE: '/profile/update',
  PROFILE_CURRENT: '/profile',
  EVENTS: '/events',
  EVENT: '/event',
  EVENT_NEW: '/event/new',
  EVENT_DRAFTS: '/event/drafts',
  EVENT_PAST: '/event/past',
  EVENT_DETAILS: '/event/:id(\\d+)',
  EVENT_EDIT: '/event/edit/:id(\\d+)',
  PROJECTS: '/projects',
  PROJECTS_LIST: '/projects/list',
  PROJECT_NEW: '/project/new',
  PROJECT_DETAILS: '/project/:id(\\d+)',
  CONNECTIONS: '/connections',
  NEW_USER: '/new',
  SETTINGS: '/settings',
  MESSAGES: '/messages',
  SEARCH: '/search',
  NOTIFICATIONS: '/notifications'
};

let BASE_API_URL = '';
if (process.env.NODE_ENV === 'production')
  BASE_API_URL = 'http://35.224.245.250:8000/';
else BASE_API_URL = 'http://localhost:8000/';

const BASE_URL = 'http://beta.tribeeco.com/';

export { BASE_API_URL, BASE_URL, ROUTES };
