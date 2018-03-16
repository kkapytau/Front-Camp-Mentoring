import React from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

import { shallow } from 'enzyme';
import ShallowRenderer from 'react-test-renderer/shallow';
import { Blog } from './blog';

import { blogs } from '../../blogsApi/staticApi';

configure({ adapter: new Adapter() });

const renderer = new ShallowRenderer();

const defaultProps = {
    blog: {
        _id: 1,
        title: "Unknown",
        article: "Unknown",
        author: "Unknown",
        date: "Unknown T Unknown",
    },
    deleteBlogById: jest.fn()
};

function setup(props = defaultProps) {
    const component = shallow(<Blog {...props} />);

    return {
        component,
        link: component.find('a.card-link')
    };
}

const fakeProps = {
    blog: blogs[1],
    deleteBlogById: jest.fn()
};

describe('Blog component --- Snapshot', () => {
    it('Default value (empty array)', () => {
        const renderedValue = renderer.render(<Blog {...defaultProps} />);
        expect(renderedValue).toMatchSnapshot();
    });
    it('Some data', () => {
        const renderedValue = renderer.render(<Blog {...fakeProps} />);
        expect(renderedValue).toMatchSnapshot();
    });
});

describe('Blog component ---- Pure testing', () => {
    const { component, link } = setup();
    it('render the DUMB component', () => {
        expect(component.length).toEqual(1);
    });
    it('test handler function', () => {
        const fakeEvent = { preventDefault: () => console.log('preventDefault') };
        link.simulate('click', fakeEvent);
        expect(defaultProps.deleteBlogById).toBeCalled();
        expect(defaultProps.deleteBlogById.mock.calls[0][0]).toEqual(1);
    });

    it('should check default state', () => {
        expect(component.find('.card-title').text()).toEqual(defaultProps.blog.title);
        expect(component.find('.card-text').text()).toEqual(defaultProps.blog.article);
        expect(component.find('.author').text()).toEqual(defaultProps.blog.author);
    });

    it('should display custom state of filter buttons and search input', () => {
        const { component } = setup(fakeProps);
        expect(component.find('.card-title').text()).toEqual(fakeProps.blog.title);
        expect(component.find('.card-text').text()).toEqual(fakeProps.blog.article);
        expect(component.find('.author').text()).toEqual(fakeProps.blog.author);
    });

});