var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userToBooks = new Schema({
  userId: {
    type: String,
    unique: true,
    required: true,
    dropDups: true
  },
  books: [{
    _id: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    authors: {
      type: String,
      required: true
    },
    thumbnail: {
      type: String,
      required: true
    },
    notes: [{
      title: {
        type: String,
        required: true,
        unique: true,
        dropDups: true
      },
      content: {
        type: String,
        required: true,
      },
      timestamp: {
        type: Number,
        required: true
      },
      order: {
        type: Number,
        required: false
      }
    }],
    current_page: {
      type: Number,
      required: true,
      default: 0
    },
    total_pages: {
      type: Number,
      required: true,
    },
  }],
});

module.exports = mongoose.model('userToBooks', userToBooks)