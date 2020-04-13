const userToBook = require('../models/userToBooks')
const _ = require('lodash')
const Joi = require('@hapi/joi');

const schema = Joi.object({
    userId: Joi.string()
        .required(),
    book: Joi.object().keys({
        id: Joi.string().required(),
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
            userId: data.userId
        }).then((resp) => {
            let books = resp.books
            _.remove(books, (book) =>
                book.id === data.book.id
            )
            userToBook.updateOne({
                    userId: data.userId
                }, {
                    books: books
                })
                .then(() => res.send("Book Removed"))
                .catch(() => res.send("Error While removing book"))
        })
        .catch(() => res.send("User Not Found"))
}