import httpClient from "./httpClient"

const END_POINT = 'http://localhost:3002';

const getBooks = (id) => httpClient.get(END_POINT+"/getBooks/"+id);

const addBook = (data) => httpClient.post(END_POINT+"/addBook/", data);

const delBook = (UID, BID) => httpClient.delete(END_POINT+"/delBook/"+UID+"/"+BID);

const getNotes = (UID, BID) => httpClient.get(END_POINT+"/getNotes/"+UID+"/"+BID);

const addNote = (data) => httpClient.post(END_POINT+"/addNote/", data);

const delNote = (UID, BID, NID) => httpClient.delete(END_POINT+"/delNote/"+UID+"/"+BID+"/"+NID);


export {
    getBooks,
    addBook,
    delBook,
    getNotes,
    addNote,
    delNote
}
