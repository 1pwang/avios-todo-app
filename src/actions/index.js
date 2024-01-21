import axios from "axios";
import { FETCH_TODOS } from "./types";

export function fetchTodos() {
  return function(dispatch) {
    return axios.get("http://localhost:9091/api/getTask").then(({ data }) => {
      dispatch(setTodos(data));
    });
  };
}

function setTodos(data) {
  return {
    type: FETCH_TODOS,
    payload: data
  };
}