import {
  GET_SEARCH,
  SEARCH_LOADING,
} from "../actions/types";

const initialState = {
  results: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_SEARCH:
      return {
        ...state,
        results: action.payload,
        loading: false
      };
    case SEARCH_LOADING:
      return {
        ...state,
        loading: true
      };

    default:
      return state;
  }
}
