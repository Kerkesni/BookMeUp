const request = require('request');
const apis = require('../global')
const _ = require("lodash")

module.exports = (req, res, next) => {

    if (typeof (req.params.id) !== "string") {
        res.send('Invalid Id')
        return
    }

    let path = apis.info_api + req.params.id

    request(path, function (error, response, body) {
        console.error('error:', error); // Print the error if one occurred
        let json = JSON.parse(body)
        json = {
            thumbnail: json['volumeInfo']['imageLinks']['thumbnail'],
            title: json['volumeInfo']['title'],
            authors: json['volumeInfo']['authors'],
            description: json['volumeInfo']['description'],
            categories: json['volumeInfo']['categories'],
            pageCount: json['volumeInfo']['pageCount'],
            averageRating: json['volumeInfo']['averageRating'],
            publisher: json['volumeInfo']['publisher'],
            publishedDate: json['volumeInfo']['publishedDate'],
        }
        res.send(json)
    })
}