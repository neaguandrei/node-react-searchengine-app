import axios from "axios";
import {
    GET_PREFERENCES,
    SET_PREFERENCES,
    PREFERENCES_LOADING
} from "./types";

export const getPreferences = () => dispatch => {
  dispatch(getPreferencesLoading());
  axios.get("/api/preferences").then(res =>
    dispatch({
      type: GET_PREFERENCES,
      payload: res.data
    })
  );
};

export const setPreferences = search => dispatch => {
  axios
    .post("/api/preferences/setPreference", search)
    .then(res =>
      dispatch({
        type: SET_PREFERENCES,
        payload: res.data
      })
    )
    .catch(err => console.log(err));
};

export const getPreferencesLoading = () => {
  return {
    type: PREFERENCES_LOADING
  };
};
