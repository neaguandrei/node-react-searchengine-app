import {
  GET_SEARCHES,
  ADD_SEARCH,
  DELETE_SEARCH,
  SEARCHES_LOADING,
  IS_QUICK_SEARCH,
  QUICK_SEARCH_ID
} from "../actions/types";

const initialState = {
  searches: [],
  isQuickSearch: false,
  quickSearchId: -1,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_SEARCHES:
      return {
        ...state,
        searches: action.payload,
        loading: false
      };
    case DELETE_SEARCH:
      return {
        ...state,
        searches: state.searches.filter(
          search => search.idSearch !== action.payload
        )
      };
    case ADD_SEARCH:
      return {
        ...state,
        searches: [action.payload, ...state.searches]
      };
    case SEARCHES_LOADING:
      return {
        ...state,
        loading: true
      };
    case IS_QUICK_SEARCH:
    return {
      ...state,
      isQuickSearch: [action.payload, ...state.isQuickSearch][0]
    }
    case QUICK_SEARCH_ID:
    return {
      ...state,
      quickSearchId: [action.payload, ...state.quickSearchId][0]
    }
    default:
      return state;
  }
}
