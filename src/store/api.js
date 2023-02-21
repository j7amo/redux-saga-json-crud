import axios from 'axios';

export const loadUsersApi = () => axios.get('http://localhost:3333/users');

export const createUserApi = (user) => axios.post('http://localhost:3333/users', user);

export const deleteUserApi = (userId) => axios.delete(`http://localhost:3333/users/${userId}`);

export const updateUserApi = (userId, userInfo) => axios.put(`http://localhost:3333/users/${userId}`, userInfo);

export const searchUsersApi = (query) => axios.get(`http://localhost:3333/users?q=${query}`);

export const filterUsersApi = (status) => axios.get(`http://localhost:3333/users?status=${status}`);

export const sortUsersApi = (column) => axios.get(`http://localhost:3333/users?_sort=${column}&_order=asc`);
