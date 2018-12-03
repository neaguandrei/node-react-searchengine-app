import {
    GET_SEARCHES,
    ADD_SEARCH,
    DELETE_SEARCH,
    SEARCHES_LOADING
  } from "../actions/types";
  
  const initialState = {
    searches: [],
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
          searches: state.searches.filter(search => search.idSearch !== action.payload)
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
      default:
        return state;
    }
  }
  