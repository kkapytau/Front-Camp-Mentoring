import { GET_FILTER_DATA } from '../constants/Constants';

export function getFilterData(data) {
  return {
    type: GET_FILTER_DATA,
    payload: data
  };
}
