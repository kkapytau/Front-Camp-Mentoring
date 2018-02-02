const mongoose = require('../connection');

const blogSchema = mongoose.Schema({
  author: String,
  article: String,
  date: Date,
  title: String
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;