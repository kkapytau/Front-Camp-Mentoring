import { GET_FILTER_DATA } from '../constants/Constants';

const initialState = {
  data: {
    filterText: '',
    selectedType: ''
  }
};

export default function filterReducer(state = initialState, action) {
  switch (action.type) {
    case GET_FILTER_DATA:
      return { ...state, data: action.payload };
    default:
      return state;
  }
}
