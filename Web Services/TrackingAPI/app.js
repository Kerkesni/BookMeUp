const express = require('express')
const app = express()
const bodyParser = require('body-parser')
var cors = require('cors')

app.use(bodyParser.json())
app.use(cors())

const initDB = require('./database/initDB')
const getTrackings = require('./middleware/getTrackings')
const addTracking = require('./middleware/addTracking')
const updateTracking = require('./middleware/updateTracking')
const delTracking = require('./middleware/delTracking')
const addPages = require('./middleware/addPages')

app.get('/getTrackings/:uid', getTrackings)
app.post('/addTracking', addTracking)
app.post('/updateTracking', updateTracking)
app.delete('/delTracking/:uid/:bid', delTracking)

app.post('/addPages', addPages)

app.listen(3004, () => {
    console.log("Server Started")
    initDB()
})