import httpClient from "./httpClient"

const END_POINT = 'search';

const searchBook = (title) => httpClient.get(END_POINT+"/searchBook/"+title);

const getBookDetails = (id) => httpClient.get(END_POINT+"/getBookDetail/"+id);

export {
    searchBook,
    getBookDetails,
}
