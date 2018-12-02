import { SET_CURRENT_USER } from "../actions/types";
import isEmpty from "../validation/is-empty";
const initialState = {
  isAuthenticated: false,
  user: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state, /// ...state == current state
        isAuthenticated: !isEmpty(action.payload), // cand are loc logoutUser ce apeleaza setCurrentUser = (decoded care e empty obj) aici va fi false
        user: action.payload
      };
    default:
      return state;
  }
}
