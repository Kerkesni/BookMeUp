const Joi = require('@hapi/joi');
var jwt = require('jsonwebtoken');

const jwtKey = 'my_secret_key'
const jwtExpirySeconds = 24 * 60 * 60

const schema = Joi.object({
    jwtPayload: Joi.string()
        .required(),
})

module.exports = (req, res, next) => {
    let data = req.body
    if (schema.validate(data).error) {
        res.status(500)
        res.send("Wrong Data Schema")
        return
    }
    jwt.verify(data.jwtPayload, jwtKey, function (err, decoded) {
        if (err) {
            res.send(false)
        } else
            res.send(true)
    })
}