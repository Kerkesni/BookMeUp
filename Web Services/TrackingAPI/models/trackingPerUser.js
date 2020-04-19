var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var trackingPerUser = new Schema({
    UID: {
        type: String,
        unique: true,
        required: true,
        dropDups: true
    },
    BID: {
        type: String,
        required: true,
        dropDups: true
    },
    current_page: {
        type: Number,
        required: true,
        default: 0
    },
    total_pages: {
        type: Number,
        required: true,
    },
    finish_date: {
        type: Number,
        required: true,
    },
    last_read: {
        type: Number,
        required: true,
    },
    add_date: {
        type: Number,
        required: true,
    },
    dates: [{
        date: {
            type: Number,
            required: true
        },
        pages: {
            type: Number,
            required: true
        }
    }]
});

module.exports = mongoose.model('trackingPerUser', trackingPerUser)