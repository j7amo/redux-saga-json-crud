import axios from 'axios';

const loadUsersApi = () => axios.get('http://localhost:3333/users');

export default loadUsersApi;
