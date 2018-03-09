const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/blogs');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("AAAAA connectin is opened!!!!");
});

module.exports = mongoose;