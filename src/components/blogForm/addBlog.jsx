import React from 'react';
import api from '../../blogsAPI/api';
import './styles.scss';

export default class Wrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isToggleOn: true,
      author:'',
      title:'',
      article:''
    };
  }

  handleFormVisibility() {
    this.setState(function(prevState) {
      return {isToggleOn: !prevState.isToggleOn};
    });
  }

  handleChange(event){
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleClick(event) {
    event.preventDefault();
    delete this.state.isToggleOn;
    api.addBlog(this.state);
    this.props.filterBlogs({
      selectedType: "",
      filterText: ""
    });
    event.target.form.reset();
    this.setState({
      isToggleOn: true
    });
  }

  render() {
    return (
        <section className="new-blog">
          <button className="add-blog btn btn-default" onClick={() =>{this.handleFormVisibility()}}>Add New Blog</button>
          <div className={this.state.isToggleOn ? 'blog-form hidden' : 'blog-form'}>
            <form action="/">
              <div className="form-group">
                <label htmlFor="author">Enter Blog Author:</label>
                <input type="text" className="form-control" id="author" value={this.state.author} onChange={(e) =>{this.handleChange(e)}} placeholder="Enter Author" name="author"/>
              </div>
              <div className="form-group">
                <label htmlFor="title">Enter Blog Title:</label>
                <input type="text" className="form-control" id="title" value={this.state.title} onChange={(e) =>{this.handleChange(e)}} placeholder="Enter Title" name="title"/>
              </div>
              <div className="form-group">
                <label htmlFor="article">Enter Blog Article:</label>
                <textarea className="form-control" value={this.state.article} onChange={(e) =>{this.handleChange(e)}} name="article" rows="5" id="article"/>
              </div>
              <button type="submit" onClick={(e) =>{this.handleClick(e)}} className="btn btn-success">Submit</button>
            </form>
          </div>
        </section>
    );
  }
}