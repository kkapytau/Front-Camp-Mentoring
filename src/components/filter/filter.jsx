import React from 'react';
import './styles.scss';

export default class Filter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedType : "",
      filterText : ""
    };
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
          <select defaultValue="" onChange={(e) => { this.handleFilterType(e); }} className="filter-type form-control">
            <option value="">Choose Way of Filtering</option>
            <option value="title">By Title</option>
            <option value="date">By Date</option>
            <option value="author">By Author</option>
            <option value="article">By Part of Description</option>
          </select>
        </div>
        <div className="col-xs-3">
          <input onChange={(e) => { this.handleFilterBlogText(e); }} className="filter form-control" type="text" value={this.state.filterText} />
        </div>
        <button onClick={() => { this.handleFilterBlogs(); }} className="find-blog btn btn-primary">Find Blogs</button>
      </div>
    );
  }
}