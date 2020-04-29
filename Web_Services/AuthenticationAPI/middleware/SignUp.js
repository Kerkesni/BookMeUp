const bcrypt = require('bcrypt');
const Joi = require('@hapi/joi');
const User = require('../models/User')

const saltRounds = 12;

const schema = Joi.object({
    username: Joi.string().
    required(),
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
            email: data.email,
            username: data.username
        })
        .then((user) => {
            if (user) {
                res.send("user Already Exists")
                return
            }
            bcrypt.hash(data.password, saltRounds)
                .then(hash => {
                    User.create({
                            username: data.username,
                            email: data.email,
                            password: hash
                        })
                        .then(() => res.send("User Created"))
                        .catch(() => res.status(500))
                })
        })
        .catch(() => {
            res.status(500)
        })


}