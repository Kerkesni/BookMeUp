const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const cookieParser = require('cookie-parser')

app.use(cookieParser())
app.use(bodyParser.json())
app.use(cors())

const initDB = require('./database/initDB')

const getBooks = require('./middleware/getBooks')
const addBook = require('./middleware/addBook')
const delBook = require('./middleware/delBook')

const getNotes = require('./middleware/getNotes')
const addNote = require('./middleware/addNote')
const delNote = require('./middleware/delNote')

const auth = require('./middleware/auth')
app.use(auth)

const PORT = 3000

app.get('/getBooks/:id', getBooks)
app.post('/addBook', addBook)
app.delete('/delBook/:userId/:bookId', delBook)

app.get('/getNotes/:userId/:bookId', getNotes)
app.post('/addNote', addNote)
app.delete('/delNote/:userId/:bookId/:noteId', delNote)


app.listen(PORT, () => {
    console.log("Server Started")
    initDB()
})