const axios = require('axios')
const getCookies = require ('../helpers/getCookies')

module.exports = (req, res, next) => {
    if(!getCookies(req) || !getCookies(req).jwtToken){
        res.status(300).send("Invalid Token")
        return
    }
    let token = getCookies(req).jwtToken
    axios.post('http://auth-api:3004/verify', {
        jwtToken: token
    })
    .then(response => {
        if(response.data)
            next()
        else
            res.send('invalid token')
    })
    .catch(error => {
        console.error(error)
        res.status(500).send("Internal error")
    })
}