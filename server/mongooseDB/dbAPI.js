const Blog = require('./models/blog');

function dataBaseAPI(){};

dataBaseAPI.prototype.addBlogPromise = function(blog){
  return new Blog(blog).save();
};

dataBaseAPI.prototype.getAllBlogsPromise = function(){
 return Blog.find().exec();
};

dataBaseAPI.prototype.getBlogByIdPromise = function(id){
  return Blog.find({_id:id}).exec();
};

dataBaseAPI.prototype.updateBlogByIdPromise = function(id, newData){
  return Blog.findByIdAndUpdate(id, newData, {new: true}).exec();
};

dataBaseAPI.prototype.deleteBlogByIdPromise = function(id){
  return Blog.findByIdAndRemove(id).exec();
};

dataBaseAPI.prototype.filterBlogsPromise = function(filterType, value){
    return Blog.find({[filterType]:new RegExp(value)}).exec();
};

module.exports = new dataBaseAPI();