const userToBook = require('../models/userToBooks')
const _ = require('lodash')
const Joi = require('@hapi/joi');

const schema = Joi.object({
    userId: Joi.string()
        .required(),
    bookId: Joi.string()
        .required(),
    note: Joi.object().keys({
        title: Joi.string().required(),
        content: Joi.string().required(),
        timestamp: Joi.number().required(),
        order: Joi.number(),
    })
})

module.exports = (req, res, next) => {
    let data = req.body
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
            if (!book.notes.find((note) => note.title === data.note.title)) {
                book.notes.push(data.note)
                user.save()
                res.send('Note Added')
            } else {
                res.send('Note With Same Title Already Exists')
            }
        })
        .catch(() => res.send('No User Found'))
}