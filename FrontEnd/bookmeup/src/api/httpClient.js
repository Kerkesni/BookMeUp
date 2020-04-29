import axios from 'axios'

const httpClient = axios.create({
    baseURL: 'http://192.168.0.57:80/api',
    timeout: 1000, // indicates, 1000ms ie. 1 second
    withCredentials:true
});

export default httpClient;