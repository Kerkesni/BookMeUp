var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userToBooks = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        dropDups: true
    },
    password: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('User', userToBooks)