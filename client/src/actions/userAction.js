
import { FETCH_USER } from "./types";
import { GET_ERRORS } from './types';
import axios from "axios";

export const fetchUser = (payload) => (dispatch) => {
  console.log("payload", payload);
  axios
    .get(`http://localhost:8080/home/${payload}`)
    // .then((res) => res.json())
    .then((res) =>
      dispatch({
        type: FETCH_USER,
        payload: res.data,
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );

};
