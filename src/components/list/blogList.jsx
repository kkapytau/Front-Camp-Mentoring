import React from 'react';
import Blog from '../blog/blog.jsx';
import api from '../../blogsAPI/api.js';
import './styles.scss';

export default class BlogList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      blogs: api.getFilteredBlogs(props)
    };
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      blogs: api.getFilteredBlogs(newProps)
    });
  }

  render() {
    const tmpResult = (this.state.blogs.length) ? this.state.blogs.map(data => (
        <Blog key={data.id} blog={data} filterBlogs={this.props.filterBlogs}  />)) : <div className="no-blogs">No Blogs Found</div>;
    return (
        <section className="blogs">
          {tmpResult}
        </section>
    );
  }
}