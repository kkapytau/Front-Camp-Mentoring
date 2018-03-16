import { GET_BLOG_LIST, DELETE_BLOG } from '../constants/Constants';

export function getBlogsSuccess(blogs) {
  return {
    type: GET_BLOG_LIST,
    payload: blogs
  };
}

export function deleteBlogSuccess(id) {
  return {
    type: DELETE_BLOG,
    payload: id
  };
}

