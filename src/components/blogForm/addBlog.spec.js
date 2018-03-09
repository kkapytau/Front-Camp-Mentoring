import React from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

import { shallow } from 'enzyme';
import ShallowRenderer from 'react-test-renderer/shallow';
import AddBlog from './addBlog';

configure({ adapter: new Adapter() });

const renderer = new ShallowRenderer();

const defaultState = {
    author:'',
    title:'',
    article:''
};

function setup() {
    const component = shallow(<AddBlog />);

    return {
        component
    };
}

const fakeState = {
    author:'fake author',
    title:'fake title',
    article:'fake article'
};

describe('Add Blog component --- Snapshot', () => {
    it('Default value (empty array)', () => {
        const renderedValue = renderer.render(<AddBlog />);
        expect(renderedValue).toMatchSnapshot();
    });
});

describe('Add Blog component ---- Pure testing', () => {
    const { component } = setup();
    it('render the DUMB component', () => {
        expect(component.length).toEqual(1);
    });
    /*it('test handler function', () => {
        const fakeEvent = { preventDefault: () => console.log('preventDefault') };
        link.simulate('click', fakeEvent);
        expect(defaultProps.deleteBlogById).toBeCalled();
        expect(defaultProps.deleteBlogById.mock.calls[0][0]).toEqual(1);
    });*/

    it('should check default state', () => {
        const title = component.find("input[name='title']");
        const article = component.find("input[name='author']");
        const author = component.find("textarea[name='article']");

        title.simulate('change', {
            target: {
                value: defaultState.title,
                name: "title"
            }
        });
        article.simulate('change', {
            target: {
                value: defaultState.article,
                name: "article"
            }
        });
        author.simulate('change', {
            target: {
                value: defaultState.author,
                name: "author"
            }
        });
        expect(component.state().title).toEqual(defaultState.title);
        expect(component.state().article).toEqual(defaultState.article);
        expect(component.state().author).toEqual(defaultState.author);
    });

    it('should display custom state ', () => {
        const title = component.find("input[name='title']");
        const article = component.find("input[name='author']");
        const author = component.find("textarea[name='article']");

        title.simulate('change', {
            target: {
                value: fakeState.title,
                name: "title"
            }
        });
        article.simulate('change', {
            target: {
                value: fakeState.article,
                name: "article"
            }
        });
        author.simulate('change', {
            target: {
                value: fakeState.author,
                name: "author"
            }
        });
        expect(component.state().title).toEqual(fakeState.title);
        expect(component.state().article).toEqual(fakeState.article);
        expect(component.state().author).toEqual(fakeState.author);
    });

});