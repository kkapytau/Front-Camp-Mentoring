const express = require('express');
const router = express.Router();

const url = require('url');
const logger = require('../public/javascripts/logger/winston');
// is not used anymore, as we have DB
//const blogsApi = require('../public/javascripts/static_blogs/blogs');
const dataBaseAPI = require('../public/javascripts/mongooseDB/dbAPI');

router.get('/', isLoggedIn, function(req, res, next) {
  console.log("Blog path was detected");
  logger.info(url.format({
    protocol: req.protocol,
    host: req.get('host'),
    pathname: req.originalUrl
  }));
  dataBaseAPI.getAllBlogsPromise().then(function (blogs) {
    res.render("any_blogs", {blogs: blogs});
  });
});

router.get('/:id', isLoggedIn, function(req, res, next) {
  logger.info(url.format({
    protocol: req.protocol,
    host: req.get('host'),
    pathname: req.originalUrl
  }));
  dataBaseAPI.getBlogByIdPromise(req.params.id).then(function (blogs) {
    res.render("any_blogs", {blogs: blogs});
  });

});

// use postman with Content-Type: application/x-www-form-urlencoded
router.post('/', function(req, res, next) {
  dataBaseAPI.addBlogPromise(req.body).then(function (blog) {
    if(blog._id) {
      dataBaseAPI.getAllBlogsPromise().then(function (blogs) {
        res.render("any_blogs", {blogs: blogs});
      });
    }
  });
  logger.info(url.format({
    protocol: req.protocol,
    host: req.get('host'),
    pathname: req.originalUrl
  }));
});

// use postman with Content-Type: application/x-www-form-urlencoded
router.put('/:id', function(req, res, next) {
  logger.info(url.format({
    protocol: req.protocol,
    host: req.get('host'),
    pathname: req.originalUrl
  }));
  dataBaseAPI.updateBlogByIdPromise(req.params.id, req.body).then(function (updatedBlog) {
    dataBaseAPI.getAllBlogsPromise().then(function (blogs) {
      res.render("any_blogs", {blogs: blogs});
    });
  });

});

// use postman with Content-Type: application/x-www-form-urlencoded
router.delete('/:id', function(req, res, next) {
  logger.info(url.format({
    protocol: req.protocol,
    host: req.get('host'),
    pathname: req.originalUrl
  }));
  dataBaseAPI.deleteBlogByIdPromise(req.params.id).then(function (deletedBlog) {
    dataBaseAPI.getAllBlogsPromise().then(function (blogs) {
      res.render("any_blogs", {blogs: blogs});
    });
  });
});

// route middleware to make sure
function isLoggedIn(req, res, next) {

  // if user is authenticated in the session, carry on
  if (req.isAuthenticated())
    return next();
  console.log("User is not Authenticated!!! "+req.originalUrl);
  // if they aren't redirect them to the home page
  res.redirect('/');
}

module.exports = router;