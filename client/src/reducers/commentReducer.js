import {
    CREATE_COMMENT,
    GET_COMMENT,
    UPDATE_COMMENT,
    COMMENT_LOADING
} from "../actions/types";

const initialState = {
    currentComment: {},
    loading: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case CREATE_COMMENT:
            return {
                ...state,
                currentComment: [action.payload, ...state.currentComment]
            };
        case GET_COMMENT:
            return {
                ...state,
                currentComment: action.payload,
                loading: false
            };
        case UPDATE_COMMENT:
            return {
                ...state,
                currentComment: [action.payload, ...state.currentComment]
            };
        case COMMENT_LOADING:
            return {
                ...state,
                loading: true
            };
        default:
            return state;
    }
}