import axios from 'axios'

const httpClient = axios.create({
    timeout: 1000, // indicates, 1000ms ie. 1 second
    withCredentials:true
});

export default httpClient;