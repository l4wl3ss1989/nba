import axios from 'axios';

import { BASE_API_URL } from './config';

const instance = axios.create({
  baseURL: BASE_API_URL,
  timeout: 5000 //default 0
});

export default instance;
