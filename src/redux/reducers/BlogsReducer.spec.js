import blogsReducer from './BlogsReducer';
import { getBlogsSuccess, deleteBlogSuccess } from '../actions/BlogsAction';
import { blogs } from '../../blogsApi/staticApi';

const initialState = {
    blogs: []
};

/* eslint-env jest */
describe('Reducers', () => {
    describe('blogReducer', () => {
        it('should provide the initial state', () => {
            expect(blogsReducer(undefined, {})).toEqual(initialState);
        });

        it('should get All blogs', () => {
            expect(blogsReducer(initialState, getBlogsSuccess( blogs))).toEqual({blogs:blogs});
        });

        it('should get If of deleted blog', () => {
            expect(blogsReducer(initialState, deleteBlogSuccess(2))).toEqual({blogs: [],id:2});
        });

        it('should ignore unknown actions', () => {
            expect(blogsReducer(initialState, { type: 'unknown' })).toEqual(initialState);
        });
    });
});
