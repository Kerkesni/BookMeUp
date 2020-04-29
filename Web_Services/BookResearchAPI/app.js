var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var cors = require('cors')

const searchBook = require('./middleware/searchBook')
const getBookDetail = require('./middleware/getBookDetail')

app.use(bodyParser.json())
app.use(cors())

const PORT = 3000

app.get('/searchBook/:title', searchBook)

app.get('/getBookDetail/:id', getBookDetail)

app.listen(PORT, ()=>{
    console.log("Server Started")
})
