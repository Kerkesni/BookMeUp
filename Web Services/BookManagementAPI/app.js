const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const initDB = require('./database/initDB')
const getBooks = require('./middleware/getBooks')
const addBook = require('./middleware/addBook')
const delBook = require('./middleware/delBook')


app.use(bodyParser.json())


app.get('/getBooks/:id', getBooks)
app.post('/addBook', addBook)
app.delete('/delBook/:userId/:id', delBook)


app.listen(3002, () => {
    console.log("Server Started")
    initDB()
})