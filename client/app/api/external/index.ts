const SERVER_BASE_PATH = process.env.NEXT_PUBLIC_SERVER_URL;

const API = {
  USER_API: SERVER_BASE_PATH + '/users',
  CLIENTS_API: SERVER_BASE_PATH + '/clients',
  CATEGORIES_API: SERVER_BASE_PATH + '/categories',
  BUSINESSES_API: SERVER_BASE_PATH + '/businesses',
}

export default API;