var mongoose = require('mongoose');

module.exports = () => {
    const options = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
        autoIndex: false, // Don't build indexes
        poolSize: 10, // Maintain up to 10 socket connections
        serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
        socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
        family: 4 // Use IPv4, skip trying IPv6
    };

    var urlmongo = "mongodb://mongo-manage:27017/bookmeup";

    mongoose.connect(urlmongo, options);

    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'Error Occured While Connecting to Database'));
    db.once('open', function () {
        console.log("Connected to DataBase");
    });
}