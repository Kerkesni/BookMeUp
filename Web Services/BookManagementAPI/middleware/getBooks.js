const userToBook = require('../models/userToBooks')
const _ = require('lodash')

module.exports = (req, res, next) => {
    userToBook.findOne({
            userId: req.params.id
        }).then((user) => {
            if (!user)
                res.send([])
            else {
                let books = _.map(user.books, (book) => {
                    return {
                        id: book.id,
                        title: book.title,
                        authors: book.authors,
                        thumbnail: book.thumbnail,
                        current_page: book.current_page,
                        total_pages: book.total_pages
                    }
                })
                res.send(books)
            }
        })
        .catch(() => {
            res.send('An Error Occured')
            res.status(500)
        })
}