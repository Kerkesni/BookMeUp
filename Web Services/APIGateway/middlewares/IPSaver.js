const requestIp = require('request-ip')

module.exports = (req, res, next) => {
    req.ip = requestIp.getClientIp(req)
    return next()
}