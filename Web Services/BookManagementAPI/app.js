const express = require('express')
const app = express()
const bodyParser = require('body-parser')
var cors = require('cors')

app.use(bodyParser.json())
app.use(cors())

const initDB = require('./database/initDB')

const getBooks = require('./middleware/getBooks')
const addBook = require('./middleware/addBook')
const delBook = require('./middleware/delBook')

const getNotes = require('./middleware/getNotes')
const addNote = require('./middleware/addNote')
const delNote = require('./middleware/delNote')


app.get('/getBooks/:id', getBooks)
app.post('/addBook', addBook)
app.delete('/delBook/:userId/:bookId', delBook)

app.get('/getNotes/:userId/:bookId', getNotes)
app.post('/addNote', addNote)
app.delete('/delNote/:userId/:bookId/:noteId', delNote)


app.listen(3002, () => {
    console.log("Server Started")
    initDB()
})