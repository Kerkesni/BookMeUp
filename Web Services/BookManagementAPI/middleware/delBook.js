const userToBook = require('../models/userToBooks')
const _ = require('lodash')
const Joi = require('@hapi/joi');

const schema = Joi.object({
    userId: Joi.string()
        .required(),
    id: Joi.string().required(),
})

module.exports = (req, res, next) => {

    if (schema.validate({
            userId: req.params.userId,
            id: req.params.id
        }).error) {
        res.status(500)
        res.send("Wrong Data Schema")
        return
    }

    userToBook.findOne({
            userId: req.params.userId
        }).then((resp) => {
            let books = resp.books
            _.remove(books, (book) =>
                book.id === req.params.id
            )
            userToBook.updateOne({
                    userId: req.params.userId
                }, {
                    books: books
                })
                .then(() => res.send("Book Removed"))
                .catch(() => res.send("Error While removing book"))
        })
        .catch(() => res.send("User Not Found"))
}