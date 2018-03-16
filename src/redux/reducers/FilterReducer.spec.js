import filterReducer from './FilterReducer';
import { getFilterData } from '../actions/FilterActions';

const initialState = {
    data: {
        filterText: '',
        selectedType: ''
    }
};

/* eslint-env jest */
describe('Reducers', () => {
    describe('filterReducer', () => {
        it('should provide the initial state', () => {
            expect(filterReducer(undefined, {})).toEqual(initialState);
        });

        it('should get Filter Text', () => {
            expect(filterReducer(initialState, getFilterData( {
                filterText: 'AAA',
                selectedType: ''
            }))).toEqual({data:{
                filterText: 'AAA',
                selectedType: ''
            }});
        });

        it('should get Selected Type', () => {
            expect(filterReducer(initialState, getFilterData( {
                filterText: '',
                selectedType: 'title'
            }))).toEqual({data:{
                filterText: '',
                selectedType: 'title'
            }});
        });

        it('should ignore unknown actions', () => {
            expect(filterReducer(initialState, { type: 'unknown' })).toEqual(initialState);
        });
    });
});
