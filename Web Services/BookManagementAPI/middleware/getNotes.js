const userToBook = require('../models/userToBooks')
const _ = require('lodash')
const Joi = require('@hapi/joi');

const schema = Joi.object({
    userId: Joi.string()
        .required(),
    bookId: Joi.string()
        .required(),
})

module.exports = (req, res, next) => {
    let data = {
        userId: req.params.userId,
        bookId: req.params.bookId
    }
    if (schema.validate(data).error) {
        res.status(500)
        res.send("Wrong Data Schema")
        return
    }
    userToBook.findOne({
            'userId': data.userId,
        })
        .then(user => {
            let book = user.books.find((book) => book.id === data.bookId)
            if (!book) {
                res.send('No Book Found')
                return
            }
            res.send(book.notes)
        })
        .catch(() => res.send('No User Found'))
}