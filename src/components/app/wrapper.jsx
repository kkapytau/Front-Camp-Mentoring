import React from 'react';
import BlogList from '../list/blogList';
import Filter from '../filter/filter';
import AddBlogForm from '../blogForm/addBlog';
import './styles.scss';

export default class Wrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedType: "",
      filterText: ""
    };
    this.handleFilterParameters = this.handleFilterParameters.bind(this);
  }

  handleFilterParameters(params){
    this.setState(params);
  }

  render() {
    return (
       <section className="wrapper">
         <Filter filterBlogs={this.handleFilterParameters} />
         <AddBlogForm filterBlogs={this.handleFilterParameters} />
         <BlogList {...this.state} filterBlogs={this.handleFilterParameters}/>
       </section>
    );
  }
}