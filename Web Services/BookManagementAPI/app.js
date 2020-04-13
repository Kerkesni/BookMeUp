const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')

const initDB = require('./database/initDB')
const addBook = require('./middleware/addBook')
const delBook = require('./middleware/delBook')


app.use(bodyParser.json())
app.use(cors())


app.post('/addBook', addBook)
app.delete('/delBook', delBook)


app.listen(3001, () => {
    console.log("Server Started")
    initDB()
})