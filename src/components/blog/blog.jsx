import React from 'react';
//import api from '../../blogsAPI/staticApi';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import api from '../../blogsAPI/dbApi';
import './styles.scss';

function handleDeleteBlog(event, id, deleteBlogById){
    event.preventDefault();
    deleteBlogById(id);
}

export function Blog(props) {
    let dateArr = props.blog.date.split("T");
  return (
    <div className="card blog">
      <div className="card-body">
        <h5 className="card-title">{props.blog.title}</h5>
        <p className="card-text">{props.blog.article}</p>
      </div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">
          <span className="date">Published at: {dateArr[0]} {dateArr[1].substr(0,5)}</span>
        </li>
        <li className="list-group-item">
          <span className="author">{props.blog.author}</span>
        </li>
      </ul>
      <div className="card-body">
        <a href="#" onClick={(e)=>{handleDeleteBlog(e,props.blog._id, props.deleteBlogById)}} className="card-link">Delete
            Blog</a>
      </div>
    </div>
  );
}

function mapDispatchToProps(dispatch) {
    return {
        deleteBlogById: bindActionCreators(api.deleteBlogById, dispatch)
    };
}

export default connect(null, mapDispatchToProps)(Blog);