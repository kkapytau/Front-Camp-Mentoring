import React from 'react';
import api from '../../blogsAPI/dbApi.js';
import BlogList from '../list/blogList';
import Filter from '../filter/filter';
import './styles.scss';

export default class Wrapper extends React.Component {
  constructor(props) {
    super(props);
  }

  static fetchData(dispatch){
      return api.getAllBlogs()(dispatch);
  }

  render() {
    return (
       <section className="wrapper">
         <Filter {...this.props} />
         <BlogList {...this.props} />
       </section>
    );
  }
}