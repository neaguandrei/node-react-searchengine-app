import axios from "axios";
import {
  GET_SEARCH,
  SEARCH_LOADING
} from "./types";

let getResults = function(query, token) {
  return new Promise((re, rj) => {
    axios
      .get("/api/searches/search", {
        params: {
          query: query
        }
      })
      .then(res => {
        re(res.data);
      })
      .catch(err => rj(err));
  });
};

export const search = (query, token) => dispatch => {
  //dispatch catre reducer
  dispatch({ type: SEARCH_LOADING });
  return new Promise((res, rej) => {
    let results = getResults(query, token).then(data => {
      dispatch({
        type: GET_SEARCH,
        payload: data
      });
      console.log(results);
      console.log(data);
      res(); // dupa ce se executa let results = getResult -> executa ce este pe .then in promiseul apelat, sau rej error
    });
  });
};
