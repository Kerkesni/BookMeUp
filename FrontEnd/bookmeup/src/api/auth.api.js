import httpClient from "./httpClient"

const END_POINT = 'auth';


const login = (data) => httpClient.post(END_POINT+"/login/", data);

const signup = (data) => httpClient.post(END_POINT+"/signup/", data);


export {
    login,
    signup
}
