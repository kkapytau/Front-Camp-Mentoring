import dateformat from 'dateformat';

const blogs = [
  {
    id: 1,
    author: "Mr. K",
    article: "It is test artiIt is test articleIt is test articlecle",
    date: "01/25/2018",
    title: "Title"
  },
  {
    id: 2,
    author: "Mr. K2",
    article: "It is test artiIt is test articleIt is test articlecle 2",
    date: "01/25/2018",
    title: "Title2"
  },
  {
    id: 3,
    author: "Mr. K3",
    article: "It is test artiIt is test articleIt is test articlecle 3",
    date: "01/25/2018",
    title: "Title3"
  }
];

function StaticBlogAPI(){}

StaticBlogAPI.prototype.getBlogById = function(id){
  return blogs.filter(blog => blog.id == id);
};

StaticBlogAPI.prototype.getBlogIndexById = function(id){
  return blogs.findIndex(blog => blog.id == id);
};

StaticBlogAPI.prototype.getAllBlogs = function(){
  return blogs
};

StaticBlogAPI.prototype.filterBlogs = function(filterType, value){
  return blogs.filter(blog => blog[filterType].indexOf(value) !== -1);
};

StaticBlogAPI.prototype.getFilteredBlogs = function(params){
  //let blogs;
  /*switch (params.selectedType) {
    case 'title':
      blogs = this.filterBlogs(params.selectedType, params.filterText);
      break;
    case 'date':

      break;
    case 'author':

      break;
    case 'description':

      break;
    default:
      blogs = this.getAllBlogs();
      break;
  }*/

  if(params.selectedType === ""){
    return this.getAllBlogs();
  }else{
    return this.filterBlogs(params.selectedType, params.filterText);
  }
  //return blogs;
};

StaticBlogAPI.prototype.addBlog = function(blog){
  blog.id = blogs.length + 1;
  blog.date = dateformat(new Date(), "dd/mm/yyyy");
  blogs.push(blog);
};

StaticBlogAPI.prototype.updateBlogById = function(id, newData){
  const index = this.getBlogIndexById(id);
  const updatedBlog = blogs[index];
  for (var key in newData) {
    updatedBlog[key] = newData[key];
  }
};

StaticBlogAPI.prototype.deleteBlogById = function(id){
  const index = this.getBlogIndexById(id);
  blogs.splice(index, 1);
  return blogs;
};

const api = new StaticBlogAPI();

export default api;