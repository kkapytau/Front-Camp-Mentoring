const blogs = [
  {
    id: 1,
    author: "Mr. K",
    article: "It is test article",
    date: "01/25/2018",
    title: "Title"
  },
  {
    id: 2,
    author: "Mr. K2",
    article: "It is test article 2",
    date: "01/25/2018",
    title: "Title2"
  },
  {
    id: 3,
    author: "Mr. K3",
    article: "It is test article 3",
    date: "01/25/2018",
    title: "Title3"
  }
];

function staticBlogAPI(){};

staticBlogAPI.prototype.getBlogById = function(id){
  return blogs.filter(blog => blog.id == id);
};

staticBlogAPI.prototype.getBlogIndexById = function(id){
  return blogs.findIndex(blog => blog.id == id);
};

staticBlogAPI.prototype.getAllBlogs = function(){
  return blogs
};

staticBlogAPI.prototype.addBlog = function(blog){
  blogs.push(blog);
};

staticBlogAPI.prototype.updateBlogById = function(id, newData){
  const index = this.getBlogIndexById(id);
  const updatedBlog = blogs[index];
  for (var key in newData) {
    updatedBlog[key] = newData[key];
  }
};

staticBlogAPI.prototype.deleteBlogById = function(id){
  const index = this.getBlogIndexById(id);
  blogs.splice(index, 1);
  return blogs;
};

module.exports = new staticBlogAPI();
