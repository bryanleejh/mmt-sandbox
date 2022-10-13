import Cookies from 'js-cookie';
export const GOOGLE_TOKEN = 'google-token';

// TODO check if we can deprecate this
export const logoutHelpers = {
  deleteToken: () => {
    Cookies.remove(GOOGLE_TOKEN);
  },
};
