var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var cors = require('cors')

const searchBook = require('./middleware/searchBook')
const getBookDetail = require('./middleware/getBookDetail')

app.use(bodyParser.json())
app.use(cors())


app.get('/searchBook/:title', searchBook)

app.get('/getBookDetail/:id', getBookDetail)

app.listen(3000, ()=>{
    console.log("Server Started")
})
