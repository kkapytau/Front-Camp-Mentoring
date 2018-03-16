import dateformat from 'dateformat';
import axios from 'axios';
import qs from 'qs';

import { getBlogsSuccess, deleteBlogSuccess } from '../redux/actions/BlogsAction';

function DbBlogAPI(){}

DbBlogAPI.prototype.getAllBlogs = function(){
    return async (dispatch) => {
        await axios({
            url: 'http://localhost:3000/api/blogs',
            withCredentials: true,
            method: "GET"
        })
        .then((response) => {
            dispatch(getBlogsSuccess(response.data));
        })
        .catch((error) => {
            console.log(error); // eslint-disable-line no-console
        });
    };
};

DbBlogAPI.prototype.filterBlogs = function(filterData){
    return async (dispatch) => {
        await axios({
            url: `http://localhost:3000/api/blogs/${filterData.selectedType}/${filterData.filterText}`,
            withCredentials: true,
            method: "GET"
        })
        .then((response) => {
            dispatch(getBlogsSuccess(response.data));
        })
        .catch((error) => {
            console.log(error); // eslint-disable-line no-console
        });
    };
};


DbBlogAPI.prototype.addBlog = function(blog){
    blog.date = dateformat(new Date(), "mm/dd/yyyy HH:MM:ss:l");
    return axios({
        method: 'post',
        withCredentials: true,
        url: 'http://localhost:3000/api/blogs',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        data: qs.stringify(blog)
    });
};

DbBlogAPI.prototype.deleteBlogById = function(id){
    return async (dispatch) => {
        await axios({
            url:`http://localhost:3000/api/blogs/${id}`,
            withCredentials: true,
            method: "DELETE"
        })
        .then((response) => {
            dispatch(deleteBlogSuccess(response.data._id));
        })
        .catch((error) => {
            console.log(error); // eslint-disable-line no-console
        });
    };
};

const api = new DbBlogAPI();

export default api;