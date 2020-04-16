const axios = require('axios')
const getCookies = require('../helpers/getCookies')

module.exports = (req, res, next) => {
    if (!getCookies(req)) {
        res.status(300).send("Token Invalid")
        return
    }
    let token = getCookies(req).jwtPayload
    axios
        .post('http://localhost:3003/verify', {
            jwtToken: token
        })
        .then(response => {
            if (response.data) {
                next()
            } else {
                res.send("invalid token")
            }
        })
        .catch(error => {
            console.error(error)
            res.send("invalid token")
        })
}