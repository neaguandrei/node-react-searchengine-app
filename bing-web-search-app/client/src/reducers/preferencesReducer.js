import {
    GET_PREFERENCES,
    SET_PREFERENCES,
    PREFERENCES_LOADING
  } from "../actions/types";
  
  const initialState = {
    preferences: {},
    loading: false
  };
  
  export default function(state = initialState, action) {
    switch (action.type) { 
      case GET_PREFERENCES:
        return {
          ...state,
          preferences: action.payload,
          loading: false
        };
      case SET_PREFERENCES:
        return {
          ...state,
          preferences: [action.payload, ...state.preferences]
        };
      case PREFERENCES_LOADING:
        return {
          ...state,
          loading: true
        };
      default:
        return state;
    }
  }
  