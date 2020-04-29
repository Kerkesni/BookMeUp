const userToBook = require('../models/userToBooks')
const _ = require('lodash')
const Joi = require('@hapi/joi');

const schema = Joi.object({
    userId: Joi.string()
        .required(),
    bookId: Joi.string().required(),
})

module.exports = (req, res, next) => {

    if (schema.validate({
            userId: req.params.userId,
            bookId: req.params.bookId
        }).error) {
        res.status(500)
        res.send("Wrong Data Schema")
        return
    }

    userToBook.findOne({
            userId: req.params.userId
        }).then((user) => {
            user.books = user.books.filter((book) =>
                book.id !== req.params.bookId
            )
            user.save()
            res.send(user.books)
            //res.send("Book Removed")
        })
        .catch(() => res.send("User Not Found"))
}