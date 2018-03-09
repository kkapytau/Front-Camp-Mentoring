import React from 'react';
import { Link } from 'react-router-dom';
//import api from '../../blogsAPI/staticApi';
import api from '../../blogsAPI/dbApi';
import './styles.scss';

export default class Wrapper extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      author:'',
      title:'',
      article:''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(event){
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleClick(event) {
    event.preventDefault();
    api.addBlog(this.state).then((res) => {
        this.setState({
            author:'',
            title:'',
            article:''
        })
    })
    .catch((error) => {
        console.log(error);
    });
  }

  render() {
    return (
        <div className="wrapper">
            <section className="new-blog">
              <div className='blog-form'>
                <form action="http://localhost:3000/blogs">
                  <div className="form-group">
                    <label htmlFor="author">Enter Blog Author:</label>
                    <input type="text" className="form-control" id="author" value={this.state.author} onChange={this.handleChange} placeholder="Enter Author" name="author"/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="title">Enter Blog Title:</label>
                    <input type="text" className="form-control" id="title" value={this.state.title} onChange={this.handleChange} placeholder="Enter Title" name="title"/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="article">Enter Blog Article:</label>
                    <textarea className="form-control" value={this.state.article} onChange={this.handleChange} name="article" rows="5" id="article"/>
                  </div>
                  <Link to="/blogs" className="btn btn-info">Back to blogs</Link>
                  <button type="submit" onClick={this.handleClick} className="btn btn-success">Submit</button>
                </form>
              </div>
            </section>
        </div>
    );
  }
}