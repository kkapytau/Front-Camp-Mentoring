import React from 'react';
import api from '../../blogsAPI/api';
import './styles.scss';

function handleDeleteBlog(event, id, filterBlogs){
  event.preventDefault();
  api.deleteBlogById(id);
  filterBlogs({
    selectedType: "",
    filterText: ""
  });
}

export default function Blog(props) {
  return (
    <div className="card blog">
      <div className="card-body">
        <h5 className="card-title">{props.blog.title}</h5>
        <p className="card-text">{props.blog.article}</p>
      </div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">
          <span className="date">Published at: {props.blog.date}</span>
        </li>
        <li className="list-group-item">
          <span className="author"> {props.blog.author}</span>
        </li>
      </ul>
      <div className="card-body">
        <a href="#" onClick={(e)=>{handleDeleteBlog(e,props.blog.id, props.filterBlogs)}} className="card-link">Delete Blog</a>
      </div>
    </div>
  );
}