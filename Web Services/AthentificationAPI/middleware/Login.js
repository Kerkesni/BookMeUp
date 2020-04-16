const bcrypt = require('bcrypt');
const Joi = require('@hapi/joi');
const User = require('../models/User')
var jwt = require('jsonwebtoken');


const jwtKey = 'my_secret_key'
const jwtExpirySeconds = 24 * 60 * 60

const schema = Joi.object({
    email: Joi.string()
        .email({
            minDomainSegments: 2,
        })
        .required(),
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{8,30}$'))
        .required()
})

module.exports = (req, res, next) => {
    let data = req.body
    if (schema.validate(data).error) {
        res.status(500)
        res.send("Wrong Data Schema")
        return
    }
    User.findOne({
            email: data.email
        })
        .then((user) => {
            if (!user) {
                res.send("No User Found")
                return
            }
            bcrypt.compare(data.password, user.password)
                .then(result => {
                    if (result) {
                        const token = jwt.sign({
                            data: {
                                id: user._id,
                                username: user.username
                            }
                        }, jwtKey, {
                            expiresIn: jwtExpirySeconds
                        })
                        res.cookie('jwtToken', token, {
                            maxAge: jwtExpirySeconds * 1000,
                            httpOnly: true
                        })
                        res.send(token)
                    } else {
                        res.send("Email or Password Incorrect")
                    }
                })
        })
        .catch(() => {
            res.status(500)
        })
}