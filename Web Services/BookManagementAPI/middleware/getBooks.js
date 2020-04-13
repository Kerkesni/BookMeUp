const userToBook = require('../models/userToBooks')

module.exports = (req, res, next) => {
    userToBook.findOne({
            userId: req.params.id
        }).then((user) => {
            if(!user)
                res.send('No User Found')
            else
                res.send(user.books)
        })
        .catch(() => {
            res.send('An Error Occured')
            res.status(500)
        })
}