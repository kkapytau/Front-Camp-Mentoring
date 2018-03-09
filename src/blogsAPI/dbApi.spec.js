import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import api from './dbApi';
import { blogs } from './staticApi';
import { getBlogsSuccess, deleteBlogSuccess } from '../redux/actions/BlogsAction';

describe('works with async/await', () => {
    it('Should dispatch list of blogs', async () => {
        const mock = new MockAdapter(axios);

        // Mock any GET request to /movies
        // arguments for reply are (status, data, headers)
        mock.onGet('http://localhost:3000/api/blogs').reply(200, blogs);

        // mock the dispatch and getState functions from Redux thunk.
        const dispatch = jest.fn();
        await api.getAllBlogs()(dispatch);

        expect(dispatch.mock.calls[0][0]).toEqual(getBlogsSuccess(blogs));
        expect(dispatch.mock.calls[0][0].payload.length).toEqual(3);
    });

    it('Should dispatch single blog', async () => {
        const mock = new MockAdapter(axios);
        const filterData = {
            selectedType: 'title',
            filterText: '2'
        };

        mock.onGet(`http://localhost:3000/api/blogs/${filterData.selectedType}/${filterData.filterText}`).reply(200, blogs[1]);

        const dispatch = jest.fn();
        await api.filterBlogs(filterData)(dispatch);

        expect(dispatch.mock.calls[0][0]).toEqual(getBlogsSuccess(blogs[1]));

    });

    it('Should dispatch deleting blog', async () => {
        const mock = new MockAdapter(axios);
        const id = 1;

        mock.onDelete(`http://localhost:3000/api/blogs/${id}`).reply(200, {_id:1});

        const dispatch = jest.fn();
        await api.deleteBlogById(id)(dispatch);

        expect(dispatch.mock.calls[0][0]).toEqual(deleteBlogSuccess(blogs[0].id));

    });
});