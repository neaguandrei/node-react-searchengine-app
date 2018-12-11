import {
  CREATE_PREFERENCES,
  GET_PREFERENCES,
  SET_PREFERENCES,
} from "../actions/types";

const initialState = {
  preferences: { }
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CREATE_PREFERENCES:
      return {
        ...state,
        preferences: [action.payload, ...state.preferences]
      };
    case GET_PREFERENCES:
      return {
        ...state, //current state
        preferences: action.payload,
      };
    case SET_PREFERENCES:
      return {
        ...state,
        preferences: [action.payload, ...state.preferences]
      };
    default:
      return state;
  }
}
