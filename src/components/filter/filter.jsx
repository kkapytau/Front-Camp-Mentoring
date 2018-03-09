import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
//import api from '../../blogsAPI/dbApi';
import { getFilterData } from '../../redux/actions/FilterActions';
import './styles.scss';

export class Filter extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedType : "",
      filterText : ""
    };

    this.handleFilterBlogs = this.handleFilterBlogs.bind(this);
    this.handleFilterType = this.handleFilterType.bind(this);
    this.handleFilterBlogText = this.handleFilterBlogText.bind(this);
  }

  handleFilterType(event){
    this.setState({ selectedType: event.target.value});
  }

  handleFilterBlogText(event){
    this.setState({ filterText: event.target.value});
  }

  handleFilterBlogs(){
    this.props.filterBlogs(this.state);
  }

  render() {
    return (
      <div className="filter-wrapper form-row">
        <div className="col-xs-3">
          <select defaultValue="" onChange={this.handleFilterType} className="filter-type form-control">
            <option value="">Choose Way of Filtering</option>
            <option value="title">By Title</option>
            <option value="author">By Author</option>
            <option value="article">By Part of Description</option>
          </select>
        </div>
        <div className="col-xs-3">
          <input onChange={ this.handleFilterBlogText} className="filter form-control" type="text" value={this.state.filterText} />
        </div>
        <button onClick={ this.handleFilterBlogs } className="find-blog btn btn-primary">Find Blogs</button>
        <Link to='/add-blog' className="add-blog btn btn-info">Add New Blog</Link>
      </div>
    );
  }
}

function dispatchFilterData(data){
  return (dispatch) => {
    dispatch(getFilterData(data));
  }

}

function mapDispatchToProps(dispatch) {
  return {
    filterBlogs: bindActionCreators(dispatchFilterData, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(Filter);