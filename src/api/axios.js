import axios from 'axios';
import config from './config';

const backendIP = config.backendIP;

export default axios.create({
    baseURL: `http://${backendIP}`
});
