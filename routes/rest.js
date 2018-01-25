var express = require('express');
var router = express.Router();

const blogsApi = require('../public/javascripts/static_blogs/blogs');

router.get('/', function(req, res, next) {
  res.render("any_blogs", {blogs: blogsApi.getAllBlogs()});
});

router.get('/:id', function(req, res, next) {
  res.render("any_blogs", {blogs: blogsApi.getBlogById(req.params.id)});
});

// use postman with Content-Type: application/x-www-form-urlencoded
router.post('/', function(req, res, next) {
  blogsApi.addBlog(req.body);
  res.render("any_blogs", {blogs: blogsApi.getAllBlogs()});
});

// use postman with Content-Type: application/x-www-form-urlencoded
router.put('/:id', function(req, res, next) {
  blogsApi.updateBlogById(req.params.id, req.body)
  res.render("any_blogs", {blogs: blogsApi.getAllBlogs()});
});

// use postman with Content-Type: application/x-www-form-urlencoded
router.delete('/:id', function(req, res, next) {
  res.render("any_blogs", {blogs: blogsApi.deleteBlogById(req.params.id)});
});

module.exports = router;