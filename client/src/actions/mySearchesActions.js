import axios from "axios";
import {
  GET_SEARCHES,
  ADD_SEARCH,
  DELETE_SEARCH,
  SEARCHES_LOADING, 
  GET_ERRORS,
  IS_QUICK_SEARCH,
  QUICK_SEARCH_ID
} from "./types";

export const getSearches = userData => dispatch => {
  dispatch(setSearchesLoading());
  axios.get("/api/searches", userData).then(res =>
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

export const setQuickSearch = isQuickSearch => {
  return {
    type: IS_QUICK_SEARCH,
    payload: isQuickSearch
  };
};

export const setQuickSearchId = id => {
  return {
    type: QUICK_SEARCH_ID,
    payload: id
  };
};

export const enableQuickSearch = (id) => dispatch => {
  dispatch(setQuickSearch(true));
  dispatch(setQuickSearchId(id));
}

export const disableQuickSearch = () => dispatch => {
  dispatch(setQuickSearch(false));
  dispatch(setQuickSearchId(-1));
}
