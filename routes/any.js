const express = require('express');
const router = express.Router();

const logger = require('../public/javascripts/logger/winston');
const url = require('url');


const blogsApi = require('../public/javascripts/static_blogs/blogs');

/* GET Any page. */
router.all('/', function(req, res, next) {
  logger.info(url.format({
    protocol: req.protocol,
    host: req.get('host'),
    pathname: req.originalUrl
  }));
  res.render("any_blogs", {blogs: blogsApi.getAllBlogs()});
});

module.exports = router;
