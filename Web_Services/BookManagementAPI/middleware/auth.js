const axios = require('axios')

module.exports = (req, res, next) => {
    if(!req.cookies || !req.cookies.jwtToken ){
        res.status(300).send("Invalid Token")
        return
    }
    let token = req.cookies.jwtToken
    axios.post('http://auth-api:3004/verify', {
        jwtToken: token
    })
    .then(response => {
        if(response.data)
            next()
        else
            res.send('invalid token')
    })
    .catch(err => {
        console.log(err)
        res.status(500).send("Internal error")
    })
}