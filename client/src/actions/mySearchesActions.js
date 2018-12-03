import axios from "axios";
import {
  GET_SEARCHES,
  ADD_SEARCH,
  DELETE_SEARCH,
  SEARCHES_LOADING, 
  GET_ERRORS
} from "./types";

export const getSearches = () => dispatch => {
  dispatch(setSearchesLoading());
  axios.get("/api/searches").then(res =>
    dispatch({
      type: GET_SEARCHES,
      payload: res.data
    })
  );
};

export const addSearch = search => dispatch => {
  axios
    .post("/api/searches/addSearch", search)
    .then(res =>
      dispatch({
        type: ADD_SEARCH,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const deleteSearch = id => dispatch => {
  axios.delete(`/api/searches/${id}`).then(res =>
    dispatch({
      type: DELETE_SEARCH,
      payload: id
    })
  );
};

export const setSearchesLoading = () => {
  return {
    type: SEARCHES_LOADING
  };
};
