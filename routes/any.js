var express = require('express');
var router = express.Router();

const blogs = require('../public/javascripts/static_blogs/blogs');

/* GET Any page. */
router.all('/', function(req, res, next) {
  res.render("any_blogs", {blogs: blogs});
});

module.exports = router;
