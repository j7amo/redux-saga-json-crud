import axios from 'axios';

const devEnv = process.env.NODE_ENV !== 'production';
const { REACT_APP_DEV_URL, REACT_APP_PROD_URL } = process.env;

export const loadUsersApi = (start, end) => axios.get(
  `${
    devEnv ? REACT_APP_DEV_URL : REACT_APP_PROD_URL
  }?_start=${start}&_end=${end}`,
);

// eslint-disable-next-line max-len
export const createUserApi = (user) => axios.post(devEnv ? REACT_APP_DEV_URL : REACT_APP_PROD_URL, user);

export const deleteUserApi = (userId) => axios.delete(`${devEnv ? REACT_APP_DEV_URL : REACT_APP_PROD_URL}/${userId}`);

export const updateUserApi = (userId, userInfo) => axios.put(
  `${devEnv ? REACT_APP_DEV_URL : REACT_APP_PROD_URL}/${userId}`,
  userInfo,
);

export const searchUsersApi = (query) => axios.get(`${devEnv ? REACT_APP_DEV_URL : REACT_APP_PROD_URL}?q=${query}`);

export const filterUsersApi = (status) => axios.get(
  `${devEnv ? REACT_APP_DEV_URL : REACT_APP_PROD_URL}?status=${status}`,
);

export const sortUsersApi = (column) => axios.get(
  `${
    devEnv ? REACT_APP_DEV_URL : REACT_APP_PROD_URL
  }?_sort=${column}&_order=asc`,
);
