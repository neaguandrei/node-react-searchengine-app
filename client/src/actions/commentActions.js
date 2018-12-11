import axios from "axios";
import {
    CREATE_COMMENT,
    GET_COMMENT,
    UPDATE_COMMENT,
    COMMENT_LOADING
} from "./types";

export const getComment = comment => dispatch => {
    dispatch(setCommentLoading());
    axios.get("/api/comment", comment).then(res =>
        dispatch({
            type: GET_COMMENT,
            payload: res.data
        })
    );
};

export const createComment = comment => dispatch => {
    axios
        .post("/api/comment/create", comment)
        .then(res =>
            dispatch({
                type: CREATE_COMMENT,
                payload: res.data
            })
        )
        .catch(err =>
            console.log(err));
};

export const updateComment = comment => dispatch => {
    axios
    .put(`/api/comment/update`, comment)
    .then(res =>
        dispatch({
            type: UPDATE_COMMENT,
            payload: comment
        })
    )
    .catch( err => console.log(err));
};

export const setCommentLoading = () => {
    return {
        type: COMMENT_LOADING
    };
};