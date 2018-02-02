const express = require('express');
const router = express.Router();

const url = require('url');
const logger = require('../public/javascripts/logger/winston');
const blogsApi = require('../public/javascripts/static_blogs/blogs');

router.get('/', function(req, res, next) {
  logger.info(url.format({
    protocol: req.protocol,
    host: req.get('host'),
    pathname: req.originalUrl
  }));
  res.render("any_blogs", {blogs: blogsApi.getAllBlogs()});
});

router.get('/:id', function(req, res, next) {
  logger.info(url.format({
    protocol: req.protocol,
    host: req.get('host'),
    pathname: req.originalUrl
  }));
  res.render("any_blogs", {blogs: blogsApi.getBlogById(req.params.id)});
});

// use postman with Content-Type: application/x-www-form-urlencoded
router.post('/', function(req, res, next) {
  blogsApi.addBlog(req.body);
  logger.info(url.format({
    protocol: req.protocol,
    host: req.get('host'),
    pathname: req.originalUrl
  }));
  res.render("any_blogs", {blogs: blogsApi.getAllBlogs()});
});

// use postman with Content-Type: application/x-www-form-urlencoded
router.put('/:id', function(req, res, next) {
  blogsApi.updateBlogById(req.params.id, req.body);
  logger.info(url.format({
    protocol: req.protocol,
    host: req.get('host'),
    pathname: req.originalUrl
  }));
  res.render("any_blogs", {blogs: blogsApi.getAllBlogs()});
});

// use postman with Content-Type: application/x-www-form-urlencoded
router.delete('/:id', function(req, res, next) {
  logger.info(url.format({
    protocol: req.protocol,
    host: req.get('host'),
    pathname: req.originalUrl
  }));
  res.render("any_blogs", {blogs: blogsApi.deleteBlogById(req.params.id)});
});

module.exports = router;