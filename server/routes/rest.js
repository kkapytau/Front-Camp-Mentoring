const express = require('express');
const router = express.Router();

const url = require('url');
// is not used anymore, as we have DB
//const blogsApi = require('../public/javascripts/static_blogs/blogs');
const dataBaseAPI = require('../mongooseDB/dbAPI');

router.get('/', isLoggedIn, function(req, res, next) {
  dataBaseAPI.getAllBlogsPromise().then(function (blogs) {
    res.json(blogs);
  });
});

router.get('/:id', isLoggedIn, function(req, res, next) {
  dataBaseAPI.getBlogByIdPromise(req.params.id).then(function (blogs) {
    res.render("any_blogs", {blogs: blogs});
  });

});

router.get('/:key/:value', isLoggedIn, function(req, res, next) {
    dataBaseAPI.filterBlogsPromise(req.params.key, req.params.value).then(function (blogs) {
        res.json(blogs);
    });

});

// use postman with Content-Type: application/x-www-form-urlencoded
router.post('/', isLoggedIn, function(req, res, next) {
  dataBaseAPI.addBlogPromise(req.body).then(function (blog) {
      res.json(blog);
  });
});

// use postman with Content-Type: application/x-www-form-urlencoded
router.put('/:id', function(req, res, next) {
  dataBaseAPI.updateBlogByIdPromise(req.params.id, req.body).then(function (updatedBlog) {
    dataBaseAPI.getAllBlogsPromise().then(function (blogs) {
      res.render("any_blogs", {blogs: blogs});
    });
  });

});

// use postman with Content-Type: application/x-www-form-urlencoded
router.delete('/:id', function(req, res, next) {
  dataBaseAPI.deleteBlogByIdPromise(req.params.id).then(function (deletedBlog) {
      res.json(deletedBlog);
  });
});

// route middleware to make sure
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    // Uncomment that for checking Task5
    if(req.isAuthenticated()) {
        console.log("user is Authenticated")
        return next();
    }
    console.log("User is not Authenticated!!!111 "+req.originalUrl);
    // if they aren't redirect them to the home page
    res.json({message: "User is not Authenticated"});
}

module.exports = router;