import axios from "axios";
import {
  CREATE_PREFERENCES,
  GET_PREFERENCES,
  SET_PREFERENCES
} from "./types";

export const createPreferences = preferences => dispatch => {
  axios
    .post("/api/preferences/create", preferences)
    .then(res =>
      dispatch({
        type: CREATE_PREFERENCES,
        payload: res.data
      })
    )
    .catch(err => console.log(err));
};

export const getPreferences = user => dispatch => {
  axios.get("/api/preferences/load", user).then(res =>
    dispatch({
      type: GET_PREFERENCES,
      payload: res.data
    })
  );
};

export const setPreferences = preference => dispatch => {
  axios
    .put("/api/preferences/update", preference)
    .then(res =>
      dispatch({
        type: SET_PREFERENCES,
        payload: res.data
      })
    )
    .catch(err => console.log(err));
};
