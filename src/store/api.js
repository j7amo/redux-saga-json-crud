import axios from 'axios';

export const loadUsersApi = () => axios.get('http://localhost:3333/users');

export const createUserApi = (user) => axios.post('http://localhost:3333/users', user);

export const deleteUserApi = (userId) => axios.delete(`http://localhost:3333/users/${userId}`);

export const updateUserApi = (userId, userInfo) => axios.put(`http://localhost:3333/users/${userId}`, userInfo);
