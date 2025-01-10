export const USER_ROLES = Object.freeze({
  CLIENT: 'Client',
  MANAGEMENT: 'Management'
});

export const HTTP_METHOD = Object.freeze({
  GET   : 'GET',
  POST  : 'POST',
  PATCH : 'PATCH',
  DELETE: 'DELETE'
})

export const LOGIN_URL = '/api/auth/login?post_login_redirect_url=/';