var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userToBooks = new Schema({
  userId: { type : String , unique : true, required : true, dropDups: true },
  books: [{
    id: { type : String , required : true },
    title: { type : String , required : true },
    authors: { type : String , required : true },
  }],
});

module.exports = mongoose.model('userToBooks', userToBooks)