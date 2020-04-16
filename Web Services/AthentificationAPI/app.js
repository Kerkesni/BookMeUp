const express = require('express')
const app = express()
const bodyparser = require('body-parser')
var cookieParser = require('cookie-parser');


app.use(cookieParser());
app.use(bodyparser.json())


const initDB = require('./database/initDB')
const login = require('./middleware/Login')
const signup = require('./middleware/SignUp')
const verify = require('./middleware/Verify')


app.post('/Login', login)
app.post('/signup', signup)
app.post('/verify', verify)


app.listen(3003, () => {
    console.log("Server Started")
    initDB()
})