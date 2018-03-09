import { GET_BLOG_LIST, DELETE_BLOG } from '../constants/Constants';

const initialState = {
  blogs: []
};

export default function blogsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_BLOG_LIST:
      return { ...state, blogs: action.payload };
    case DELETE_BLOG:
      return { ...state, id: action.payload };
    default:
      return state;
  }
}
