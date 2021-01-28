export const APP_ROOT_PORTAL_ID = 'app-root-portal';

export const getPortalRoot = () => (typeof window === 'undefined'
  ? null
  : document.getElementById(APP_ROOT_PORTAL_ID)
);