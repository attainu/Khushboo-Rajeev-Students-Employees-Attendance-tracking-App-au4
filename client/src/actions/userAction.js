import { FETCH_USER } from "./types";
import axios from "axios";

export const fetchUser = () => (dispatch) => {
  axios.get("http://localhost:8080/home").then((res) =>
    dispatch({
      type: FETCH_USER,
      payload: res.data,
    })
  );
};
