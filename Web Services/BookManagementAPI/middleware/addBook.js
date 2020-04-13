const userToBook = require('../models/userToBooks')
const _ = require('lodash')
const Joi = require('@hapi/joi');

const books = Joi.object().keys({
    id: Joi.string().required(),
    title: Joi.string().required(),
    author: Joi.string().required(),
})

const schema = Joi.object({
    userId: Joi.string()
        .required(),
    books: Joi.array().items(books)
})

module.exports = (req, res, next) => {
    let data = req.body

    if(schema.validate(data).error){
        res.status(500)
        res.send("Wrong Data Schema")
        return
    }

        userToBook.findOne({
            userId: data.userId
        })
        .then(user => {
            let books = user.books
            books = _.unionBy(books, data.books, 'id')
            userToBook.updateOne({
                    userId: data.userId
                }, {
                    books: books
                })
                .then(() => {
                    res.send("Book Added Successfully")
                })
                .catch((err) => {
                    console.log(err)
                    res.send("Error While Updating Model")
                })
        })
        .catch(() => {
            userToBook.create({
                    userId: data.userId,
                    books: data.books
                })
                .then(() => {
                    res.send("Book Added Successfully")
                })
                .catch((err) => {
                    console.log(err)
                    res.send("Error whlile saving model")
                })
        })
}