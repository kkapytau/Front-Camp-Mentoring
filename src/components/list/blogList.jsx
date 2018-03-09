import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Blog from '../blog/blog.jsx';
//import api from '../../blogsAPI/staticApi.js';
import api from '../../blogsAPI/dbApi.js';
import './styles.scss';

export class BlogList extends React.Component {
  constructor(props) {
    super(props);
    this.props.getBlogs();
  }

  componentWillReceiveProps(nextProps){
      if((nextProps.deletedBlogId !== this.props.deletedBlogId) || (nextProps.filterData != this.props.filterData)){
          (nextProps.filterData.selectedType != "") ? this.props.filterBlogs(nextProps.filterData) : this.props.getBlogs();
      }
  }

  shouldComponentUpdate(nextProps, nextState){
      return (this.props.blogs.length != nextProps.blogs.length);
  }

  render() {
    const tmpResult = (this.props.blogs.length) ? this.props.blogs.map(data => (
        <Blog key={data._id} blog={data} />)) : <div className="no-blogs">No Blogs Found</div>;
    return (
        <section className="blogs">
          {tmpResult}
        </section>
    );
  }
}

function mapDispatchToProps(dispatch) {
    return {
        getBlogs: bindActionCreators(api.getAllBlogs, dispatch),
        filterBlogs: bindActionCreators(api.filterBlogs, dispatch)
    };
}

const mapStateToProps = function (store) {
    return {
        blogs: store.blogsState.blogs,
        deletedBlogId: store.blogsState.id,
        filterData: store.filtersState.data
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BlogList);