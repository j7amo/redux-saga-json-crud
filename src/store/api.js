import axios from 'axios';

export const loadUsersApi = () => axios.get('http://localhost:3333/users');

export const createUserApi = (user) => axios.post('http://localhost:3333/users', user);
