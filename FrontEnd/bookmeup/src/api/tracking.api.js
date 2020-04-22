import httpClient from "./httpClient"

const END_POINT = 'http://localhost:3003';

const getTrackings = (id) => httpClient.get(END_POINT+"/getTrackings/"+id);

const addTracking = (data) => httpClient.post(END_POINT+"/addTracking/", data);

const delTracking = (UID, BID) => httpClient.delete(END_POINT+"/delTracking/"+UID+"/"+BID);

const addPages = (data) => httpClient.post(END_POINT+"/addPages/", data);


export {
    getTrackings,
    addTracking,
    delTracking,
    addPages,
}
