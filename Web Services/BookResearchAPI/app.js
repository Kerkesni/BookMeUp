var express = require('express')
var app = express()
var bodyParser = require('body-parser')

const searchBook = require('./middleware/searchBook')
const getBookDetail = require('./middleware/getBookDetail')

app.use(bodyParser.json())


app.get('/searchBook/:title', searchBook)

app.get('/getBookDetail/:id', getBookDetail)

app.listen(3001, ()=>{
    console.log("Server Started")
})
