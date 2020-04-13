const request = require('request');
const apis = require('../global')
const _ = require("lodash")

module.exports = (req, res, next) => {

    if (typeof (req.params.title) !== "string") {
        res.send('Invalid Title')
        return
    }

    let path = apis.search_api + req.params.title+"&langRestrict=en"+"&prinType=books"

    request(path, function (error, response, body) {
        console.error('error:', error); // Print the error if one occurred
        let json = JSON.parse(body).items
        json = _.filter(json, (x)=>{
            return x['volumeInfo']['imageLinks']
        })
        json = _.map(json, (x)=>{
            return {
                id : x['id'],
                title : x['volumeInfo']['title'],
                authors : x['volumeInfo']['authors'],
                categories : x['volumeInfo']['categories'],
                publisher : x['volumeInfo']['publisher'],
                publishedDate : x['volumeInfo']['publishedDate'],
                thumbnail: x['volumeInfo']['imageLinks']['thumbnail'],
            }
        })
        res.send(json)
    });
}